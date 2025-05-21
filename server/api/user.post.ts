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

    const hashed_password = hashSync(body.password, 12);
    return await prisma.user.create({
        data: {
            ...body,
            password: hashed_password
        }}
    );
})