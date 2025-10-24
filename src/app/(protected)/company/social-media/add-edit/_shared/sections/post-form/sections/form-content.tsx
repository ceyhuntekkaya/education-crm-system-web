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
    postLoading,
    postId,
    postTypeOptions,
    postStatusOptions,
  } = usePostAddEdit();

  const handleSubmit = async (values: any) => {
    if (isEditing) {
      const filteredData = filterDataForEdit(values) as PostUpdateDto;
      await putPost(filteredData);
    } else {
      const formData: PostCreateDto = {
        ...values,
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
            name="postType"
            label="Gönderi Tipi"
            options={postTypeOptions}
            placeholder="Gönderi tipini seçiniz..."
            required
            disabled={isEditing}
          />
        </div>

        <div className="col-12">
          <FormInput
            name="title"
            label="Başlık"
            placeholder="Gönderi başlığını giriniz..."
            required
          />
        </div>

        <div className="col-12">
          <FormTextarea
            name="content"
            label="İçerik"
            placeholder="Gönderi içeriğini giriniz..."
            rows={6}
            required
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
            required
          />
        </div>

        <div className="col-4">
          <FormInput
            name="scheduledAt"
            label="Zamanlanmış Tarih"
            type="date"
            placeholder="Tarih seçiniz..."
          />
        </div>

        <div className="col-4">
          <FormInput
            name="expiresAt"
            label="Son Kullanma Tarihi"
            type="date"
            placeholder="Tarih seçiniz..."
          />
        </div>

        <div className="col-12">
          <h5 className="mb-16 mt-16">Medya İçeriği</h5>
        </div>

        <div className="col-4">
          <div className="d-flex flex-column gap-12">
            <FileInput
              label="Öne Çıkan Görsel"
              type="img"
              variant="outline"
              placeholder="Görsel yüklemek için tıklayın veya sürükleyin"
              maxSize={5}
              uploadButtonText="Görsel Yükle"
              name="featuredImageUrl"
            />
            {/* Manuel Featured Image URL */}
            <FormInput
              name="featuredImageUrl"
              label="Veya Manuel Görsel URL"
              placeholder="Görsel URL'sini giriniz..."
            />
          </div>
        </div>

        <div className="col-4">
          <div className="d-flex flex-column gap-12">
            <FileInput
              label="Video"
              type="video"
              variant="outline"
              placeholder="Video yüklemek için tıklayın veya sürükleyin"
              maxSize={50}
              uploadButtonText="Video Yükle"
              name="videoUrl"
            />
            {/* Manuel Video URL */}
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
            />
            {/* Manuel Video Thumbnail URL */}
            <FormInput
              name="videoThumbnailUrl"
              label="Veya Manuel Thumbnail URL"
              placeholder="Thumbnail URL'sini giriniz..."
            />
          </div>
        </div>

        <div className="col-12">
          <h5 className="mb-16 mt-16">Ayarlar</h5>
        </div>

        <div className="col-12">
          <div className="d-flex gap-24">
            <FormCheckbox name="allowComments" label="Yorumlara İzin Ver" />
            <FormCheckbox name="allowLikes" label="Beğenilere İzin Ver" />
            <FormCheckbox name="isFeatured" label="Öne Çıkan" />
            <FormCheckbox name="isPinned" label="Sabitlenmiş" />
          </div>
        </div>

        <div className="col-12">
          <FormInput
            name="pinExpiresAt"
            label="Pin Bitiş Tarihi"
            type="date"
            placeholder="Tarih seçiniz..."
          />
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
        </div>

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
        </div>

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
        </div>

        <div className="col-12">
          <div className="d-flex justify-content-end gap-12 mt-24">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={postLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={hasErrors || postLoading}
              loading={postLoading}
            >
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
