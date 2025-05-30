import prisma from '@/lib/prisma'
import { RedirectionCreationValidator } from '~/types/redirection';
import { assert } from 'superstruct';
import { randomInt } from 'crypto';
import { getUserFromToken } from '~/utils/getUserFromToken';

export default defineEventHandler(async event => {
    const body = await readBody(event);
    let user = null;
    try {
        user = await getUserFromToken(event);
    } catch {
        user = null;
    }
    assert(body, RedirectionCreationValidator);

    let alias = body.alias;
    if (!alias) {
        do {
            alias = '';
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789-_';
            for (let i = 0; i < 4; i++) {
                const randIndex = randomInt(0, chars.length);
                alias += chars[randIndex];
            }
        } while (await $fetch('/api/redirection/is_alias_available', {method: 'POST', body: { alias }}).then(res => !res.available))
    } else {
        const isAliasExists = await $fetch('/api/redirection/is_alias_available', {method: 'POST', body: { alias }})

        if (isAliasExists && !isAliasExists.available) {
            throw createError({
                statusCode: 400,
                message: 'Alias already exists'
            });
        }
    }

    const newRedirectionData = {
        ...(user ? { userId: user.id } : {}),
        url: body.url,
        alias: alias,
    }

    const redirection = await prisma.redirection.create({data : newRedirectionData});
    if (redirection) return redirection;
    throw createError({
        statusCode: 500,
        message: 'Failed to create redirection'
    });
});