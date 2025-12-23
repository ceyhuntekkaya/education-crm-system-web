import React from "react";
import { FormRadio } from "@/components";
import { statusOptions } from "../options";

export const StatusSection = () => ({
  id: "status",
  title: "Durum",
  component: (
    <FormRadio
      name="status"
      label=""
      value=""
      options={statusOptions}
      multi={true}
      isShowAll={false}
    />
  ),
});
