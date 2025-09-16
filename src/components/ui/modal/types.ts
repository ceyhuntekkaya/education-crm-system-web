import { ReactNode } from "react";

/**
 * Modal boyut seçenekleri
 */
export type ModalSize = "sm" | "md" | "lg" | "xl" | "fullscreen";

/**
 * Modal pozisyon seçenekleri
 */
export type ModalPosition = "center" | "top" | "bottom";

/**
 * Modal variant seçenekleri
 */
export type ModalVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

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

  /** Modal boyutu */
  size?: ModalSize;

  /** Modal pozisyonu */
  position?: ModalPosition;

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

/**
 * Modal Header component'i için props
 */
export interface ModalHeaderProps {
  /** Başlık metni */
  title?: string;

  /** Başlık React node'u (title varsa bu göz ardı edilir) */
  children?: ReactNode;

  /** Kapatma butonu gösterilsin mi */
  showCloseButton?: boolean;

  /** Kapatma fonksiyonu */
  onClose?: () => void;

  /** CSS class'ı */
  className?: string;

  /** Başlık level'ı (h1, h2, h3, h4, h5, h6) */
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Modal Body component'i için props
 */
export interface ModalBodyProps {
  /** Body içeriği */
  children: ReactNode;

  /** Scroll edilebilir olması */
  scrollable?: boolean;

  /** CSS class'ı */
  className?: string;

  /** Padding'i kaldır */
  noPadding?: boolean;
}

/**
 * Modal Footer component'i için props
 */
export interface ModalFooterProps {
  /** Footer içeriği */
  children: ReactNode;

  /** CSS class'ı */
  className?: string;

  /** İçeriği justify etme şekli */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";

  /** Gap boyutu */
  gap?: "sm" | "md" | "lg";
}

/**
 * Modal Backdrop component'i için props
 */
export interface ModalBackdropProps {
  /** Backdrop'a tıklayınca çağrılacak fonksiyon */
  onClick?: () => void;

  /** CSS class'ı */
  className?: string;

  /** Animasyon aktif olması */
  animated?: boolean;

  /** Backdrop gösterilsin mi */
  show?: boolean;
}
