"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { Results } from "./_shared";

const WishlistPage: React.FC = () => {
  usePageTitle("İstek Listesi / Favoriler");

  return (
    <div className="d-flex flex-column gap-24">
      <Results />
    </div>
  );
};

export default WishlistPage;
