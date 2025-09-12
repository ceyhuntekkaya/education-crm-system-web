import React from "react";
import { FormInput } from "@/components";

export const SearchSection = {
  id: "search",
  title: null,
  component: (
    <div className="position-relative d-flex flex-column gap-12">
      <FormInput
        name="searchTerm"
        variant="inline"
        placeholder="Anahtar kelime ile ara..."
        iconLeft="ph-magnifying-glass"
      />
    </div>
  ),
};
