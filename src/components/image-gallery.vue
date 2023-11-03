<template>
  <div
    class="w-full h-full fixed inset-0 overflow-auto flex items-center justify-center"
  >
    <Transition name="v">
      <div v-if="open" class="absolute bg-background inset-0 w-full h-full">
        <NuxtImg
          format="webp"
          :preload="true"
          :src="images[0].filename"
          :quality="1"
          :width="10"
          alt="background"
          class="absolute inset-0 w-full h-full object-cover blur-xl grayscale brightness-[0.25]"
        />
      </div>
    </Transition>
    <div class="w-full h-full flex justify-center items-center">
      <div
        class="relative cursor-default w-full h-full flex items-center justify-center"
      >
        <ImageGalleryImage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isFirstLoad = useIsFirstLoad();
const open = ref(isFirstLoad.value);
const images = useImages();

const checkClickOutside = () => {
  //event: MouseEvent
  // if (
  //     !(event.target instanceof HTMLAnchorElement) &&
  //     !(event.target instanceof HTMLButtonElement) &&
  //     !(event.target instanceof SVGSVGElement) &&
  //     !((event.target as HTMLElement)?.id === "carousel") &&
  //     !(
  //         (event.target as HTMLElement)?.classList.contains("image-gallery__image") &&
  //         event.target instanceof HTMLImageElement
  //     ) && false
  // ) {
  //     router.push("/");
  // }
};

onMounted(() => {
  open.value = true;

  document.addEventListener("click", checkClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", checkClickOutside);
});
</script>
