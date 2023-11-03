export type UseSwipeOptions = {
  onSwipe: (direction: "NEXT" | "PREV") => Promise<void>;
};

export default function useSwipe(
  swipeable: Ref<HTMLElement | null>,
  options: UseSwipeOptions
) {
  let touchstartX = 0;
  let touchendX = 0;

  const handleTouchStart = (event: TouchEvent) => {
    touchstartX = event.changedTouches[0].screenX;
  };

  const handleTouchEnd = async (event: TouchEvent) => {
    touchendX = event.changedTouches[0].screenX;

    await options.onSwipe(touchstartX > touchendX ? "NEXT" : "PREV");
  };

  onMounted(() => {
    if (swipeable.value) {
      swipeable.value.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      swipeable.value.addEventListener("touchend", (e) => handleTouchEnd(e), {
        passive: true,
      });
    }
  });
}
