import jwt from 'jsonwebtoken'
import type { User } from '@/types/user'
import prisma from '@/lib/prisma'

interface JwtPayload {
    id: number;
}

export async function getUserFromToken(event: H3Event): Promise<User> {
    const cookieToken = getCookie(event, 'auth_token')

    const header = getHeader(event, 'authorization')?.trim()
    const headerToken = header?.startsWith('Bearer ')
        ? header.substring(7)
        : undefined

    const token = cookieToken || headerToken

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized - Token missing'
        })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
        const user = await prisma.user.findUniqueOrThrow({
            where: { id: payload.id }
        });
        return {
            id: user.id,
            email: user.email,
            username: user.username
        };
    } catch {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized - Invalid token'
        })
    }


}
