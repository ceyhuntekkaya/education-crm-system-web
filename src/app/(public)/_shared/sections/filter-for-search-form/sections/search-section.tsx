import React from "react";
import { FormInput } from "@/components";

export const SearchSection = () => ({
  id: "search",
  title: null,
  component: (
    <div className="mb-24">
      <FormInput
        name="searchTerm"
        variant="inline"
        placeholder="Anahtar kelime ile ara..."
        iconRight="ph-magnifying-glass"
        className="col-span-2"
      />
    </div>
  ),
});
