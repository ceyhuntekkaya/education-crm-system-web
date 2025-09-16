import { useState, useCallback, useRef } from "react";

export interface UseModalOptions {
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * Modal state yönetimi için custom hook
 *
 * @param options - Modal seçenekleri
 * @returns Modal kontrol fonksiyonları ve durumu
 *
 * @example
 * ```tsx
 * const { isOpen, open, close, toggle } = useModal({
 *   onOpen: () => console.log('Modal açıldı'),
 *   onClose: () => console.log('Modal kapandı')
 * });
 *
 * return (
 *   <>
 *     <button onClick={open}>Modal Aç</button>
 *     <Modal isOpen={isOpen} onClose={close}>
 *       Modal içeriği
 *     </Modal>
 *   </>
 * );
 * ```
 */
export const useModal = (options: UseModalOptions = {}): UseModalReturn => {
  const { defaultOpen = false, onOpen, onClose } = options;

  const [isOpen, setIsOpenState] = useState(defaultOpen);
  const previousIsOpen = useRef(isOpen);

  const setIsOpen = useCallback(
    (newIsOpen: boolean) => {
      if (newIsOpen !== previousIsOpen.current) {
        setIsOpenState(newIsOpen);

        if (newIsOpen) {
          onOpen?.();
        } else {
          onClose?.();
        }

        previousIsOpen.current = newIsOpen;
      }
    },
    [onOpen, onClose]
  );

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  };
};

export default useModal;
