// Main Modal component
export { Modal } from "./modal";

// Section components
export { ModalHeader, ModalBody, ModalFooter, ModalBackdrop } from "./sections";

// Context
export {
  ModalProvider,
  useModalContext,
  useModalContextOptional,
} from "./contexts";
export type { ModalContextValue, ModalProviderProps } from "./contexts";

// Utils
export {
  getModalMaxWidth,
  getAlignItems,
  getJustifyContent,
  getGapSize,
  getAnimationTransform,
  getAnimationOpacity,
  getAnimationTransition,
  setBodyScrollLock,
  manageFocus,
} from "./utils";

// Hooks
export {
  useModalEffects,
  useModalHandlers,
  useModalKeyboard,
  useModalStyles,
} from "./hooks";

// All types
export type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalBackdropProps,
  ModalSize,
  ModalPosition,
  ModalVariant,
} from "./types";

// Default export - compound component from modal.tsx
export { default } from "./modal";
