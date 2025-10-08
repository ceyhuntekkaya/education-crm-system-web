"use client";

import React from "react";
import { SubscriptionProvider } from "./_shared/context/subscription-context";

const SubscriptionLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SubscriptionProvider>
      <>{children}</>
    </SubscriptionProvider>
  );
};

export default SubscriptionLayout;
