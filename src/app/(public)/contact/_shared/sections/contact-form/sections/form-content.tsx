"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormTextarea,
  FormAutocomplete,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useSnackbar } from "@/contexts";
import { FormValues } from "@/types/form";
import { ContactFormData } from "../types";
import { useProvinces } from "../hooks";

export const ContactFormContent: React.FC = () => {
  const { hasErrors } = useFormHook();
  const { reset } = useForm();
  const { showSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // İl verilerini API'den çek
  const { provinceOptions, loading: provincesLoading } = useProvinces();

  const handleSubmit = async (formValues: FormValues) => {
    const values = formValues as unknown as ContactFormData;
    setIsSubmitting(true);

    try {
      // Seçilen ilin adını bul
      const selectedProvince = provinceOptions.find(
        (p) => p.value === values.provinceId
      );
      const provinceName = selectedProvince?.label || values.provinceId;

      // E-posta içeriği oluştur
      const subject = encodeURIComponent(
        `Eğitim İste - Kurum Bilgi Talebi: ${values.institutionName}`
      );
      const body = encodeURIComponent(
        `İl: ${provinceName}\n` +
          `Kurum Adı: ${values.institutionName}\n` +
          `İletişim Kişisi: ${values.contactName}\n` +
          `Telefon: ${values.phone}\n` +
          `E-posta: ${values.email}\n` +
          `Mesaj: ${values.message || "-"}`
      );

      // Mailto ile e-posta uygulamasını aç
      window.location.href = `mailto:bilgi@egitimsite.com?subject=${subject}&body=${body}`;

      showSnackbar(
        "Talebiniz iletildi. E-posta uygulamanız açılacaktır.",
        "success"
      );

      // Formu sıfırla
      reset();
    } catch (error) {
      showSnackbar("Bir hata oluştu. Lütfen tekrar deneyiniz.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row row-gap-24">
        {/* İl */}
        <div className="col-12">
          <FormAutocomplete
            name="provinceId"
            label="İl"
            placeholder="İl seçiniz..."
            options={provinceOptions}
            noOptionsText="İl bulunamadı"
            isLoading={provincesLoading}
            isRequired
          />
        </div>

        {/* Kurum Adı */}
        <div className="col-12">
          <FormInput
            name="institutionName"
            label="Kurum Adı"
            placeholder="Kurum adını giriniz..."
            isRequired
          />
        </div>

        {/* Ad Soyad */}
        <div className="col-12">
          <FormInput
            name="contactName"
            label="Ad Soyad"
            placeholder="Adınızı ve soyadınızı giriniz..."
            isRequired
          />
        </div>

        {/* Telefon ve E-posta */}
        <div className="col-md-12">
          <FormInput
            name="phone"
            label="Telefon"
            type="tel"
            placeholder="05XX XXX XX XX"
            isRequired
          />
        </div>

        <div className="col-md-12">
          <FormInput
            name="email"
            label="E-posta"
            type="email"
            placeholder="ornek@kurum.com"
            isRequired
          />
        </div>

        {/* Mesaj */}
        <div className="col-12">
          <FormTextarea
            name="message"
            label="Mesajınız (Opsiyonel)"
            placeholder="Platformla ilgili sorularınızı veya özel taleplerinizi yazabilirsiniz..."
            rows={4}
          />
        </div>

        {/* Bilgi Notu */}
        <div className="col-12">
          <div className="contact-form__info-note">
            <i className="ph ph-info me-8"></i>
            <small>
              Bilgileriniz <strong>bilgi@egitimsite.com</strong> adresine
              iletilecektir.
            </small>
          </div>
        </div>

        {/* Butonlar */}
        <div className="col-12">
          <div className="d-flex gap-16 justify-content-end mt-16">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Temizle
            </Button>
            <Button
              variant="success"
              type="submit"
              disabled={hasErrors || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="ph ph-spinner ph-spin me-8"></i>
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <i className="ph ph-paper-plane-tilt me-8"></i>
                  Gönder
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
