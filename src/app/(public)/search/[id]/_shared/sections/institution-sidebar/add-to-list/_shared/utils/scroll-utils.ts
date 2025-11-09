/**
 * Scrolls modal body to bottom smoothly
 */
export const scrollModalToBottom = (delay: number = 300): void => {
  setTimeout(() => {
    const modalBody = document.querySelector(".modal-body");
    if (modalBody) {
      modalBody.scrollTo({
        top: modalBody.scrollHeight,
        behavior: "smooth",
      });
    }
  }, delay);
};

