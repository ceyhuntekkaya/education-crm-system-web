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
import {
  GalleryItemCreateDto,
  GalleryItemUpdateDto,
  GalleryItemDto,
} from "@/types";

interface GalleryItemFormContentProps {
  selectedItem?: GalleryItemDto | null;
}

export const GalleryItemFormContent: React.FC<GalleryItemFormContentProps> = ({
  selectedItem,
}) => {
  const { hasErrors } = useFormHook();
  const { reset } = useForm();
  const {
    galleryId,
    postGalleryItem,
    putGalleryItem,
    galleryItemLoading,
    mediaTypeOptions,
  } = useGalleryAddEdit();

  const handleSubmit = async (values: any) => {
    if (selectedItem?.id) {
      // Item güncelleme
      const filteredData = filterDataForEdit(values) as GalleryItemUpdateDto;
      await putGalleryItem(filteredData);
    } else {
      // Yeni item ekleme
      const formData: GalleryItemCreateDto = {
        galleryId: parseInt(galleryId || "0"),
        ...values,
      };
      await postGalleryItem(formData);
    }
  };

  const handleCancel = () => {
    reset();
  };

  const isLoading = galleryItemLoading;

  return (
    <Form onSubmit={handleSubmit}>
      <FormValues />
      <div className="row row-gap-24">
        {/* Sol Kolon - Medya Bilgileri */}
        <div className="col-6">
          <div className="d-flex flex-column gap-16">
            <h5 className="mb-0">Medya Bilgileri</h5>
            <FormAutocomplete
              name="itemType"
              label="Medya Tipi"
              options={mediaTypeOptions}
              placeholder="Medya tipi seçin"
              required
            />
            <FormInput
              name="title"
              label="Başlık"
              placeholder="Medya başlığını giriniz..."
            />
          </div>
        </div>

        {/* Sağ Kolon - Açıklama */}
        <div className="col-6">
          <div className="d-flex flex-column gap-16">
            <h5 className="mb-0">Açıklama</h5>
            <FormTextarea
              name="description"
              label="Açıklama"
              placeholder="Medya açıklamasını giriniz..."
              rows={7}
            />
          </div>
        </div>

        <span className="d-block border border-neutral-30 border-dashed" />

        {/* Sol Kolon - Medya Dosyası */}
        <div className="col-6">
          <div className="d-flex flex-column gap-16">
            <h5 className="mb-0">Dosya Yükleme</h5>
            <FileInput
              label="Medya Dosyası"
              type="all"
              variant="outline"
              placeholder="Dosya yüklemek için tıklayın veya sürükleyin"
              maxSize={50}
              uploadButtonText="Dosya Yükle"
              name="fileUrl"
            />
            <FormInput
              name="fileUrl"
              label="Veya Manuel Dosya URL"
              placeholder="https://egitimara.com/images/galleries/maslak-tour/entrance-01.jpg"
              required
            />
            <div className="row g-3">
              <div className="col-6">
                <FormInput
                  name="fileName"
                  label="Dosya Adı"
                  placeholder="maslak_entrance_01.jpg"
                  required
                />
              </div>
              <div className="col-6">
                <FormInput
                  name="originalFileName"
                  label="Orijinal Dosya Adı"
                  placeholder="IMG_0001.JPG"
                  required
                />
              </div>
            </div>
            <div className="row g-3">
              <div className="col-6">
                <FormInput
                  name="fileSizeBytes"
                  label="Dosya Boyutu (Byte)"
                  type="number"
                  placeholder="2456789"
                  required
                />
              </div>
              <div className="col-6">
                <FormInput
                  name="mimeType"
                  label="MIME Tipi"
                  placeholder="image/jpeg, video/mp4..."
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Kolon - Thumbnail ve Alt Metin */}
        <div className="col-6">
          <div className="d-flex flex-column gap-16">
            <h5 className="mb-0">Thumbnail ve Alt Metin</h5>
            <div>
              <FileInput
                label="Thumbnail Görseli"
                type="img"
                variant="outline"
                placeholder="Thumbnail yüklemek için tıklayın"
                maxSize={5}
                uploadButtonText="Thumbnail Yükle"
                name="thumbnailUrl"
              />
              <p className="text-xs text-neutral-500 mt-8 mb-0">
                JPG, PNG, GIF formatları desteklenir • Maksimum dosya boyutu:
                5MB
              </p>
            </div>
            <FormInput
              name="thumbnailUrl"
              label="Veya Manuel Thumbnail URL"
              placeholder="https://egitimara.com/images/galleries/maslak-tour/thumbs/entrance-01-thumb.jpg"
            />
            <FormInput
              name="altText"
              label="Alt Metin"
              placeholder="Görsel için alternatif metin giriniz..."
            />
          </div>
        </div>

        {/* Divider */}
        <span className="d-block border border-neutral-30 border-dashed" />

        <div className="col-12">
          <h5>Görsel/Video Özellikleri</h5>
        </div>

        <div className="col-3">
          <FormInput
            name="width"
            label="Genişlik (px)"
            type="number"
            placeholder="Genişlik..."
          />
        </div>

        <div className="col-3">
          <FormInput
            name="height"
            label="Yükseklik (px)"
            type="number"
            placeholder="Yükseklik..."
          />
        </div>

        <div className="col-3">
          <FormInput
            name="durationSeconds"
            label="Süre (Saniye)"
            type="number"
            placeholder="Video süresi..."
          />
        </div>

        <div className="col-3">
          <FormInput
            name="videoFormat"
            label="Video Format"
            placeholder="Örn: MP4, AVI, MOV..."
          />
        </div>

        {/* Divider */}
        <span className="d-block border border-neutral-30 border-dashed" />

        <div className="col-12">
          <h5>Kamera/Cihaz Bilgileri</h5>
        </div>

        <div className="col-4">
          <FormInput
            name="cameraMake"
            label="Kamera Markası"
            placeholder="Kamera markası..."
          />
        </div>

        <div className="col-4">
          <FormInput
            name="cameraModel"
            label="Kamera Modeli"
            placeholder="Kamera modeli..."
          />
        </div>

        <div className="col-4">
          <FormInput
            name="takenAt"
            label="Çekim Tarihi"
            type="date"
            placeholder="Çekim tarihi..."
          />
        </div>

        {/* Divider */}
        <span className="d-block border border-neutral-30 border-dashed" />

        <div className="col-12">
          <h5>Konum Bilgileri</h5>
        </div>

        <div className="col-4">
          <FormInput
            name="locationName"
            label="Konum Adı"
            placeholder="Konum adı..."
          />
        </div>

        <div className="col-4">
          <FormInput
            name="latitude"
            label="Enlem (Latitude)"
            type="number"
            step="0.000001"
            placeholder="Enlem (-90 ile 90 arası)..."
          />
        </div>

        <div className="col-4">
          <FormInput
            name="longitude"
            label="Boylam (Longitude)"
            type="number"
            step="0.000001"
            placeholder="Boylam (-180 ile 180 arası)..."
          />
        </div>

        {/* Divider */}
        <span className="d-block border border-neutral-30 border-dashed" />

        <div className="col-12">
          <h5>Organizasyon ve Ayarlar</h5>
        </div>

        <div className="col-6">
          <FormInput
            name="sortOrder"
            label="Sıralama"
            type="number"
            placeholder="Sıralama numarası girin"
          />
        </div>

        <div className="col-6">
          <FormInput
            name="tags"
            label="Etiketler"
            placeholder="Virgülle ayrılmış etiketler giriniz..."
          />
        </div>

        <div className="col-12">
          <div className="d-flex gap-24">
            <FormCheckbox name="isFeatured" label="Öne Çıkan" />
            <FormCheckbox name="isCover" label="Kapak Görseli" />
          </div>
        </div>

        {/* Form Actions */}
        <div className="col-12">
          <div className="d-flex justify-content-end gap-12 mt-24">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={hasErrors || isLoading}
              loading={isLoading}
            >
              {selectedItem ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
