<template>
  <div
    v-if="currentImage"
    ref="swiperRef"
    class="relative max-h-[45vh] md:max-h-[65vh] xl:max-h-[75vh] h-full overflow-hidden aspect-auto max-w-7xl cursor-default w-full flex items-center justify-center no-close"
  >
    <div
      v-if="loaded"
      class="absolute top-0 left-0 w-full inline-flex justify-between p-4 pb-8 z-40 no-close"
    >
      <ImageAction action="close" :image="currentImage" />
      <div class="inline-flex gap-4">
        <ImageAction action="download" :image="currentImage" />
        <ImageAction action="source" :image="currentImage" />
      </div>
    </div>
    <div
      :key="currentImage.idx"
      ref="imageElement"
      class="absolute inset-0 w-full flex flex-col items-center justify-center no-close"
    >
      <NuxtImg
        v-show="loaded"
        format="webp"
        :preload="isFirstLoad && currentImage?.idx === currentImage.idx"
        :src="currentImage.filename"
        :quality="1"
        :width="10"
        alt="background"
        class="absolute text-[0] inset-0 w-full h-full object-cover brightness-[1.0] blur-xl pointer-events-none"
      />
      <NuxtImg
        :quality="50"
        format="webp"
        :src="currentImage.filename"
        class="brightness-110 pointer-events-none w-auto h-auto max-h-[45vh] md:max-h-[65vh] xl:max-h-[75vh] xl:w-auto xl:h-full text-transparent image-gallery__image"
        :style="{ aspectratio: currentImage.aspectRatio }"
        fetchpriority="high"
        decoding="async"
        :alt="currentImage.alt"
        :preload="isFirstLoad && currentImage?.idx === currentImage.idx"
        loading="eager"
        @load="() => (loaded = true)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMotion } from "@vueuse/motion";
import { nextTick } from "vue";
import { useElementSize, usePointerSwipe } from "@vueuse/core";
import type { Image } from "@/types";

const isFirstLoad = useIsFirstLoad();
const imageElement = ref(null);
const swiperRef = ref(null);

const currentImage = useCurrentImage();

const direction = ref<"NEXT" | "PREV">("NEXT");
const loaded = ref(true);

onMounted(() => {
  loaded.value = isFirstLoad.value;
  preloadImages(currentImage.value);
});

const { width } = useElementSize(swiperRef);
const withTransitionImage = useWithTransitionImage();

const s = useMotion(imageElement, {
  initial: {
    x: 0,
    opacity: 1,
  },
  exit: {
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.2,
      opacity: 0,
    },
    x: () => (direction.value === "NEXT" ? -width.value : width.value),
  },
});

const preloadImage = (image: Image) => {
  new Image().src = `/_ipx/f_webp&q_50/${image.filename}`;
};

const preloadImages = (current: Image | null) => {
  if (current) {
    const prev = images[getNextImageIndex(images, current.idx, "PREV")];
    const next = images[getNextImageIndex(images, current.idx, "NEXT")];
    preloadImage(prev);
    preloadImage(next);
  }
};

const navigate = async (dir?: "NEXT" | "PREV", image?: Image) => {
  if (dir) {
    direction.value = dir;
    preloadImage(
      images[getNextImageIndex(images, currentImage.value!.idx, dir)]
    );
  } else if (image) {
    direction.value = image.idx > currentImage.value!.idx ? "NEXT" : "PREV";
    preloadImage(image);
  }
  await s.apply("exit");
  loaded.value = false;
  if (dir) {
    useNavigate(dir);
  } else if (image) {
    useNavigate(undefined, image);
  }
  await nextTick();
  await navigateComplete();
};

const navigateComplete = async () => {
  await s.apply({
    x: direction.value === "NEXT" ? width.value : -width.value,
  });
  await s.apply({
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 2,
    },
    opacity: 1,
    x: 0,
  });
  s.stop();
};

const pointerSwipe = usePointerSwipe(swiperRef, {
  onSwipeEnd: async () => {
    await navigate(pointerSwipe.direction.value === "LEFT" ? "NEXT" : "PREV");
  },
});

useSwipe(swiperRef, {
  onSwipe: async (direction) => {
    if (pointerSwipe?.direction?.value !== "NONE") {
      await navigate(direction);
    }
  },
});

watch(currentImage, preloadImages);

watch(withTransitionImage, async (image) => {
  if (image) {
    await navigate(undefined, image);
  }
});
</script>
