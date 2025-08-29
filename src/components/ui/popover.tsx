"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

// Placement türleri
export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

// Variant türleri
export type PopoverVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "dark";

// Size türleri
export type PopoverSize = "sm" | "md" | "lg";

// Trigger türleri
export type PopoverTrigger = "click" | "hover" | "focus";

export interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  title?: string;
  placement?: PopoverPlacement;
  variant?: PopoverVariant;
  size?: PopoverSize;
  trigger?: PopoverTrigger;
  disabled?: boolean;
  showArrow?: boolean;
  offset?: number;
  delay?: number;
  className?: string;
  popoverClassName?: string;
  backdrop?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

// Header nav-submenu benzeri pozisyon hesaplama
const calculatePosition = (
  triggerElement: HTMLElement,
  popoverElement: HTMLElement,
  placement: PopoverPlacement,
  offset: number = 8
) => {
  const triggerRect = triggerElement.getBoundingClientRect();
  const popoverRect = popoverElement.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  let top = 0;
  let left = 0;

  // Ana placement'a göre pozisyon hesaplama
  switch (placement) {
    case "top":
    case "top-start":
    case "top-end":
      // Top: Header submenu gibi
      top = triggerRect.top + scrollTop - popoverRect.height - offset - 20;
      break;
    case "bottom":
    case "bottom-start":
    case "bottom-end":
      // Bottom: Header submenu gibi
      top = triggerRect.bottom + scrollTop + offset;
      break;
    case "left":
    case "left-start":
    case "left-end":
      // Left: Header submenu gibi
      left = triggerRect.left + scrollLeft - popoverRect.width - offset;
      break;
    case "right":
    case "right-start":
    case "right-end":
      // Right: Header submenu gibi
      left = triggerRect.right + scrollLeft + offset;
      break;
  }

  // Header submenu benzeri hizalama
  switch (placement) {
    case "top":
    case "bottom":
      // Center: Ortala
      left =
        triggerRect.left +
        scrollLeft +
        (triggerRect.width - popoverRect.width) / 2;
      break;
    case "top-start":
    case "bottom-start":
      // Start: Sol hizalı (header submenu gibi)
      left = triggerRect.left + scrollLeft;
      break;
    case "top-end":
      left = triggerRect.right + scrollLeft - popoverRect.width;
      break;
    case "bottom-end":
      left = triggerRect.right + scrollLeft - popoverRect.width - 40;
      break;
    case "left":
    case "right":
      // Center: Dikey ortala
      top =
        triggerRect.top +
        scrollTop +
        (triggerRect.height - popoverRect.height) / 2;
      break;
    case "left-start":
    case "right-start":
      // Start: Üst hizalı
      top = triggerRect.top + scrollTop;
      break;
    case "left-end":
    case "right-end":
      // End: Alt hizalı
      top = triggerRect.bottom + scrollTop - popoverRect.height;
      break;
  }

  // Viewport sınırları kontrolü - Header submenu gibi basit
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Basit sınır kontrolü
  if (left < 8) left = 8;
  if (left + popoverRect.width > viewportWidth - 8) {
    left = viewportWidth - popoverRect.width - 8;
  }
  if (top < scrollTop + 8) top = scrollTop + 8;
  if (top + popoverRect.height > scrollTop + viewportHeight - 8) {
    top = scrollTop + viewportHeight - popoverRect.height - 8;
  }

  return { top, left };
};

