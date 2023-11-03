import { filename as getFileName } from "pathe/utils";
import slugify from "slugify";
import type { Image } from "@/types";
import config from "~~/gallery.config";

const imageGlobWithMetadata = import.meta.glob(
  "../../images/*.{jpg,jpeg,png,webp,avif,gif}",
  {
    eager: true,
    //use vite-imagetools metadata
    query: {
      metadata: "",
    },
  }
);

const imageGlob = import.meta.glob(
  "../../images/*.{jpg,jpeg,png,webp,avif,gif}",
  {
    eager: true,
  }
);

export type ImageMetadata = {
  width: number;
  height: number;
};

export const imagesMetadata: ImageMetadata[] = Object.entries(
  imageGlobWithMetadata
).map(([, value]) => {
  const data = value as unknown as ImageMetadata;
  return data;
});

export const images: Image[] = Object.entries(imageGlob).map(
  ([key, value], index) => {
    const filenameNoExtension: string = getFileName(key);

    const { default: path } = value as unknown as { default: string };

    return {
      idx: index,
      path,
      filename: key.split("/").pop()!,
      alt: config.altTextGenerator
        ? config.altTextGenerator(key.split("/").pop()!)
        : slugify(filenameNoExtension).replaceAll("-", " "),
      width: imagesMetadata[index].width,
      height: imagesMetadata[index].height,
      aspectRatio: imagesMetadata[index].width / imagesMetadata[index].height,
    };
  }
);

const useImages = (): Image[] => {
  return images;
};

export default useImages;
