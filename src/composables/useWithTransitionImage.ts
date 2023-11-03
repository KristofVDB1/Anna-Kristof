import type { Image } from "@/types";

export default function useWithTransitionImage() {
  return useState<Image | null>("withTransitionImage", () => null);
}
