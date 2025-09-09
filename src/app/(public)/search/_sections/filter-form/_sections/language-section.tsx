import React from "react";
import { FormRadio } from "@/components";
import { languageOptions } from "../_options";

export const LanguageSection = {
  id: "language",
  title: "Eğitim Dili",
  component: (
    <FormRadio
      name="languageOfInstruction"
      label=""
      value=""
      options={languageOptions}
      multi={true}
    />
  ),
};
