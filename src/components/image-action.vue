<template>
  <button
    :aria-label="ariaLabel[action]"
    :data-testid="action"
    class="flex items-center justify-center"
    @click="handleClick"
  >
    <div
      class="p-2 rounded-full duration-200 bg-gray-800 bg-opacity-80 backdrop-blur-sm hover:bg-gray-700 focus:bg-gray-700 outline-gray-100 outline-2 text-white"
    >
      <PhDownloadSimple v-if="action === 'download'" :size="18" />
      <PhArrowUpRight v-if="action === 'source'" :size="18" />
      <PhX v-if="action === 'close'" :size="18" />
    </div>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { downloadImage } from "@/composables/utils";
import { PhX, PhDownloadSimple, PhArrowUpRight } from "@phosphor-icons/vue";
import type { ImageActionProps } from "@/types";

const router = useRouter();

const props = defineProps<ImageActionProps>();

const ariaLabel = {
  close: "close image",
  download: "download image",
  source: "open original in new tab",
};

const handleClick = (e: MouseEvent) => {
  switch (props.action) {
    case "close":
      router.push("/");
      break;
    case "source":
      window.open(props.image.path, "_blank");
      break;
    case "download":
      downloadImage(props.image);
      break;
  }
  e.preventDefault();
};
</script>
