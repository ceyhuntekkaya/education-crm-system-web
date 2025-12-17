"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface DrawerProps {
  /**
   * Drawer'ın açık/kapalı durumu
   */
  isOpen: boolean;

  /**
   * Drawer kapanma callback fonksiyonu
   */
  onClose: () => void;

  /**
   * Drawer içeriği
   */
  children: React.ReactNode;

  /**
   * Drawer header içeriği
   */
  header?: React.ReactNode;

  /**
   * Drawer footer içeriği
   */
  footer?: React.ReactNode;

  /**
   * Header'da close butonu göster
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Drawer'ın hangi taraftan açılacağı
   * @default "left"
   */
  position?: "left" | "right" | "top" | "bottom";

  /**
   * Drawer genişliği (sadece left/right için)
   * @default "320px"
   */
  width?: string;

  /**
   * Drawer yüksekliği (sadece top/bottom için)
   * @default "auto"
   */
  height?: string;

  /**
   * Overlay'e tıklandığında drawer'ı kapat
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Özel className
   */
  className?: string;

  /**
   * Overlay göster/gizle
   * @default true
   */
  showOverlay?: boolean;

  /**
   * Z-index değeri
   * @default 1000
   */
  zIndex?: number;
}

export const Drawer = ({
  isOpen,
  onClose,
  children,
  header,
  footer,
  showCloseButton = true,
  position = "left",
  width = "320px",
  height = "auto",
  closeOnOverlayClick = true,
  className = "",
  showOverlay = true,
  zIndex = 1000,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Client-side mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Body scroll'u engelle
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  // Drawer içine tıklandığında overlay click event'ini engelle
  const handleDrawerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Client-side'da mount olmadan render etme
  if (!mounted) {
    return null;
  }

  const positionStyles: Record<string, React.CSSProperties> = {
    left: {
      top: 0,
      left: 0,
      height: "100%",
      width,
      transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    },
    right: {
      top: 0,
      right: 0,
      height: "100%",
      width,
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
    },
    top: {
      top: 0,
      left: 0,
      right: 0,
      height,
      transform: isOpen ? "translateY(0)" : "translateY(-100%)",
    },
    bottom: {
      bottom: 0,
      left: 0,
      right: 0,
      height,
      transform: isOpen ? "translateY(0)" : "translateY(100%)",
    },
  };

  return createPortal(
    <>
      {/* Overlay */}
      {showOverlay && (
        <div
          className={`drawer-overlay ${isOpen ? "active" : ""}`}
          onClick={handleOverlayClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? "visible" : "hidden",
            transition: "opacity 0.3s ease, visibility 0.3s ease",
            zIndex,
          }}
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`drawer drawer--${position} ${
          isOpen ? "active" : ""
        } ${className}`}
        onClick={handleDrawerClick}
        style={{
          position: "fixed",
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          transition: "transform 0.3s ease",
          zIndex: zIndex + 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "100vw",
          boxSizing: "border-box",
          ...positionStyles[position],
        }}
      >
        {/* Header - En üstte, logo solda close button sağda */}
        {(header || showCloseButton) && (
          <div
            className="drawer__header"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              //   padding: "20px 24px",
              paddingTop: "16px",
              paddingBottom: "16px",
              paddingLeft: "24px",
              paddingRight: "24px",
              borderBottom: "1px solid #e5e7eb",
              flexShrink: 0,
            }}
          >
            {header && <div style={{ flex: 1 }}>{header}</div>}
            {showCloseButton && (
              <button
                type="button"
                className="close-button"
                onClick={onClose}
                style={{
                  marginLeft: header ? "16px" : "auto",
                }}
              >
                <i className="ph ph-x" />
              </button>
            )}
          </div>
        )}

        {/* Body - Ortada scroll edilebilir alan */}
        <div
          className="drawer__menu scroll-sm"
          style={{
            flex: "1 1 0%",
            overflowY: "auto",
            overflowX: "hidden",
            minHeight: 0,
            // padding: "20px 24px",
            paddingRight: "24px",
            paddingLeft: "24px",
            // paddingTop: "16px",
            paddingBottom: "16px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {children}
        </div>

        {/* Footer - En altta sabit */}
        {footer && (
          <div
            className="drawer__footer"
            style={{
              paddingTop: "12px",
              paddingBottom: "12px",
              paddingLeft: "24px",
              paddingRight: "24px",
              borderTop: "1px solid #e5e7eb",
              flexShrink: 0,
              marginTop: "auto",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </>,
    document.body
  );
};
