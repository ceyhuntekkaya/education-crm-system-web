"use client";

import { useState, useEffect } from "react";

/**
 * Responsive breakpoints
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export interface UseResponsiveReturn {
  /** Current screen width */
  width: number;
  /** Current screen height */
  height: number;
  /** Is extra small screen (< 576px) */
  isXs: boolean;
  /** Is small screen (>= 576px) */
  isSm: boolean;
  /** Is medium screen (>= 768px) */
  isMd: boolean;
  /** Is large screen (>= 992px) */
  isLg: boolean;
  /** Is extra large screen (>= 1200px) */
  isXl: boolean;
  /** Is extra extra large screen (>= 1400px) */
  isXxl: boolean;
  /** Is mobile device (< 768px) */
  isMobile: boolean;
  /** Is tablet device (>= 768px and < 992px) */
  isTablet: boolean;
  /** Is desktop device (>= 992px) */
  isDesktop: boolean;
  /** Current active breakpoint */
  currentBreakpoint: Breakpoint;
}

/**
 * useResponsive Hook
 *
 * Ekran boyutlarına göre responsive değerler döndürür
 *
 * @example
 * ```tsx
 * const { isMobile, isTablet, isDesktop, currentBreakpoint } = useResponsive();
 *
 * if (isMobile) {
 *   return <MobileView />;
 * }
 *
 * if (isTablet) {
 *   return <TabletView />;
 * }
 *
 * return <DesktopView />;
 * ```
 */
export function useResponsive(): UseResponsiveReturn {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // SSR check
    if (typeof window === "undefined") return;

    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      // Debounce resize events
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    // Initial set
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { width, height } = dimensions;

  // Breakpoint checks
  const isXs = width < BREAKPOINTS.sm;
  const isSm = width >= BREAKPOINTS.sm && width < BREAKPOINTS.md;
  const isMd = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
  const isLg = width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl;
  const isXl = width >= BREAKPOINTS.xl && width < BREAKPOINTS.xxl;
  const isXxl = width >= BREAKPOINTS.xxl;

  // Device type checks
  const isMobile = width < BREAKPOINTS.md;
  const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
  const isDesktop = width >= BREAKPOINTS.lg;

  // Current breakpoint
  let currentBreakpoint: Breakpoint = "xs";
  if (isXxl) currentBreakpoint = "xxl";
  else if (isXl) currentBreakpoint = "xl";
  else if (isLg) currentBreakpoint = "lg";
  else if (isMd) currentBreakpoint = "md";
  else if (isSm) currentBreakpoint = "sm";

  return {
    width,
    height,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isXxl,
    isMobile,
    isTablet,
    isDesktop,
    currentBreakpoint,
  };
}
