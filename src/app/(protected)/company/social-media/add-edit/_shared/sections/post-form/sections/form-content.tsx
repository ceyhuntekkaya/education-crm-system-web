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
import { usePostAddEdit } from "../../../context";
import { filterDataForEdit } from "../../../utils";
import { PostCreateDto, PostUpdateDto } from "@/types";
import { useCompany } from "@/app/(protected)/company/_shared";

export const PostFormContent: React.FC = () => {
  const { hasErrors } = useFormHook();
  const { reset } = useForm();
  const { selectedSchool } = useCompany();
  const {
    isEditing,
    postPost,
    putPost,
    postSubmitLoading, // Form submit loading
    postId,
    postTypeOptions,
    postStatusOptions,
  } = usePostAddEdit();

  const handleSubmit = async (values: any) => {
    // Items'ı formatla
    const formattedItems = values.items?.map((item: any) => {
      // Eğer item'da id varsa (mevcut item), ID'yi gönder
      // Eğer item'da id yoksa (yeni item), ID'yi null gönder
      return {
        id: item.id || null, // Mevcut item için ID, yeni item için null
        itemType: item.itemType,
        fileUrl: item.fileUrl,
        fileName: item.fileName,
        sortOrder: item.sortOrder,
      };
    });

    const formattedValues = {
      ...values,
      items: formattedItems,
    };

    if (isEditing) {
      const filteredData = filterDataForEdit(formattedValues) as PostUpdateDto;
      await putPost(filteredData);
    } else {
      const formData: PostCreateDto = {
        ...formattedValues,
        schoolId: selectedSchool?.id || 0,
      };
      await postPost(formData);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* <FormValues /> */}
      <div className="row row-gap-24">
        <div className="col-12">
          <h5 className="mb-16">Temel Bilgiler</h5>
        </div>

        {/* <div className="col-6">
          <FormInput
            name="schoolId"
            label="Okul"
            type="text"
            value={selectedSchool?.name || "Okul seçilmedi"}
            placeholder="Okul bilgisi..."
            disabled
            isRequired
          />
        </div> */}

        <div className="col-6">
          <FormInput
            name="title"
            label="Başlık"
            placeholder="Gönderi başlığını giriniz..."
            isRequired
          />
        </div>

        <div className="col-6">
          <FormAutocomplete
            name="postType"
            label="Gönderi Tipi"
            options={postTypeOptions}
            placeholder="Gönderi tipini seçiniz..."
            isRequired
            disabled={isEditing}
          />
        </div>

        <div className="col-12">
          <FormTextarea
            name="content"
            label="İçerik"
            placeholder="Gönderi içeriğini giriniz..."
            rows={6}
            isRequired
          />
        </div>

        <div className="col-12">
          <h5 className="mb-16 mt-16">Durum ve Zamanlama</h5>
        </div>

        <div className="col-4">
          <FormAutocomplete
            name="status"
            label="Durum"
            options={postStatusOptions}
            placeholder="Durum seçiniz..."
            isRequired
          />
        </div>

        <div className="col-4">
          <FormInput
            name="scheduledAt"
            label="Zamanlanmış Tarih"
            type="datetime-local"
            placeholder="Tarih ve saat seçiniz..."
          />
        </div>

        <div className="col-4">
          <FormInput
            name="expiresAt"
            label="Son Kullanma Tarihi"
            type="datetime-local"
            placeholder="Tarih ve saat seçiniz..."
          />
        </div>

        <span className="d-block border border-neutral-30 my-12 border-dashed" />

        <div className="col-12">
          <h5 className="mb-16 mt-16">Medya İçeriği</h5>
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
              name="featuredImageUrl"
              isAutoUpload
            />
            {/* Manuel Featured Image URL */}
            {/* <FormInput
              name="featuredImageUrl"
              label="Veya Manuel Görsel URL"
              placeholder="Görsel URL'sini giriniz..."
            /> */}
          </div>
        </div>

        {/* <div className="col-4">
          <div className="d-flex flex-column gap-12">
            <FileInput
              label="Video"
              type="video"
              variant="outline"
              placeholder="Video yüklemek için tıklayın veya sürükleyin"
              maxSize={50}
              uploadButtonText="Video Yükle"
              name="videoUrl"
              isAutoUpload
            />
 
            <FormInput
              name="videoUrl"
              label="Veya Manuel Video URL"
              placeholder="Video URL'sini giriniz..."
            />
          </div>
        </div>

        <div className="col-4">
          <div className="d-flex flex-column gap-12">
            <FileInput
              label="Video Thumbnail"
              type="img"
              variant="outline"
              placeholder="Thumbnail yüklemek için tıklayın veya sürükleyin"
              maxSize={5}
              uploadButtonText="Thumbnail Yükle"
              name="videoThumbnailUrl"
              isAutoUpload
            />

            <FormInput
              name="videoThumbnailUrl"
              label="Veya Manuel Thumbnail URL"
              placeholder="Thumbnail URL'sini giriniz..."
            />
          </div>
        </div> */}

        <span className="d-block border border-neutral-30 my-12 border-dashed" />

        {/* Medya Ekleri - Multi File Upload */}
        <div className="col-12">
          <div className="d-flex flex-column gap-16">
            <h5>Medya Ekleri (Çoklu Yükleme)</h5>
            <FileInput
              label="Medya Ekleri (Çoklu Yükleme)"
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

        {/* <span className="d-block border border-neutral-30 my-12 border-dashed" />

        <div className="col-12">
          <h5 className="mb-16 mt-16">Ayarlar</h5>
        </div>

        <div className="col-3">
          <FormCheckbox
            name="allowComments"
            label="Yorumlara İzin Ver"
            variant="outlined"
          />
        </div>

        <div className="col-3">
          <FormCheckbox
            name="allowLikes"
            label="Beğenilere İzin Ver"
            variant="outlined"
          />
        </div>

        <div className="col-3">
          <FormCheckbox
            name="isFeatured"
            label="Öne Çıkan"
            variant="outlined"
          />
        </div>

        <div className="col-3">
          <FormCheckbox
            name="isPinned"
            label="Sabitlenmiş"
            variant="outlined"
          />
        </div>

        <div className="col-12">
          <FormInput
            name="pinExpiresAt"
            label="Pin Bitiş Tarihi"
            type="datetime-local"
            placeholder="Tarih ve saat seçiniz..."
          />
        </div> */}

        {/* <div className="col-12">
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

        <div className="col-6">
          <FormInput
            name="tags"
            label="Etiketler"
            placeholder="Virgülle ayrılmış etiketler giriniz..."
          />
        </div>

        <div className="col-6">
          <FormInput
            name="hashtags"
            label="Hashtag'ler"
            placeholder="Virgülle ayrılmış hashtag'ler giriniz..."
          />
        </div> */}

        {/* <span className="d-block border border-neutral-30 my-12 border-dashed" />

        <div className="col-12">
          <h5 className="mb-16 mt-16">Harici Linkler</h5>
        </div>

        <div className="col-12">
          <FormInput
            name="externalUrl"
            label="Harici URL"
            placeholder="Harici URL giriniz..."
          />
        </div>

        <div className="col-6">
          <FormInput
            name="callToAction"
            label="Eylem Çağrısı"
            placeholder="Eylem çağrısı metni giriniz..."
          />
        </div>

        <div className="col-6">
          <FormInput
            name="ctaUrl"
            label="Eylem Çağrısı URL"
            placeholder="Eylem çağrısı URL'si giriniz..."
          />
        </div> */}
        {/* 
        <span className="d-block border border-neutral-30 my-12 border-dashed" />

        <div className="col-12">
          <h5 className="mb-16 mt-16">Konum Bilgileri</h5>
        </div>

        <div className="col-12">
          <FormInput
            name="locationName"
            label="Konum Adı"
            placeholder="Konum adı giriniz..."
          />
        </div>

        <div className="col-6">
          <FormInput
            name="latitude"
            label="Enlem (Latitude)"
            type="number"
            placeholder="Enlem giriniz..."
          />
        </div>

        <div className="col-6">
          <FormInput
            name="longitude"
            label="Boylam (Longitude)"
            type="number"
            placeholder="Boylam giriniz..."
          />
        </div> */}

        <div className="col-12">
          <div className="d-flex justify-content-end gap-12 mt-24">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={postSubmitLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={hasErrors || postSubmitLoading}
              loading={postSubmitLoading}
            >
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
