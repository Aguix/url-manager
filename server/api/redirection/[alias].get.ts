import prisma from '@/lib/prisma'
import * as UAParser from 'ua-parser-js'

export default defineEventHandler(async (event) => {
    const alias = getRouterParam(event, 'alias');

    if(!alias) {
        throw createError({
            statusCode: 400,
            message: 'Alias is required'
        });
    }

    const redirection = await prisma.redirection.findUnique({
        where: { alias },
    });

    if (!redirection) {
        throw createError({
            statusCode: 404,
            message: 'Redirection not found'
        });
    }


    const headers = getRequestHeaders(event);
    const parser = new UAParser.UAParser(headers['user-agent'] || '');
    const ua = parser.getResult();
    const browser = ua.browser.name || 'unknown';
    const os = ua.os.name || 'unknown';
    const platform = ua.device.type || 'desktop';
    const ip = getRequestIP(event) || 'unknown';
    const ip2 = event.context.clientAddress || 'unknown';
    const ip3 = event.context.ip || 'unknown';

    console.log(`Redirection accessed: ${redirection.alias} from IP: ${ip}, IP2: ${ip2}, IP3 : ${ip3}, Browser: ${browser}, OS: ${os}, Platform: ${platform}`);


    return sendRedirect(event, redirection.url, 301);
});