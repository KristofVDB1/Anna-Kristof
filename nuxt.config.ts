import { defineNuxtConfig } from "nuxt/config";
import { imagetools } from "vite-imagetools";
import FastGlob from "fast-glob";

let images = FastGlob.sync("./images/*.{jpg,jpeg,png,webp,avif,gif}");
images = images.map((image) => image.replace("./images/", ""));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/Anna-Kristof/',
    buildAssetsDir: 'assets'
  },
  srcDir: "src",
  alias: {
    "@/": "/src/",
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    prerender: {
      routes: [
        ...images
          .map((filename) => [
            `/_ipx/f_webp&fit_cover&s_200x200/${filename}`,
            `/_ipx/f_webp&fit_cover&s_400x400/${filename}`,
          ])
          .flat(),
      ],
    },
  },
  vite: {
    build: {
      target: "esnext",
    },
    resolve: {
      alias: {
        "@/*": "src/*",
      },
    },
    plugins: [imagetools()],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/motion/nuxt",
    "@nuxt/image",
    "vite-plugin-vue-type-imports/nuxt",
  ],
  image: {
    //supported provider is ipx
    provider: "ipx",
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
    dir: "../images",
  },
  tailwindcss: {
    cssPath: "@/assets/css/tailwind.css",
  },
});
