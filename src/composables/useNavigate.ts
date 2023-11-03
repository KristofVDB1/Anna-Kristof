import { getNextImageIndex } from "@/composables/utils";
import useImages from "./useImages";
import type { Image } from "@/types";

const useNavigate = (
  direction?: "PREV" | "NEXT",
  image?: Image,
  withTransition?: boolean
) => {
  const currentImage = useCurrentImage();
  const withTransitionImage = useWithTransitionImage();
  const images = useImages();
  if (currentImage.value) {
    if (direction) {
      if (withTransition) {
        withTransitionImage.value =
          images[getNextImageIndex(images, currentImage.value.idx, direction)];
      } else {
        currentImage.value =
          images[getNextImageIndex(images, currentImage.value.idx, direction)];
      }
    }
    if (image && image.idx !== currentImage.value.idx) {
      if (withTransition) {
        withTransitionImage.value = image;
      } else {
        currentImage.value = image;
      }
    }
  }
};

export default useNavigate;
