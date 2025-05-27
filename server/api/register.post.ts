import prisma from '@/lib/prisma'
import { UserCreationValidator } from '@/types/user'
import { hashSync } from "bcryptjs";
import { assert } from 'superstruct'

export default defineEventHandler(async event => {
    const body = await readBody(event);
    assert(body, UserCreationValidator);

    const user = await prisma.user.findUnique({
        where: {email: body.email},
    });
    if (user) {
        throw createError({
            statusCode: 409,
            statusMessage: 'User already exists',
            message: 'User already exists',
            data: body
        });
    }

    const isEmailValid = await prisma.verificationCode.findUnique({
        where: {email: body.email, sessionToken: body.sessionToken},
    });
    if (!isEmailValid) {
        throw createError({
            statusCode: 400,
            message: 'Invalid email or session token',
        });
    }

    const hashed_password = hashSync(body.password, 12);
    const newUser = await prisma.user.create({
        data: {
            email: body.email,
            username: body.username,
            password: hashed_password
        }}
    );

    await prisma.verificationCode.delete({
        where: { email: body.email, sessionToken: body.sessionToken }
    });

    return {
        ...newUser,
        password: undefined
    }
})