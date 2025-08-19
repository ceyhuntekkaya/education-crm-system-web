"use client";

import React, { ReactNode, useRef, useState, useEffect } from "react";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = "top",
  delay = 300,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setShowTooltip(true), 50);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowTooltip(false);
    setTimeout(() => setIsVisible(false), 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const placementClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-t-gray-900",
    bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900",
    left: "left-full top-1/2 transform -translate-y-1/2 border-l-gray-900",
    right: "right-full top-1/2 transform -translate-y-1/2 border-r-gray-900",
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={tooltipRef}
    >
      {children}

      {isVisible && (
        <div
          className={`
            absolute z-50 pointer-events-none
            transition-all duration-200 ease-in-out
            ${placementClasses[placement]}
            ${showTooltip ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
        >
          <div className="bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap relative">
            {content}
            <div
              className={`
                absolute w-0 h-0 border-2 border-transparent
                ${arrowClasses[placement]}
              `}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
