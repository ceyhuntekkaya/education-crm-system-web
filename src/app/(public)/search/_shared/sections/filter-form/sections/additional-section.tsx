import React from "react";
import { FormCheckbox } from "@/components";

export const AdditionalSection = {
  id: "additional",
  title: "Ek Filtreler",
  component: (
    <div className="d-flex flex-column gap-16">
      <FormCheckbox
        name="hasActiveCampaigns"
        label="Aktif kampanyası olan kurumlar"
      />
      <FormCheckbox name="isSubscribed" label="Sadece üye olunan kurumlar" />
    </div>
  ),
};
