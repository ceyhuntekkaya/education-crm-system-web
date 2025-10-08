"use client";

import React from "react";

interface SocialMediaAddEditRootLayoutProps {
  children: React.ReactNode;
}

const SocialMediaAddEditRootLayout: React.FC<
  SocialMediaAddEditRootLayoutProps
> = ({ children }) => {
  return <div>{children}</div>;
};

export default SocialMediaAddEditRootLayout;
