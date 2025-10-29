"use client";

import React from "react";
import { Form, FormInput, FormCheckbox, FormSelect } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/file-input";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useUserAddEdit } from "../../../context";
import { useAddUser, useEditUser } from "../../../hooks";
import { formDataToRegistrationDto, formDataToUpdateDto } from "../../../utils";

/**
 * User form content component
 */
export const UserFormContent: React.FC = () => {
  const { hasErrors } = useFormHook();
  const { reset } = useForm();
  const { isEditing, userId, user } = useUserAddEdit();

  const { postUser, isLoading: isAdding } = useAddUser();
  const { putUser, isLoading: isUpdating } = useEditUser(userId || 0);

  const isLoading = isAdding || isUpdating;

  const handleSubmit = async (values: any) => {
    if (isEditing && userId) {
      const updateData = formDataToUpdateDto(values);
      await putUser(updateData);
    } else {
      const registrationData = formDataToRegistrationDto(values);
      await postUser(registrationData);
    }
  };

  const handleCancel = () => {
    reset();
  };

  const userTypeOptions = [
    { value: "PARENT", label: "Veli" },
    { value: "INSTITUTION_USER", label: "Kurum Kullanıcısı" },
    { value: "STUDENT", label: "Öğrenci" },
  ];

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
            label="Telefon"
            placeholder="Telefon numaranızı giriniz..."
          />
        </div>

        {/* Kullanıcı Tipi - Sadece yeni kullanıcı eklerken */}
        {!isEditing && (
          <div className="col-6">
            <FormSelect
              name="userType"
              label="Kullanıcı Tipi"
              options={userTypeOptions}
              placeholder="Kullanıcı tipini seçiniz..."
              required
            />
          </div>
        )}

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
          />
        </div>

        <div className="col-6">
          <FormInput
            name="profileImageUrl"
            label="Profil Resmi URL (Manuel)"
            placeholder="Profil resmi URL'sini giriniz..."
          />
        </div>

        {/* ADRES BİLGİLERİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Adres Bilgileri</h5>
        </div>

        <div className="col-6">
          <FormInput
            name="countryId"
            label="Ülke ID"
            type="number"
            placeholder="Ülke ID giriniz..."
          />
        </div>

        <div className="col-6">
          <FormInput
            name="provinceId"
            label="İl ID"
            type="number"
            placeholder="İl ID giriniz..."
          />
        </div>

        <div className="col-6">
          <FormInput
            name="districtId"
            label="İlçe ID"
            type="number"
            placeholder="İlçe ID giriniz..."
          />
        </div>

        <div className="col-6">
          <FormInput
            name="neighborhoodId"
            label="Mahalle ID"
            type="number"
            placeholder="Mahalle ID giriniz..."
          />
        </div>

        <div className="col-12">
          <FormInput
            name="addressLine1"
            label="Adres Satırı 1"
            placeholder="Adres satırı 1'i giriniz..."
          />
        </div>

        <div className="col-12">
          <FormInput
            name="addressLine2"
            label="Adres Satırı 2"
            placeholder="Adres satırı 2'yi giriniz..."
          />
        </div>

        <div className="col-6">
          <FormInput
            name="postalCode"
            label="Posta Kodu"
            placeholder="Posta kodunu giriniz..."
          />
        </div>

        {/* KONUM BİLGİLERİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Konum Bilgileri</h5>
        </div>

        <div className="col-6">
          <FormInput
            name="latitude"
            label="Enlem"
            type="number"
            step="any"
            placeholder="Enlem giriniz..."
          />
        </div>

        <div className="col-6">
          <FormInput
            name="longitude"
            label="Boylam"
            type="number"
            step="any"
            placeholder="Boylam giriniz..."
          />
        </div>

        {/* TERCİHLER */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Bildirim Tercihleri</h5>
        </div>

        <div className="col-12">
          <FormCheckbox
            name="emailNotifications"
            label="E-posta bildirimleri almak istiyorum"
          />
        </div>

        <div className="col-12">
          <FormCheckbox
            name="smsNotifications"
            label="SMS bildirimleri almak istiyorum"
          />
        </div>

        <div className="col-12">
          <FormCheckbox
            name="marketingEmails"
            label="Pazarlama e-postaları almak istiyorum"
          />
        </div>

        {/* DİL VE ZAMAN DİLİMİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Dil ve Zaman Dilimi</h5>
        </div>

        <div className="col-6">
          <FormInput
            name="preferredLanguage"
            label="Tercih Edilen Dil"
            placeholder="Örn: tr, en"
          />
        </div>

        <div className="col-6">
          <FormInput
            name="timezone"
            label="Zaman Dilimi"
            placeholder="Örn: Europe/Istanbul"
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
                required
              />
            </div>

            <div className="col-12">
              <FormCheckbox
                name="acceptPrivacy"
                label="Gizlilik politikasını okudum ve kabul ediyorum"
                required
              />
            </div>

            <div className="col-12">
              <FormCheckbox
                name="acceptMarketing"
                label="Pazarlama iletişimlerine izin veriyorum"
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
              variant="primary"
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
