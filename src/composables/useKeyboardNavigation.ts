import { onKeyStroke } from "@vueuse/core";
import useNavigate from "@/composables/useNavigate";
import { useRouter } from "vue-router";

export const PREV_NAVIGATION_KEYS = ["ArrowLeft", "ArrowUp"];
export const NEXT_NAVIGATION_KEYS = ["ArrowRight", "ArrowDown"];

export const useKeyboardNavigation = () => {
  const router = useRouter();
  const searchOpen = useSearchOpen();

  onKeyStroke(PREV_NAVIGATION_KEYS, () => {
    if (!searchOpen.value) {
      useNavigate("PREV", undefined, true);
    }
  });
  onKeyStroke(NEXT_NAVIGATION_KEYS, () => {
    if (!searchOpen.value) {
      useNavigate("NEXT", undefined, true);
    }
  });
  onKeyStroke("Escape", () => {
    if (!searchOpen.value) {
      router.push("/");
    }
  });
};

export default useKeyboardNavigation;
