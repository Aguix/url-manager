import prisma from '@/lib/prisma'
import { RedirectionCreationValidator } from '~/types/redirection';
import { assert } from 'superstruct';
import { randomInt } from 'crypto';

export default defineEventHandler(async event => {
    const body = await readBody(event);
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
        } while ($fetch('/api/redirection/is_alias_available', {method: 'POST', body: { alias }}).then(res => !res.available))
    } else {
        const isAliasExists = await $fetch('/api/redirection/is_alias_available', {method: 'POST', body: { alias }})

        if (isAliasExists && !isAliasExists.available) {
            throw createError({
                statusCode: 400,
                message: 'Alias already exists'
            });
        }
    }

    const redirection = await prisma.redirection.create({
        data: {
            userId: body.userId,
            url: body.url,
            alias: alias,
            description: body.description
        }
    });
    return redirection;
});