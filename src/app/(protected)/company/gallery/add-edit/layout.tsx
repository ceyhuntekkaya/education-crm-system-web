"use client";

import React from "react";

interface GalleryAddEditRootLayoutProps {
  children: React.ReactNode;
}

const GalleryAddEditRootLayout: React.FC<GalleryAddEditRootLayoutProps> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export default GalleryAddEditRootLayout;
