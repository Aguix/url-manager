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

    if (!redirection.userId) return sendRedirect(event, redirection.url, 301);

    const user = await prisma.user.findUnique({
        where: { id: redirection.userId },
        select: { id: true, username: true, email: true }
    });
    if (!user) return sendRedirect(event, redirection.url, 301);
    
    const headers = getRequestHeaders(event);
    const parser = new UAParser.UAParser(headers['user-agent'] || '');
    const userAgent = parser.getResult();
    const browser = userAgent.browser.name || 'unknown';
    const os = userAgent.os.name || 'unknown';
    const platform = userAgent.device.type || 'desktop';
    const ipAddress = getRequestIP(event) || 'unknown';

    console.log(`Redirection accessed: ${redirection.alias} from IP: ${ipAddress}, Browser: ${browser}, OS: ${os}, Platform: ${platform}`);


    prisma.visit.create({
        data: {
            redirectionId: redirection.id,
            ipAddress,
            browser,
            os,
            platform
        },
    }).catch(err => {
        console.error('Failed to log visitor:', err);
    });

    return sendRedirect(event, redirection.url, 301);
});