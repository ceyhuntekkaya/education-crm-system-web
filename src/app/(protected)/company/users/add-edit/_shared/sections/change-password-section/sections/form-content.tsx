"use client";

import React from "react";
import { Form, FormInput } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useUserAddEdit } from "../../../context";
import { PasswordChangeDto } from "@/types";

/**
 * Password change form content component
 */
export const PasswordChangeFormContent: React.FC = () => {
  const { hasErrors } = useFormHook();
  const { reset } = useForm();
  const { changePassword, changePasswordLoading } = useUserAddEdit();

  const handleSubmit = async (values: any) => {
    const passwordData: PasswordChangeDto = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };

    await changePassword(passwordData);
    // Başarılı olursa formu sıfırla
    reset();
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row row-gap-24">
        {/* ŞİFRE BİLGİLERİ */}
        <div className="col-12">
          <h5 className="mb-16">Şifre Bilgileri</h5>
        </div>

        {/* Mevcut Şifre */}
        <div className="col-12">
          <FormInput
            name="currentPassword"
            label="Mevcut Şifre"
            type="password"
            placeholder="Mevcut şifrenizi giriniz..."
            required
          />
        </div>

        {/* Yeni Şifre */}
        <div className="col-6">
          <FormInput
            name="newPassword"
            label="Yeni Şifre"
            type="password"
            placeholder="Yeni şifrenizi giriniz..."
            required
          />
        </div>

        {/* Şifre Onayı */}
        <div className="col-6">
          <FormInput
            name="confirmPassword"
            label="Şifre Onayı"
            type="password"
            placeholder="Yeni şifrenizi tekrar giriniz..."
            required
          />
        </div>

        {/* ŞİFRE GEREKSİNİMLERİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Şifre Gereksinimleri</h5>
        </div>

        <div className="col-12">
          <div className="alert alert-info">
            <ul className="mb-0">
              <li>En az 8 karakter</li>
              <li>En az bir büyük harf (A-Z)</li>
              <li>En az bir küçük harf (a-z)</li>
              <li>En az bir rakam (0-9)</li>
            </ul>
          </div>
        </div>

        {/* FORM ACTIONS */}
        <div className="col-12">
          <div className="d-flex gap-3 justify-content-end mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={changePasswordLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={hasErrors || changePasswordLoading}
              loading={changePasswordLoading}
            >
              Şifreyi Değiştir
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
