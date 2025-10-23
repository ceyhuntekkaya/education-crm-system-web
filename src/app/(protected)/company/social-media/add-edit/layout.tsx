"use client";

import React from "react";
import { PostAddEditProvider } from "./_shared";

interface SocialMediaAddEditRootLayoutProps {
  children: React.ReactNode;
}

const SocialMediaAddEditRootLayout: React.FC<
  SocialMediaAddEditRootLayoutProps
> = ({ children }) => {
  return (
    <PostAddEditProvider>
      <div>{children}</div>
    </PostAddEditProvider>
  );
};

export default SocialMediaAddEditRootLayout;
