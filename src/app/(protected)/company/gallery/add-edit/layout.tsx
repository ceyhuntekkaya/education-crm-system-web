"use client";

import React from "react";
import { GalleryAddEditProvider } from "./_shared";

interface GalleryAddEditRootLayoutProps {
  children: React.ReactNode;
}

const GalleryAddEditRootLayout: React.FC<GalleryAddEditRootLayoutProps> = ({
  children,
}) => {
  return (
    <GalleryAddEditProvider>
      <div>{children}</div>
    </GalleryAddEditProvider>
  );
};

export default GalleryAddEditRootLayout;
