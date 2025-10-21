import { ReactNode } from "react";
import { ModalSize, ModalPosition, ModalVariant } from "./base-types";

/**
 * Ana Modal component'i için props
 */
export interface ModalProps {
  /** Modal'ın açık/kapalı durumu */
  isOpen: boolean;

  /** Modal'ı kapatma fonksiyonu */
  onClose: () => void;

  /** Modal içeriği */
  children: ReactNode;

  /** Modal başlığı */
  title?: string;

  /** Modal footer'ı göster */
  showFooter?: boolean;

  /** Modal footer içeriği */
  footer?: ReactNode;

  /** Modal boyutu */
  size?: ModalSize;

  /** Modal pozisyonu */
  position?: ModalPosition;

  /** Modal'ın ortalanması */
  centered?: boolean;

  /** Modal varyantı */
  variant?: ModalVariant;

  /** Backdrop'a tıklayınca kapanma */
  closeOnBackdropClick?: boolean;

  /** ESC tuşu ile kapanma */
  closeOnEscape?: boolean;

  /** Modal scroll edilebilir olması */
  scrollable?: boolean;

  /** Animasyon aktif olması */
  animated?: boolean;

  /** CSS class'ı */
  className?: string;

  /** z-index değeri */
  zIndex?: number;

  /** Modal açıldığında çağrılan callback */
  onOpen?: () => void;

  /** Modal kapandığında çağrılan callback */
  onClosed?: () => void;

  /** Accessibility label */
  ariaLabel?: string;

  /** Accessibility description ID */
  ariaDescribedBy?: string;
}
