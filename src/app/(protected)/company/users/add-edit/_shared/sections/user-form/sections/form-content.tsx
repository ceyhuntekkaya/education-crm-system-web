"use client";

import React from "react";
import { Form, FormInput, FormCheckbox, FormValues } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/file-input";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useAuth } from "@/contexts/auth-context";
import { useUserAddEdit } from "../../../context";
import { formDataToRegistrationDto, formDataToUpdateDto } from "../../../utils";
import { Divider } from "@/components";

/**
 * User form content component
 */
export const UserFormContent: React.FC = () => {
  const { hasErrors, errors } = useFormHook();
  const { reset } = useForm();
  const { user: authUser } = useAuth(); // Oturum açmış kullanıcı bilgileri
  const { isEditing, userId, user, postUser, isAdding, putUser, isUpdating } =
    useUserAddEdit();

  console.log("errrors =>", errors);

  const isLoading = isAdding || isUpdating;

  const handleSubmit = async (values: any) => {
    // Hem ekleme hem düzenleme modunda authUser'dan verileri al ve birleştir
    let submitData = values;

    if (authUser) {
      // Konum bilgilerini önce user'dan, yoksa kampüsten al
      const provinceId = authUser.province?.id || authUser.campus?.province?.id;
      const districtId = authUser.district?.id || authUser.campus?.district?.id;
      const neighborhoodId =
        authUser.neighborhood?.id || authUser.campus?.neighborhood?.id;

      // Latitude ve longitude - null veya undefined olarak gönder
      const latitude = authUser.latitude ?? null;
      const longitude = authUser.longitude ?? null;

      submitData = {
        ...values,
        // AuthUser'dan veya kampüsten gelen bilgileri ekle
        countryId: authUser.country?.id,
        provinceId,
        districtId,
        neighborhoodId,
        addressLine1: authUser.addressLine1 || "",
        addressLine2: authUser.addressLine2 || "",
        postalCode: authUser.postalCode || "",
        latitude,
        longitude,
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
      <FormValues />
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
            isRequired
          />
        </div>

        {/* Soyad */}
        <div className="col-6">
          <FormInput
            name="lastName"
            label="Soyad"
            placeholder="Soyadınızı giriniz..."
            isRequired
          />
        </div>

        {/* E-posta */}
        <div className="col-6">
          <FormInput
            name="email"
            label="E-posta"
            type="email"
            placeholder="E-posta adresinizi giriniz..."
            isRequired
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
            isRequired
          />
        </div>

        <Divider />

        {/* ŞİFRE - Sadece yeni kullanıcı eklerken */}
        {!isEditing && (
          <>
            <div className="col-12">
              <h5 className="mb-16">Şifre Bilgileri</h5>
            </div>

            <div className="col-6">
              <FormInput
                name="password"
                label="Şifre"
                type="password"
                placeholder="Şifrenizi giriniz..."
                isRequired
              />
            </div>

            <div className="col-6">
              <FormInput
                name="confirmPassword"
                label="Şifre Onayı"
                type="password"
                placeholder="Şifrenizi tekrar giriniz..."
                isRequired
              />
            </div>
          </>
        )}
        <Divider />
        {/* PROFİL RESMİ - Sadece düzenleme modunda */}
        {isEditing && (
          <>
            <div className="col-12">
              <h5 className="mb-16 ">Profil Resmi</h5>
            </div>

            <div className="col-12">
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

            {/* <div className="col-6">
              <FormInput
                name="profileImageUrl"
                label="Profil Resmi URL (Manuel)"
                placeholder="Profil resmi URL'sini giriniz..."
              />
            </div> */}
          </>
        )}

        <Divider />

        {/* BİLDİRİM TERCİHLERİ VE KULLANIM KOŞULLARI */}
        {/* Bildirim Tercihleri - Sol Kolon */}
        <div className="col-12 col-md-6">
          <h5 className="mb-16">Bildirim Tercihleri</h5>

          <div className="d-flex flex-column gap-16">
            <FormCheckbox
              name="emailNotifications"
              label="E-posta bildirimleri almak istiyorum"
              variant="outlined"
            />

            <FormCheckbox
              name="smsNotifications"
              label="SMS bildirimleri almak istiyorum"
              variant="outlined"
            />

            <FormCheckbox
              name="marketingEmails"
              label="Pazarlama e-postaları almak istiyorum"
              variant="outlined"
            />
          </div>
        </div>

        {/* Kullanım Koşulları - Sağ Kolon - Sadece yeni kullanıcı eklerken */}
        {!isEditing && (
          <div className="col-12 col-md-6">
            <h5 className="mb-16">Kullanım Koşulları</h5>

            <div className="d-flex flex-column gap-16">
              <FormCheckbox
                name="acceptTerms"
                label="Kullanım koşullarını okudum ve kabul ediyorum"
                variant="outlined"
                isRequired
              />

              <FormCheckbox
                name="acceptPrivacy"
                label="Gizlilik politikasını okudum ve kabul ediyorum"
                variant="outlined"
                isRequired
              />

              <FormCheckbox
                name="acceptMarketing"
                label="Pazarlama iletişimlerine izin veriyorum"
                variant="outlined"
              />
            </div>
          </div>
        )}

        {/* FORM ACTIONS */}
        <div className="col-12">
          <div className="d-flex justify-content-end mt-4 gap-12">
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
