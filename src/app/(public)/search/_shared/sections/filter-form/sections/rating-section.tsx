import React from "react";
import { FormRadio } from "@/components";
import { ratingOptions } from "../options";

export const RatingSection = () => ({
  id: "rating",
  title: "Minimum Puan",
  component: (
    <FormRadio
      name="minRating"
      label=""
      value=""
      options={ratingOptions}
      multi={true}
    />
  ),
});
