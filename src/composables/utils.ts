import type { Image } from "@/types";

export const downloadImage = (image: Image) => {
  const a = document.createElement("a");
  a.setAttribute("href", image.path);
  a.setAttribute("download", image.filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const getNextImageIndex = (
  images: Image[],
  currentIndex: number,
  direction: "PREV" | "NEXT"
) => {
  const delta = direction === "PREV" ? -1 : 1;
  const nextIndex = (currentIndex + delta + images.length) % images.length;
  return nextIndex;
};
