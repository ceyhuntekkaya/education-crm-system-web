import React from "react";
import { QuotationItemsProvider } from "./_shared/contexts";

interface LayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default function QuotationItemsLayout({
  children,
  params,
}: LayoutProps) {
  const quotationId = parseInt(params.id, 10);

  return (
    <QuotationItemsProvider quotationId={quotationId}>
      {children}
    </QuotationItemsProvider>
  );
}
