import { EmailCheckValidator } from '@/types/email';
import { assert } from 'superstruct';
import prisma from '@/lib/prisma'
import { randomInt } from 'crypto'

export default defineEventHandler(async event => {
    const body = await readBody(event);
    assert(body, EmailCheckValidator);
    const targetEmail : string = body.email;

    // Check if the email is already in use
    const req = await $fetch('/api/email/is_available', {method: 'POST', body: body});
    if (!req.available) {
        throw createError({
            statusCode: 400,
            message: 'Email is already in use.'
        });
    }

    // Verification code generation
    const existingCode = await prisma.verificationCode.findUnique({
        where: { email: targetEmail }
    });

    console.log('Existing verification code:', existingCode);

    let verificationCode = "";
    if (existingCode && new Date(existingCode.expiresAt) > new Date()) {
        verificationCode = existingCode.code;
    } else {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        for (let i = 0; i < 6; i++) {
            const randIndex = randomInt(0, chars.length);
            verificationCode += chars[randIndex];
        }

        await prisma.verificationCode.upsert({
            where: { email: targetEmail },
            update: {
                code: verificationCode,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000),
                sessionToken: null
            },
            create: {
                email: targetEmail,
                code: verificationCode,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000)
            }
        }); 
    }

    // Send mail
    const { sendMail } = useNodeMailer();
    const mailConfig = {
        subject: 'URL Manager verification Code : ' + verificationCode,
        text: `Quelqu'un essaye de créer un compte sur URL Manager avec cet adresse email.\nSi c'est vous, voici votre code de vérification : ${verificationCode}.\n\nSi ce n'est pas vous, ignorez ce message, le compte ne sera pas créé.`,
        to: targetEmail,
        from: process.env.NUXT_NODEMAILER_FROM || ''
    };
    const mail = await sendMail(mailConfig);
    if (!mail || !mail.accepted || mail.accepted.length !== 1 || mail.accepted[0] !== targetEmail) {
        throw createError({
            statusCode: 500,
            message: 'Failed to send verification code.'
        });
    }

    return {
        success: true,
        message: 'Verification code sent successfully.'
    };
});