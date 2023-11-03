<template>
  <Head>
    <Title>{{ config.title }}</Title>
    <Link rel="icon" href="/icon.png" type="image/png" />
    <Meta name="description" :content="config.description" />
  </Head>
  <main
    id="root"
    :class="route.path.startsWith('/p') ? 'overflow-hidden fixed' : ''"
  >
    <ClientOnly>
      <Search />
    </ClientOnly>
    <div
      v-if="currentImage"
      class="antialiased transform-gpu w-full h-full fixed inset-0 select-none z-[999999]"
    >
      <ImageGallery />
      <ImageCarousel />
    </div>
    <Transition>
      <ImageGrid v-if="!error && !currentImage" />
    </Transition>
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
import "@fontsource-variable/inter";
import { useRoute } from "vue-router";
import config from "~~/gallery.config";
import useImages from "@/composables/useImages";
import useCurrentImage from "@/composables/useCurrentImage";

const route = useRoute();
const error = useError();
const router = useRouter();
const currentImage = useCurrentImage();
const images = useImages();
const isFirstLoad = useIsFirstLoad();
const searchOpen = useSearchOpen();

useHead({
  htmlAttrs: {
    lang: config.htmlLang,
  },
});

const onKeyPress = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === "k") {
    event.preventDefault();
    event.stopPropagation();
    searchOpen.value = true;
  }
};

onMounted(() => {
  window.addEventListener("keydown", onKeyPress);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeyPress);
});

const fetchImage = () => {
  const image = ref(
    images.find((image) => image.idx == Number(route.params.idx))
  );
  if (!image.value) {
    throw createError({
      statusCode: 404,
      message: "Image not found",
      fatal: true,
    });
  }
  currentImage.value = image.value;
};

const watchRuns = ref(0);

watch(
  () => route.path,
  () => {
    if (route.path.startsWith("/p") && currentImage.value === null) {
      fetchImage();
    }
    if (route.path === "/") {
      currentImage.value = null;
    }
    watchRuns.value++;
    if (watchRuns.value > 1) {
      isFirstLoad.value = false;
    }
  },
  {
    immediate: true,
  }
);

watch(currentImage, () => {
  if (currentImage.value !== null) {
    router.push(`/p/${currentImage.value.idx}`);
  }
});
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s cubic-bezier(0.46, 0.28, 0.65, 0.44);
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
