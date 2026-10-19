import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: false,
  // target: "static",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    strapiToken: process.env.NUXT_STRAPI_TOKEN || "",
    public: {
      apiUrl: process.env.NUXT_STRAPI_URL || "http://localhost:1337",
    },
    session: {
      // Impostato tramite NUXT_SESSION_PASSWORD
      password: "",
    },

    ldapUrl: "",
    ldapBaseDn: "",
    ldapBindUser: "",
    ldapBindPassword: "",
    ldapUserFilter: "(sAMAccountName={username})",
  },

  app: {
    head: {
      title: "Intranet Città di Rivoli",
      htmlAttrs: {
        lang: "it",
      },
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@nuxt/eslint",
    "nuxtjs-naive-ui",
    "@pinia/nuxt",
    "@nuxtjs/strapi",
    "nuxt-auth-utils",
  ],
  strapi: {
    url: process.env.NUXT_STRAPI_URL || "http://localhost:1337",
    token: process.env.NUXT_STRAPI_TOKEN || undefined,
    prefix: "/api",
    admin: "/admin",
    version: "v5",
    cookie: {},
    cookieName: "strapi_jwt",
  },
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
});
