<template>
  <main
    class="antialiased transform-gpu w-full min-h-screen flex flex-col items-center select-none p-4"
  >
    <div class="mx-auto max-w-mw w-full h-full">
      <div class="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <NuxtLink
          v-for="image in images"
          :key="image.idx"
          v-slot="{ href }"
          :href="`/p/${image.idx}`"
          custom
        >
          <a
            :href="href"
            class="after:content group relative mb-5 block w-full cursor after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            @click="(e) => onClick(e, image)"
          >
            <NuxtImg
              format="webp"
              :src="image.filename"
              :width="10"
              :quality="1"
              class="w-full h-full object-cover blur-lg saturate-[2] absolute inset-0"
              alt=""
              :loading="'lazy'"
            />
            <NuxtImg
              :id="image.idx"
              :width="720"
              :quality="75"
              :placeholder="
                img(image.filename, { h: 10, f: 'jpg', blur: 2, q: 35 })
              "
              densities="x1 x2"
              format="webp"
              :src="image.filename"
              :alt="image.alt"
              class="w-full h-full object-cover relative z-10 text-[0px] duration-200"
              :style="{ aspectRatio: image.aspectRatio }"
            />
            <span class="sr-only">{{ image.alt }}</span>
          </a>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import useImages from "@/composables/useImages";
import type { Image } from "@/types";

const img = useImage();
const images = useImages();
const router = useRouter();

const onClick = (e: MouseEvent, image: Image) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  router.push(`/p/${image.idx}`);
};
</script>
