"use client";

import React from "react";
import { CustomFeeListProvider } from "./_shared";

const CustomFeeListLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CustomFeeListProvider>
      <>{children}</>
    </CustomFeeListProvider>
  );
};

export default CustomFeeListLayout;
