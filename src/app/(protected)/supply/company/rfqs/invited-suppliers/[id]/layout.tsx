"use client";

import React from "react";
import { RFQInvitationsProvider } from "./_shared";

export default function RFQInvitationsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const rfqId = parseInt(params.id);

  return (
    <RFQInvitationsProvider rfqId={rfqId}>{children}</RFQInvitationsProvider>
  );
}
