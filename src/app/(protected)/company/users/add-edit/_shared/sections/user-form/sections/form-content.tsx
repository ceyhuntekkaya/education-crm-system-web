"use client";

import React from "react";
import { Form, FormInput, FormCheckbox } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/file-input";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useAuth } from "@/contexts/auth-context";
import { useUserAddEdit } from "../../../context";
import { useAddUser, useEditUser } from "../../../hooks";
import { formDataToRegistrationDto, formDataToUpdateDto } from "../../../utils";

/**
 * User form content component
 */
export const UserFormContent: React.FC = () => {
  const { hasErrors } = useFormHook();
  const { reset } = useForm();
  const { user: authUser } = useAuth(); // Oturum açmış kullanıcı bilgileri
  const { isEditing, userId, user } = useUserAddEdit();

  const { postUser, isLoading: isAdding } = useAddUser();
  const { putUser, isLoading: isUpdating } = useEditUser(userId || 0);

  const isLoading = isAdding || isUpdating;

  const handleSubmit = async (values: any) => {
    // Hem ekleme hem düzenleme modunda authUser'dan verileri al ve birleştir
    let submitData = values;

    if (authUser) {
      submitData = {
        ...values,
        // AuthUser'dan gelen bilgileri ekle (her iki modda da)
        countryId: authUser.country?.id,
        provinceId: authUser.province?.id,
        districtId: authUser.district?.id,
        neighborhoodId: authUser.neighborhood?.id,
        addressLine1: authUser.addressLine1,
        addressLine2: authUser.addressLine2,
        postalCode: authUser.postalCode,
        latitude: authUser.latitude,
        longitude: authUser.longitude,
        preferredLanguage: "tr",
        timezone: "Europe/Istanbul",
      };
    }

    // Ekleme modunda userType'ı INSTITUTION_USER olarak ekle
    if (!isEditing) {
      submitData = {
        ...submitData,
        userType: "INSTITUTION_USER",
      };
    }

    // Düzenleme modunda mevcut user'dan userType'ı al
    if (isEditing && user) {
      submitData = {
        ...submitData,
        userType: (user as any).userType,
      };
    }

    if (isEditing && userId) {
      const updateData = formDataToUpdateDto(submitData);
      await putUser(updateData);
    } else {
      const registrationData = formDataToRegistrationDto(submitData);
      await postUser(registrationData);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row row-gap-24">
        {/* TEMEL BİLGİLER */}
        <div className="col-12">
          <h5 className="mb-16">Temel Bilgiler</h5>
        </div>

        {/* Ad */}
        <div className="col-6">
          <FormInput
            name="firstName"
            label="Ad"
            placeholder="Adınızı giriniz..."
            required
          />
        </div>

        {/* Soyad */}
        <div className="col-6">
          <FormInput
            name="lastName"
            label="Soyad"
            placeholder="Soyadınızı giriniz..."
            required
          />
        </div>

        {/* E-posta */}
        <div className="col-6">
          <FormInput
            name="email"
            label="E-posta"
            type="email"
            placeholder="E-posta adresinizi giriniz..."
            required
            disabled={isEditing}
          />
        </div>

        {/* Telefon */}
        <div className="col-6">
          <FormInput
            name="phone"
            type="tel"
            label="Telefon"
            placeholder="Telefon numaranızı giriniz..."
          />
        </div>

        {/* ŞİFRE - Sadece yeni kullanıcı eklerken */}
        {!isEditing && (
          <>
            <div className="col-12">
              <h5 className="mb-16 mt-16">Şifre Bilgileri</h5>
            </div>

            <div className="col-6">
              <FormInput
                name="password"
                label="Şifre"
                type="password"
                placeholder="Şifrenizi giriniz..."
                required
              />
            </div>

            <div className="col-6">
              <FormInput
                name="confirmPassword"
                label="Şifre Onayı"
                type="password"
                placeholder="Şifrenizi tekrar giriniz..."
                required
              />
            </div>
          </>
        )}

        {/* PROFİL RESMİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Profil Resmi</h5>
        </div>

        <div className="col-6">
          <FileInput
            label="Profil Resmi"
            type="img"
            variant="outline"
            placeholder="Profil resmi yüklemek için tıklayın veya sürükleyin"
            maxSize={5}
            uploadButtonText="Profil Resmi Yükle"
            name="profileImageUrl"
            isAutoUpload={true}
          />
        </div>

        <div className="col-6">
          <FormInput
            name="profileImageUrl"
            label="Profil Resmi URL (Manuel)"
            placeholder="Profil resmi URL'sini giriniz..."
          />
        </div>

        {/* BİLDİRİM TERCİHLERİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Bildirim Tercihleri</h5>
        </div>

        <div className="col-12">
          <FormCheckbox
            name="emailNotifications"
            label="E-posta bildirimleri almak istiyorum"
            variant="outlined"
          />
        </div>

        <div className="col-12">
          <FormCheckbox
            name="smsNotifications"
            label="SMS bildirimleri almak istiyorum"
            variant="outlined"
          />
        </div>

        <div className="col-12">
          <FormCheckbox
            name="marketingEmails"
            label="Pazarlama e-postaları almak istiyorum"
            variant="outlined"
          />
        </div>

        {/* KOŞULLAR - Sadece yeni kullanıcı eklerken */}
        {!isEditing && (
          <>
            <div className="col-12">
              <h5 className="mb-16 mt-16">Kullanım Koşulları</h5>
            </div>

            <div className="col-12">
              <FormCheckbox
                name="acceptTerms"
                label="Kullanım koşullarını okudum ve kabul ediyorum"
                variant="outlined"
                required
              />
            </div>

            <div className="col-12">
              <FormCheckbox
                name="acceptPrivacy"
                label="Gizlilik politikasını okudum ve kabul ediyorum"
                variant="outlined"
                required
              />
            </div>

            <div className="col-12">
              <FormCheckbox
                name="acceptMarketing"
                label="Pazarlama iletişimlerine izin veriyorum"
                variant="outlined"
              />
            </div>
          </>
        )}

        {/* FORM ACTIONS */}
        <div className="col-12">
          <div className="d-flex gap-3 justify-content-end mt-4">
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
              {isEditing ? "Güncelle" : "Kullanıcı Oluştur"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
