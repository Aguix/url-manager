// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/fonts', '@prisma/nuxt', 'nuxt-nodemailer'],
  css: ['@/assets/css/reset.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/css/variables.scss" as *;`
        }
      }
    }
  },
  nodemailer: {
    host: 'config in .env',
    port: 587,
    secure: false,
    auth: {
      user: 'config in .env',
      pass: 'config in .env',
    },
  }
})