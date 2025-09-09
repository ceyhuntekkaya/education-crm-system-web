import React from "react";
import { FormRadio } from "@/components";
import { curriculumTypeOptions } from "../_options";

export const CurriculumSection = {
  id: "curriculum",
  title: "Müfredat Türü",
  component: (
    <FormRadio
      name="curriculumType"
      label=""
      value=""
      options={curriculumTypeOptions}
      multi={true}
    />
  ),
};
