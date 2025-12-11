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
  const { reset, values } = useForm();
  const { selectedSchool } = useCompany();
  const {
    isEditing,
    postGallery,
    putGallery,
    gallerySubmitLoading, // Form submit loading
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
      {/* <FormValues /> */}
      <div className="row row-gap-24">
        {/* Sol Kolon - Temel Bilgiler */}
        <div className="col-6">
          <div className="d-flex flex-column gap-16">
            <h5>Temel Bilgiler</h5>
            {/* <FormInput
              name="schoolId"
              label="Kurum"
              type="text"
              value={selectedSchool?.name || "Kurum seçilmedi"}
              placeholder="Kurum bilgisi..."
              disabled
              isRequired
            /> */}
            <FormAutocomplete
              name="galleryType"
              label="Galeri Tipi"
              options={galleryTypeOptions}
              placeholder="Galeri tipi seçin"
              isRequired
              disabled={isEditing}
            />
            <FormInput
              name="title"
              label="Başlık"
              placeholder="Galeri başlığını giriniz..."
              isRequired
            />
            <FormTextarea
              name="description"
              label="Açıklama"
              placeholder="Galeri açıklamasını giriniz..."
              rows={6}
            />
          </div>
        </div>

        {/* Sağ Kolon - Kapak Görseli */}
        <div className="col-6">
          <div className="d-flex flex-column gap-16">
            <h5>Kapak Görseli</h5>
            <FileInput
              label="Kapak Görseli"
              type="img"
              variant="outline"
              placeholder="Görsel yüklemek için tıklayın veya sürükleyin"
              maxSize={5}
              uploadButtonText="Görsel Yükle"
              name="coverImageUrl"
              isAutoUpload
              // isCropPreview={true}
              // cropWidth={1584}
              // cropHeight={396}
            />
            {/* <FormInput
              name="coverImageUrl"
              label="Veya Manuel Görsel URL"
              placeholder="Görsel URL'sini giriniz..."
            /> */}
          </div>
        </div>

        <span className="d-block border border-neutral-30 my-12 border-dashed" />

        {/* Galeri Öğeleri - Multi File Upload */}
        <div className="col-12">
          <div className="d-flex flex-column gap-16">
            <h5>Galeri Öğeleri</h5>
            <FileInput
              label="Galeri Öğeleri (Çoklu Yükleme)"
              type="all"
              variant="outline"
              placeholder="Dosyaları yüklemek için tıklayın veya sürükleyin (Çoklu seçim yapabilirsiniz)"
              maxSize={100}
              maxFiles={20}
              uploadButtonText="Dosyaları Yükle"
              name="items"
              multiple
            />
          </div>
        </div>

        <span className="d-block border border-neutral-30 my-12 border-dashed" />

        {/* Alt Satır - Görünürlük ve Ayarlar (Sol) */}
        <div className="col-12">
          <div className="d-flex flex-column gap-16">
            <h5>Görünürlük ve Ayarlar</h5>
            <div className="row row-gap-16">
              <div className="col-6">
                <FormAutocomplete
                  name="visibility"
                  label="Görünürlük"
                  options={visibilityOptions}
                  placeholder="Görünürlük seçin"
                  isRequired
                />
              </div>
              <div className="col-6">
                <div className="mt-40">
                  <FormCheckbox
                    name="isFeatured"
                    label="Öne Çıkan"
                    variant="outlined"
                  />
                </div>
              </div>
              {/* <div className="col-6">
                <FormInput
                  name="sortOrder"
                  label="Sıralama"
                  type="number"
                  placeholder="Sıralama numarası girin"
                />
              </div> */}
            </div>
            <div className="row row-gap-16 mt-16">
              {/* <div className="col-4">
                <FormCheckbox
                  name="isFeatured"
                  label="Öne Çıkan"
                  variant="outlined"
                />
              </div> */}
              {/* <div className="col-4">
                <FormCheckbox
                  name="allowComments"
                  label="Yorumlara İzin Ver"
                  variant="outlined"
                />
              </div> */}
              {/* <div className="col-4">
                <FormCheckbox
                  name="allowDownloads"
                  label="İndirmelere İzin Ver"
                  variant="outlined"
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* Alt Satır - SEO Bilgileri (Sağ) */}
        {/* <div className="col-6">
          <div className="d-flex flex-column gap-16">
            <h5>SEO Bilgileri</h5>
            <FormInput
              name="metaTitle"
              label="Meta Başlık"
              placeholder="Meta başlık giriniz (Max 60 karakter)..."
              maxLength={60}
            />
            <FormTextarea
              name="metaDescription"
              label="Meta Açıklama"
              placeholder="Meta açıklama giriniz (Max 160 karakter)..."
              rows={3}
              maxLength={160}
            />
            <FormInput
              name="tags"
              label="Etiketler"
              placeholder="Virgülle ayrılmış etiketler giriniz..."
            />
          </div>
        </div> */}

        {/* Form Actions */}
        <div className="col-12">
          <div className="d-flex justify-content-end gap-12 mt-24">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={gallerySubmitLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={hasErrors || gallerySubmitLoading}
              loading={gallerySubmitLoading}
            >
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
