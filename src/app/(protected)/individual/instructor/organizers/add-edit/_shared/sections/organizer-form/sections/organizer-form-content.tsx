"use client";

import React from "react";
import { useForm } from "@/contexts/form-context";
import {
  Form,
  FormInput,
  FormTextarea,
  FormAutocomplete,
  FormCheckbox,
} from "@/components/forms";
import { FileInput } from "@/components/file-input";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components";
import { useFormHook } from "@/hooks";
import { useOrganizerAddEdit } from "../../../context/organizer-add-edit-context";
import { useRouter } from "next/navigation";
import { useOrganizersContext } from "@/app/(protected)/individual/instructor/organizers/_shared/contexts";
import { useProvincesData } from "@/app/(protected)/individual/teacher/teacher-profile/add-edit/_shared/hooks/use-provinces-data";
import type { EventOrganizerCreateDto, EventOrganizerUpdateDto } from "@/types";

const ORGANIZER_TYPE_OPTIONS = [
  { label: "Üniversite", value: "UNIVERSITY" },
  { label: "Eğitim Şirketi", value: "EDUCATION_COMPANY" },
  { label: "Dernek", value: "ASSOCIATION" },
  { label: "Devlet Kurumu", value: "GOVERNMENT" },
  { label: "Bireysel Eğitmen", value: "INDIVIDUAL_TRAINER" },
  { label: "Platform", value: "PLATFORM" },
  { label: "Diğer", value: "OTHER" },
];

export const OrganizerFormContent: React.FC = () => {
  const { hasErrors } = useFormHook();
  const { reset } = useForm();
  const router = useRouter();
  const { refetch } = useOrganizersContext();
  const { cityOptions, provincesLoading } = useProvincesData();
  const { isEditMode, postOrganizer, putOrganizer, organizerSubmitLoading } =
    useOrganizerAddEdit();

  const handleSubmit = async (values: any) => {
    let success = false;

    if (isEditMode) {
      const updateData: EventOrganizerUpdateDto = {
        name: values.name || undefined,
        type: values.type || undefined,
        description: values.description || undefined,
        logoUrl: values.logoUrl || undefined,
        website: values.website || undefined,
        email: values.email || undefined,
        phone: values.phone || undefined,
        address: values.address || undefined,
        city: values.city || undefined,
        socialMediaLinks: values.socialMediaLinks || undefined,
        isVerified: values.isVerified,
        isActive: values.isActive,
        slug: values.slug || undefined,
      };
      const result = await putOrganizer(updateData);
      success = !!result;
    } else {
      const createData: EventOrganizerCreateDto = {
        name: values.name,
        type: values.type,
        description: values.description || undefined,
        logoUrl: values.logoUrl || undefined,
        website: values.website || undefined,
        email: values.email || undefined,
        phone: values.phone || undefined,
        address: values.address || undefined,
        city: values.city || undefined,
        socialMediaLinks: values.socialMediaLinks || undefined,
        isVerified: values.isVerified ?? false,
        isActive: values.isActive ?? true,
        slug: values.slug || undefined,
      };
      const result = await postOrganizer(createData);
      success = !!result;
    }

    if (success) {
      try {
        await refetch();
        router.push("/individual/instructor/organizers");
        router.refresh();
      } catch (error) {
        console.error("Error during refetch/redirect:", error);
      }
    }
  };

  const handleCancel = () => {
    reset();
    router.back();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row row-gap-24">
        {/* Temel Bilgiler */}
        <div className="col-12">
          <h5 className="mb-3">
            <i className="ph ph-buildings me-2"></i>
            Temel Bilgiler
          </h5>
        </div>

        {/* Logo + Temel Kimlik */}
        <div className="col-md-4">
          <FileInput
            label="Logo"
            name="logoUrl"
            type="img"
            variant="outline"
            placeholder="Logo seçin veya sürükleyin"
            maxSize={2}
          />
        </div>

        <div className="col-md-8">
          <div className="row row-gap-24">
            <div className="col-12">
              <FormInput
                label="Organizatör Adı"
                name="name"
                isRequired
                placeholder="Örn: İstanbul Üniversitesi"
              />
            </div>

            <div className="col-md-6">
              <FormAutocomplete
                label="Organizatör Türü"
                name="type"
                isRequired
                placeholder="Tür seçiniz..."
                options={ORGANIZER_TYPE_OPTIONS}
              />
            </div>

            <div className="col-md-6">
              <FormAutocomplete
                label="Şehir"
                name="city"
                placeholder="Şehir seçiniz..."
                options={cityOptions}
                loading={provincesLoading}
              />
            </div>
          </div>
        </div>

        {/* Slug - Devre dışı */}
        {/*
        <div className="col-md-6">
          <FormInput
            label="Slug"
            name="slug"
            placeholder="Örn: istanbul-universitesi (boş bırakılırsa otomatik oluşturulur)"
          />
        </div>
        */}

        <div className="col-12">
          <FormTextarea
            label="Açıklama"
            name="description"
            rows={3}
            placeholder="Organizatör hakkında kısa bir açıklama yazın..."
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <Divider size="xxs" />
        </div>

        {/* İletişim Bilgileri */}
        <div className="col-12">
          <h5 className="mb-3">
            <i className="ph ph-address-book me-2"></i>
            İletişim Bilgileri
          </h5>
        </div>

        <div className="col-md-6">
          <FormInput
            label="E-posta"
            name="email"
            type="email"
            placeholder="ornek@organizator.com"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Telefon"
            name="phone"
            type="tel"
            placeholder="0555 123 45 67"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Web Sitesi"
            name="website"
            placeholder="https://www.ornek.com"
          />
        </div>

        <div className="col-12">
          <FormTextarea
            label="Tam Adres"
            name="address"
            rows={3}
            placeholder="Cadde, mahalle, ilçe, il bilgilerini giriniz..."
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <Divider size="xxs" />
        </div>

        {/* Sosyal Medya - Geçici olarak devre dışı */}
        {/*
        <div className="col-12">
          <h5 className="mb-3">
            <i className="ph ph-share-network me-2"></i>
            Sosyal Medya
          </h5>
        </div>

        <div className="col-12">
          <FormTextarea
            label="Sosyal Medya Bağlantıları"
            name="socialMediaLinks"
            rows={3}
            placeholder='JSON formatında giriniz: {"twitter": "https://...", "linkedin": "https://..."}'
          />
        </div>

        <div className="col-12">
          <Divider size="xxs" />
        </div>
        */}

        {/* Durum */}
        <div className="col-12">
          <h5 className="mb-3">
            <i className="ph ph-toggles me-2"></i>
            Durum
          </h5>
        </div>

        <div className="col-md-6">
          <FormCheckbox label="Aktif" name="isActive" variant="outlined" />
          <small className="text-muted">
            Pasif organizatörler listede görünmez
          </small>
        </div>

        <div className="col-md-6">
          <FormCheckbox
            label="Doğrulanmış"
            name="isVerified"
            variant="outlined"
          />
          <small className="text-muted">
            Doğrulanmış organizatörler öne çıkar
          </small>
        </div>

        {/* Form Actions */}
        <div className="col-12">
          <div className="d-flex justify-content-end gap-12 mt-24">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={organizerSubmitLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={hasErrors || organizerSubmitLoading}
              loading={organizerSubmitLoading}
            >
              {isEditMode ? "Organizatörü Güncelle" : "Organizatör Oluştur"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
