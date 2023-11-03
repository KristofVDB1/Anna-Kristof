<template>
  <TransitionRoot
    :show="searchOpen"
    as="template"
    enter="duration-200 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <Dialog :open="searchOpen" @close="setIsOpen">
      <div
        v-if="searchOpen"
        class="fixed inset-0 flex w-screen items-center mt-[-20rem] justify-center p-4 bg-black/50"
      >
        <DialogPanel
          class="w-full max-w-2xl rounded-lg bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-black overflow-clip"
        >
          <DialogTitle class="sr-only">Search images</DialogTitle>
          <input
            v-model="term"
            type="text"
            placeholder="Search images"
            class="text-gray-300 placeholder-gray-300 bg-transparent outline-none p-4"
          />
          <div role="listbox" class="flex flex-col h-56 overflow-y-scroll">
            <div
              v-if="results.length === 0"
              role="presentation"
              class="text-gray-300 text-center"
            >
              No results found.
            </div>
            <div
              v-for="image in results"
              :key="image.idx"
              class="flex flex-row items-center gap-4 p-4 hover:bg-gray-700 focus:bg-gray-700 duration-200 cursor-pointer"
              role="option"
              :data-value="image.alt"
              @click="onResultClick(image)"
            >
              <div class="w-16 h-16">
                <NuxtImg
                  :alt="image.alt"
                  format="webp"
                  :src="image.filename"
                  :width="200"
                  :height="200"
                  densities=""
                  fit="cover"
                  class="text-transparent pointer-events-none rounded-lg object-cover"
                />
              </div>
              <span class="text-sm">{{ image.alt }}</span>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
} from "@headlessui/vue";
import type { Image } from "~/types";
const images = useImages();
const currentImage = useCurrentImage();
const withTransitionImage = useWithTransitionImage();

const searchOpen = useSearchOpen();
const setIsOpen = (value: boolean) => {
  searchOpen.value = value;
};
const results = ref<Image[]>(images.slice(0, 10));
const term = ref("");

const onResultClick = (image: Image) => {
  if (currentImage.value) {
    withTransitionImage.value = image;
  } else {
    currentImage.value = image;
  }
  setIsOpen(false);
};

watch(term, async () => {
  if (term.value.trim() === "") {
    results.value = images.slice(0, 10);
  }
  let searchResults = await useImageSearch({
    term: term.value,
  });
  results.value = searchResults.hits.map((r) => r.document);
});
</script>
