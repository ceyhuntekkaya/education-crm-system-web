// Individual components
export { Modal } from "./modal";
export { ModalHeader } from "./modal-header";
export { ModalBody } from "./modal-body";
export { ModalFooter } from "./modal-footer";
export { ModalBackdrop } from "./modal-backdrop";

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
