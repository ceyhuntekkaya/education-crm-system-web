"use client";

import React from "react";

interface SubscriptionAddEditRootLayoutProps {
  children: React.ReactNode;
}

const SubscriptionAddEditRootLayout: React.FC<
  SubscriptionAddEditRootLayoutProps
> = ({ children }) => {
  return <div>{children}</div>;
};

export default SubscriptionAddEditRootLayout;
