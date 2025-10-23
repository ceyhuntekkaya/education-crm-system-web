"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormTextarea,
  FormAutocomplete,
  FormCheckbox,
  FormValues,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/file-input";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useGalleryAddEdit } from "../../../context";
import { filterDataForEdit } from "../../../utils";
import { GalleryCreateDto, GalleryUpdateDto } from "@/types";
import { useCompany } from "@/app/(protected)/company/_shared";

export const GalleryFormContent: React.FC = () => {
  const { hasErrors } = useFormHook();
  const { reset } = useForm();
  const { selectedSchool } = useCompany();
  const {
    isEditing,
    postGallery,
    putGallery,
    galleryLoading,
    galleryId,
    galleryTypeOptions,
    visibilityOptions,
  } = useGalleryAddEdit();

  const handleSubmit = async (values: any) => {
    if (isEditing) {
      const filteredData = filterDataForEdit(values) as GalleryUpdateDto;
      await putGallery(filteredData);
    } else {
      const formData: GalleryCreateDto = {
        ...values,
        schoolId: selectedSchool?.id || 0,
      };
      await postGallery(formData);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormValues />
      <div className="row row-gap-24">
        <div className="col-12">
          <h5 className="mb-16">Temel Bilgiler</h5>
        </div>

        <div className="col-6">
          <FormInput
            name="schoolId"
            label="Okul"
            type="text"
            value={selectedSchool?.name || "Okul seçilmedi"}
            placeholder="Okul bilgisi..."
            disabled
            required
          />
        </div>

        <div className="col-6">
          <FormAutocomplete
            name="galleryType"
            label="Galeri Tipi"
            options={galleryTypeOptions}
            placeholder="Galeri tipi seçin"
            required
            disabled={isEditing}
          />
        </div>

        <div className="col-12">
          <FormInput
            name="title"
            label="Başlık"
            placeholder="Galeri başlığını giriniz..."
            required
          />
        </div>

        <div className="col-12">
          <FormTextarea
            name="description"
            label="Açıklama"
            placeholder="Galeri açıklamasını giriniz..."
            rows={6}
          />
        </div>

        <div className="col-12">
          <h5 className="mb-16 mt-16">Görünürlük ve Ayarlar</h5>
        </div>

        <div className="col-4">
          <FormAutocomplete
            name="visibility"
            label="Görünürlük"
            options={visibilityOptions}
            placeholder="Görünürlük seçin"
            required
          />
        </div>

        <div className="col-4">
          <FormInput
            name="sortOrder"
            label="Sıralama"
            type="number"
            placeholder="Sıralama numarası girin"
          />
        </div>

        <div className="col-12">
          <div className="d-flex gap-24">
            <FormCheckbox name="isFeatured" label="Öne Çıkan" />
            <FormCheckbox name="allowComments" label="Yorumlara İzin Ver" />
            <FormCheckbox name="allowDownloads" label="İndirmelere İzin Ver" />
          </div>
        </div>

        <div className="col-12">
          <h5 className="mb-16 mt-16">Kapak Görseli</h5>
        </div>

        <div className="col-12">
          <div className="d-flex flex-column gap-12">
            <FileInput
              label="Kapak Görseli"
              type="img"
              variant="outline"
              placeholder="Görsel yüklemek için tıklayın veya sürükleyin"
              maxSize={5}
              uploadButtonText="Görsel Yükle"
              name="coverImageUrl"
            />
            {/* Manuel Cover Image URL */}
            <FormInput
              name="coverImageUrl"
              label="Veya Manuel Görsel URL"
              placeholder="Görsel URL'sini giriniz..."
            />
          </div>
        </div>

        <div className="col-12">
          <h5 className="mb-16 mt-16">SEO Bilgileri</h5>
        </div>

        <div className="col-12">
          <FormInput
            name="metaTitle"
            label="Meta Başlık"
            placeholder="Meta başlık giriniz (Max 60 karakter)..."
            maxLength={60}
          />
        </div>

        <div className="col-12">
          <FormTextarea
            name="metaDescription"
            label="Meta Açıklama"
            placeholder="Meta açıklama giriniz (Max 160 karakter)..."
            rows={3}
            maxLength={160}
          />
        </div>

        <div className="col-12">
          <FormInput
            name="tags"
            label="Etiketler"
            placeholder="Virgülle ayrılmış etiketler giriniz..."
          />
        </div>

        {/* Form Actions */}
        <div className="col-12">
          <div className="d-flex justify-content-end gap-12 mt-24">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={galleryLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={hasErrors || galleryLoading}
              loading={galleryLoading}
            >
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
