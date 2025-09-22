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
import {
  postTypeOptions,
  postStatusOptions,
  sortOptions,
  sortOrderOptions,
} from "./options";

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
    console.log("Post Filter Values:", values);
    filterSubmit(values);
  };

  return (
    <div className={`post-filter-form ${className || ""}`}>
      <div className="border border-neutral-30 rounded-12 bg-white p-8 my-16">
        <div className="border border-neutral-30 rounded-12 p-20">
          <h4 className="text-neutral-700 text-lg fw-semibold mb-16 d-flex align-items-center">
            <i className="ph-bold ph-funnel me-8" />
            Sosyal Medya Filtreleri
          </h4>
          <Form onSubmit={handleSubmit} className="d-flex flex-column">
            {/* Filtreler */}
            <div className="mb-24">
              <div className="row g-3 mb-4">
                <div className="col-lg-4">
                  <FormInput
                    name="query"
                    label="Arama"
                    placeholder="Gönderi başlığı, içerik ara..."
                    className="form-control-sm"
                  />
                </div>
                <div className="col-lg-4">
                  <FormAutocomplete
                    name="postType"
                    label="Gönderi Türü"
                    placeholder="Tür seçin"
                    options={postTypeOptions}
                    className="form-control-sm"
                  />
                </div>
                <div className="col-lg-4">
                  <FormAutocomplete
                    name="status"
                    label="Durum"
                    placeholder="Durum seçin"
                    options={postStatusOptions}
                    className="form-control-sm"
                  />
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-lg-4">
                  <FormInput
                    name="authorName"
                    label="Yazar"
                    placeholder="Yazar adı"
                    className="form-control-sm"
                  />
                </div>
                <div className="col-lg-4">
                  <FormInput
                    name="schoolName"
                    label="Kurum"
                    placeholder="Kurum adı"
                    className="form-control-sm"
                  />
                </div>
                <div className="col-lg-4">
                  <div className="row g-2">
                    <div className="col-6">
                      <FormCheckbox
                        name="isFeatured"
                        label="Öne Çıkan"
                        className="form-check-sm"
                      />
                    </div>
                    <div className="col-6">
                      <FormCheckbox
                        name="isPinned"
                        label="Sabitlenmiş"
                        className="form-check-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-lg-3">
                  <FormInput
                    name="publishedAfter"
                    label="Başlangıç Tarihi"
                    type="date"
                    className="form-control-sm"
                  />
                </div>
                <div className="col-lg-3">
                  <FormInput
                    name="publishedBefore"
                    label="Bitiş Tarihi"
                    type="date"
                    className="form-control-sm"
                  />
                </div>
                <div className="col-lg-3">
                  <FormAutocomplete
                    name="sortBy"
                    label="Sırala"
                    placeholder="Sıralama kriteri"
                    options={sortOptions}
                    className="form-control-sm"
                  />
                </div>
                <div className="col-lg-3">
                  <FormAutocomplete
                    name="sortOrder"
                    label="Sıra"
                    placeholder="Sıra"
                    options={sortOrderOptions}
                    className="form-control-sm"
                  />
                </div>
              </div>
            </div>

            {/* Aksiyon butonları */}
            <div className="d-flex justify-content-end gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => resetForm()}
                className="btn-outline-neutral"
              >
                <i className="ph ph-arrow-clockwise me-8" />
                Temizle
              </Button>
              <Button type="submit" size="sm" disabled={!isValid}>
                <i className="ph ph-magnifying-glass me-8" />
                Filtrele
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

const PostFilterForm: React.FC<PostFilterFormProps> = ({
  className,
  initialValues,
}) => {
  return (
    <FormProvider
      initialValues={{ ...postFilterInitialValues, ...initialValues }}
      validationSchema={postFilterValidationSchema}
    >
      <PostFilterFormContent className={className} />
    </FormProvider>
  );
};

export default PostFilterForm;
