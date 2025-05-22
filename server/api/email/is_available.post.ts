import prisma from '@/lib/prisma'
import { EmailCheckValidator } from '@/types/email'
import { assert } from 'superstruct';

export default defineEventHandler(async event => {
    const body = await readBody(event);
    assert(body, EmailCheckValidator);


    const user = await prisma.user.findUnique({
        where: {email: body.email},
    })

    if (user) {
        return { available: false }
    } else {
        return { available: true }
    }
})