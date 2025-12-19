"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormAutocomplete,
  FormCheckbox,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useFormHook } from "@/hooks";
import { FormProvider } from "@/contexts";
import { usePostContext } from "../../context";
import { PostSearchDto } from "@/types/dto/content";
import { postFilterInitialValues, postFilterValidationSchema } from "./schema";
import { postTypeOptions, postStatusOptions } from "./options";

interface PostFilterFormProps {
  className?: string;
  initialValues?: Partial<PostSearchDto>;
}

const PostFilterFormContent: React.FC<
  Omit<PostFilterFormProps, "initialValues">
> = ({ className }) => {
  const { resetForm, isValid } = useFormHook();
  const { filterSubmit } = usePostContext();

  const handleSubmit = async (values: PostSearchDto) => {
    // console.log("Post Filter Values:", values);
    filterSubmit(values);
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 my-16">
      <div className="border border-neutral-30 rounded-12 p-20">
        <h4 className="text-neutral-700 text-lg fw-semibold mb-16 d-flex align-items-center">
          <i className="ph-bold ph-funnel me-8" />
          Sosyal Medya Filtreleri
        </h4>
        <Form onSubmit={handleSubmit} className="d-flex flex-column">
          <div className="mb-24">
            <div className="row g-3 mb-4">
              <div className="col-lg-4">
                <FormInput
                  name="schoolName"
                  type="text"
                  label="Kurum Adı"
                  placeholder="Kurum adına göre filtrele..."
                  variant="inline"
                  iconLeft="ph-graduation-cap"
                />
              </div>
              <div className="col-lg-4">
                <FormAutocomplete
                  name="postType"
                  label="Post Tipi"
                  placeholder="Post tipi seçin..."
                  variant="inline"
                  options={[
                    { value: "", label: "Tüm tipler" },
                    ...postTypeOptions,
                  ]}
                  iconLeft="ph-file-text"
                />
              </div>
              <div className="col-lg-4">
                <FormAutocomplete
                  name="status"
                  label="Durum"
                  placeholder="Durum seçin..."
                  variant="inline"
                  options={[
                    { value: "", label: "Tüm durumlar" },
                    ...postStatusOptions,
                  ]}
                  iconLeft="ph-circle"
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-16">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              className="px-24 py-8"
              leftIcon="ph-x-circle"
              size="sm"
            >
              Temizle
            </Button>
            <Button
              type="submit"
              variant="inline"
              disabled={!isValid}
              className="px-24 py-8"
              leftIcon="ph-funnel"
              size="sm"
            >
              Filtrele
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

// Ana PostFilterForm component'i - Provider'ı kendi içinde sarmalıyor
export const PostFilterForm: React.FC<PostFilterFormProps> = ({
  className,
  initialValues,
}) => {
  // Merge provided initial values with defaults
  const mergedInitialValues = {
    ...postFilterInitialValues,
    ...initialValues,
  };

  return (
    <FormProvider
      initialValues={mergedInitialValues}
      validationSchema={postFilterValidationSchema}
    >
      <PostFilterFormContent className={className} />
    </FormProvider>
  );
};
