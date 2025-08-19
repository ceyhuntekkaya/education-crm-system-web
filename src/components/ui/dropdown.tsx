"use client";

import React, { ReactNode, useRef, useState, useEffect } from "react";

interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  placement?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  className?: string;
  onSelect?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  placement = "bottom-left",
  className = "",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
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
  }, [isOpen]);

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;

    if (item.onClick) {
      item.onClick();
    }

    if (onSelect) {
      onSelect(item.value);
    }

    setIsOpen(false);
  };

  const placementClasses = {
    "bottom-left": "top-full left-0 mt-1",
    "bottom-right": "top-full right-0 mt-1",
    "top-left": "bottom-full left-0 mb-1",
    "top-right": "bottom-full right-0 mb-1",
  };

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={dropdownRef}
    >
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`
            absolute z-50 min-w-[200px] bg-white rounded-md shadow-lg 
            border border-gray-200 py-1 animate-in fade-in-0 zoom-in-95
            ${placementClasses[placement]}
          `}
        >
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              className={`
                w-full px-4 py-2 text-left flex items-center gap-3
                transition-colors duration-150
                ${
                  item.disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