export const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  title,
  placement = "top",
  variant = "default",
  size = "md",
  trigger = "click",
  disabled = false,
  showArrow = true,
  offset = 8,
  delay = 0,
  className = "",
  popoverClassName = "",
  backdrop = false,
  onShow,
  onHide,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  // Popover'ı göster
  const showPopover = useCallback(() => {
    if (disabled) return;

    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
        onShow?.();
      }, delay);
    } else {
      setIsVisible(true);
      setIsAnimating(true);
      onShow?.();
    }
  }, [disabled, delay, onShow]);

  // Popover'ı gizle - animasyon ile
  const hidePopover = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Kapanma animasyonu başlat
    setIsAnimating(true);
    setIsVisible(false);

    // Animasyon tamamlandıktan sonra DOM'dan kaldır
    setTimeout(() => {
      setIsAnimating(false);
      onHide?.();
    }, 150); // Kapanma animasyon süresi
  }, [onHide]);

  // Pozisyon hesaplama
  useEffect(() => {
    if (isVisible && triggerRef.current && popoverRef.current) {
      const newPosition = calculatePosition(
        triggerRef.current,
        popoverRef.current,
        placement,
        offset
      );
      setPosition(newPosition);
    }
  }, [isVisible, placement, offset]);

  // Event handler'lar
  const handleClick = () => {
    if (trigger === "click") {
      isVisible ? hidePopover() : showPopover();
    }
  };

  const handleFocus = () => {
    if (trigger === "focus") {
      showPopover();
    }
  };

  const handleBlur = () => {
    if (trigger === "focus") {
      hidePopover();
    }
  };

  // Dış tıklama kontrolü
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isVisible &&
        triggerRef.current &&
        popoverRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        hidePopover();
      }
    };

    if (trigger === "click") {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isVisible, trigger, hidePopover]);

  // Scroll ve resize olayları
  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        hidePopover();
      }
    };

    const handleResize = () => {
      if (isVisible) {
        hidePopover();
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isVisible, hidePopover]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Popover class'ları
  const popoverClasses = [
    "popover",
    isVisible ? "show" : "",
    isAnimating && !isVisible ? "closing" : "",
    variant !== "default" ? `popover-${variant}` : "",
    size !== "md" ? `popover-${size}` : "",
    backdrop ? "popover-backdrop" : "",
    popoverClassName,
  ]
    .filter(Boolean)
    .join(" ");

  // Header submenu gibi hover container logic - delay ile
  const handleContainerMouseEnter = () => {
    if (trigger === "hover") {
      // Eğer hide timeout varsa iptal et
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = undefined;
      }
      showPopover();
    }
  };

  const handleContainerMouseLeave = () => {
    if (trigger === "hover") {
      // Header submenu gibi - biraz delay ile kapat
      hoverTimeoutRef.current = setTimeout(() => {
        hidePopover();
      }, 150); // 150ms delay - boşluk geçişi için yeterli
    }
  };

  // Trigger element - Header submenu gibi container wrapper
  const triggerElement = (
    <div
      className={`popover-container d-inline-block ${
        trigger === "hover" ? "has-popover" : ""
      }`}
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
    >
      <div
        ref={triggerRef}
        className={`popover-trigger d-inline-block ${className}`}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={trigger === "focus" ? 0 : undefined}
        role={trigger === "click" ? "button" : undefined}
        aria-expanded={isVisible}
        aria-describedby={isVisible ? "popover-content" : undefined}
      >
        {children}
      </div>
    </div>
  );

  // Popover content hover handlers - Header submenu gibi delay ile
  const handlePopoverMouseEnter = () => {
    if (trigger === "hover") {
      // Popover üzerindeyken timeout'u iptal et ve açık tut
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = undefined;
      }
      showPopover();
    }
  };

  const handlePopoverMouseLeave = () => {
    if (trigger === "hover") {
      // Popover'dan çıkıldığında delay ile kapat
      hoverTimeoutRef.current = setTimeout(() => {
        hidePopover();
      }, 150); // Aynı delay süresi
    }
  };

  // Popover content - animasyon sırasında da görünür olmalı
  const popoverContent =
    (isVisible || isAnimating) && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={popoverRef}
            className={popoverClasses}
            data-placement={placement}
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              zIndex: 1070,
            }}
            role="tooltip"
            id="popover-content"
            onMouseEnter={handlePopoverMouseEnter}
            onMouseLeave={handlePopoverMouseLeave}
          >
            {showArrow && <div className="popover-arrow"></div>}

            {title && <div className="popover-header">{title}</div>}

            <div className="popover-body scroll-sm">{content}</div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {triggerElement}
      {popoverContent}
    </>
  );
};

export default Popover;
