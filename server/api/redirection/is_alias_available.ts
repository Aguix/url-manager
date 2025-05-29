import prisma from '@/lib/prisma';
import { assert } from 'superstruct';
import { AliasValidator } from '~/types/alias';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    assert(body, AliasValidator);

    if (!body) {
        throw createError({
            statusCode: 400,
            message: 'Alias is required'
        });
    }

    const isAliasExists = await prisma.redirection.findUnique({
        where: { alias: body.alias }
    });

    return { alias: body.alias, available: isAliasExists === null }
});