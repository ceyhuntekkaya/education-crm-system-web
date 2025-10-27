"use client";

import React from "react";
import { CustomFeeDetailProvider } from "./_shared/context";

const CustomFeeDetailLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CustomFeeDetailProvider>
      <>{children}</>
    </CustomFeeDetailProvider>
  );
};

export default CustomFeeDetailLayout;
