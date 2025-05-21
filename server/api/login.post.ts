import prisma from '@/lib/prisma'
import { UserLoginValidator } from '@/types/user'
import { compareSync } from "bcryptjs";
import { assert } from 'superstruct';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async event => {
    const body = await readBody(event);
    assert(body, UserLoginValidator);

    // const user = await prisma.user.findUnique({
    //     where: {email: body.email},
    // });
    // if (!user) {
    //     throw createError({
    //         statusCode: 401,
    //         statusMessage: 'User not found',
    //         message: 'User not found',
    //         data: body
    //     });
    // }

    const user = await prisma.user.findUniqueOrThrow({
        where: {email: body.email},
    })

    if (compareSync(body.password, user.password)) {

        return {
            ...user,
            password: undefined,
            jwt: jwt.sign({ id: user.id }, process.env.JWT_SECRET as string)
        }
    } else {
        return {
            statusCode: 401,
            statusMessage: 'Invalid credentials',
            message: 'Invalid credentials',
            data: body
        }
    }
    
})