export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.server) return;
    const authStore =  useAuthStore();
    await authStore.fetchUser();

    if (!authStore.user && to.path !== '/login' && to.path !== '/register') {
        console.log('User not authenticated, redirecting to login');
        return navigateTo('/login', { external: true, redirectCode: 301 });
    }

    if (authStore.user && (to.path === '/login' || to.path === '/register')) {
        console.log('User already authenticated, redirecting to dashboard', authStore.user);
        return navigateTo('/dashboard', { external: true, redirectCode: 301 });
    }
})
