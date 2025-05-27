import prisma from '@/lib/prisma'
import { UserLoginValidator } from '@/types/user'
import { compareSync } from "bcryptjs";
import { assert } from 'superstruct';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async event => {
    const body = await readBody(event);
    assert(body, UserLoginValidator);

    const user = await prisma.user.findUniqueOrThrow({
        where: {email: body.email},
    });

    if (!compareSync(body.password, user.password)) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
    }
    
    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '365d' });
    setCookie(event, 'auth_token', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 365
    });
    return {
        user: {
            id: user.id,
            email: user.email,
            username: user.username
        },
        token: jwtToken
    }
})