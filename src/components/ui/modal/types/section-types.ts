import { ReactNode } from "react";
import { HeadingLevel, JustifyContent, GapSize } from "./base-types";

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
  headingLevel?: HeadingLevel;
}

/**
 * Modal Body component'i için props
 */
export interface ModalBodyProps {
  /** Body içeriği */
  children: ReactNode;

  /** Scroll edilebilir olması (opsiyonel - context'ten alınabilir) */
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
  justify?: JustifyContent;

  /** Gap boyutu */
  gap?: GapSize;
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
