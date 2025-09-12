import React from "react";
import { FormRadio } from "@/components";
import { curriculumTypeOptions } from "../options";

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
