"use client";

import React from "react";
import { SocialMediaProvider } from "./_shared/context/social-media-context";

const SocialMediaLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SocialMediaProvider>
      <>{children}</>
    </SocialMediaProvider>
  );
};

export default SocialMediaLayout;
