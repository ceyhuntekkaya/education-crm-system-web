"use client";

import React, {
  ReactNode,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  contentClassName?: string;
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  placement = "bottom",
  isOpen: controlledIsOpen,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEsc = true,
  className = "",
  contentClassName = "",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const popoverRef = useRef<HTMLDivElement>(null);

  const setIsOpen = useCallback(
    (open: boolean) => {
      if (onOpenChange) {
        onOpenChange(open);
      } else {
        setInternalIsOpen(open);
      }
    },
    [onOpenChange]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnClickOutside &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeOnClickOutside, closeOnEsc, setIsOpen]);

  const placementClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2",
    bottom: "top-full left-1/2 transform -translate-x-1/2",
    left: "right-full top-1/2 transform -translate-y-1/2",
    right: "left-full top-1/2 transform -translate-y-1/2",
    "top-start": "bottom-full left-0",
    "top-end": "bottom-full right-0",
    "bottom-start": "top-full left-0",
    "bottom-end": "top-full right-0",
  };

  const offsetClasses = {
    top: "mb-2",
    bottom: "mt-2",
    left: "mr-2",
    right: "ml-2",
    "top-start": "mb-2",
    "top-end": "mb-2",
    "bottom-start": "mt-2",
    "bottom-end": "mt-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-t-gray-800",
    bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-800",
    left: "left-full top-1/2 transform -translate-y-1/2 border-l-gray-800",
    right: "right-full top-1/2 transform -translate-y-1/2 border-r-gray-800",
    "top-start": "top-full left-4 border-t-gray-800",
    "top-end": "top-full right-4 border-t-gray-800",
    "bottom-start": "bottom-full left-4 border-b-gray-800",
    "bottom-end": "bottom-full right-4 border-b-gray-800",
  };

  return (
    <div className={`relative inline-block ${className}`} ref={popoverRef}>
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {/* Popover Content */}
      {isOpen && (
        <div
          className={`
            absolute z-50 animate-in fade-in-0 zoom-in-95
            ${placementClasses[placement]}
            ${offsetClasses[placement]}
          `}
        >
          {/* Content */}
          <div
            className={`
              bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg
              max-w-xs break-words relative
              ${contentClassName}
            `}
          >
            {content}

            {/* Arrow */}
            <div
              className={`
                absolute w-0 h-0 border-4 border-transparent
                ${arrowClasses[placement]}
              `}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;
