import { EmailCodeValidator } from '@/types/email';
import { assert } from 'superstruct';
import prisma from '@/lib/prisma'

export default defineEventHandler(async event => {
    const body = await readBody(event);
    assert(body, EmailCodeValidator);
    const targetEmail: string = body.email;

    // Verification code generation
    const existingCode = await prisma.verificationCode.findUnique({
        where: { email: targetEmail }
    });

    console.log('Existing verification code:', existingCode);

    const sessionToken = crypto.randomUUID();
    if (existingCode && existingCode.code === body.code) {
        // If the code matches, delete it from the database
        await prisma.verificationCode.update({
            where: { email: targetEmail },
            data: { sessionToken: sessionToken }
        });
        return { success: true, message: 'Verification code is valid.' };
    }

    throw createError({
        statusCode: 400,
        message: 'Invalid verification code or email.'
    });    
});