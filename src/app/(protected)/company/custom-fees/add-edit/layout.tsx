"use client";

import React from "react";
import { CustomFeeAddEditProvider } from "./_shared";

export default function AddEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomFeeAddEditProvider>
      <div>{children}</div>
    </CustomFeeAddEditProvider>
  );
}
