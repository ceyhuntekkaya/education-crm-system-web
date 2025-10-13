"use client";

import React from "react";
import { Form } from "@/components/forms";
import { useFormHook } from "@/hooks";
import { useCampaignAddEdit } from "../context";
import {
  BasicInfoSection,
  DatesSection,
  DiscountSection,
  TargetAudienceSection,
  LimitsSection,
  MediaSection,
  TermsSection,
  SeoSection,
  AdditionalSection,
} from "./";

interface CampaignFormProps {}

const CampaignForm: React.FC<CampaignFormProps> = () => {
  const { handleSave } = useCampaignAddEdit();
  const { resetForm } = useFormHook();

  const handleSubmit = async (values: unknown) => {
    console.log("Form submitted with values:", values);
    await handleSave();
  };

  return (
    <Form onSubmit={handleSubmit} className="w-100">
      <BasicInfoSection />
      <DatesSection />
      <DiscountSection />
      <TargetAudienceSection />
      <LimitsSection />
      <MediaSection />
      <TermsSection />
      <SeoSection />
      <AdditionalSection />
    </Form>
  );
};

export default CampaignForm;
