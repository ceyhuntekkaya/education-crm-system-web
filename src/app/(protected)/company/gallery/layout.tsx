"use client";

import React from "react";
import { GalleryProvider } from "./_shared/context/gallery-context";

const GalleryLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <GalleryProvider>
      <>{children}</>
    </GalleryProvider>
  );
};

export default GalleryLayout;
