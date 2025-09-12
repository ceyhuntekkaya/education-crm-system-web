"use client";

import React from "react";
import { FormProvider } from "@/contexts";
import { SearchProvider, initialValues, validationSchema } from "./_shared";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <SearchBridge>{children}</SearchBridge>
    </FormProvider>
  );
}

const SearchBridge = ({ children }: { children: React.ReactNode }) => {
  return <SearchProvider>{children}</SearchProvider>;
};
