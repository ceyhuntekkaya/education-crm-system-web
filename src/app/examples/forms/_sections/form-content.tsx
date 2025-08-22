import React from "react";
import {
  Form,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormButton,
  FormAutoComplete,
} from "@/components";
import { useFormHook } from "@/hooks";
import { FormValues } from "@/contexts";

const categoryOptions = [
  { value: "student", label: "Öğrenci" },
  { value: "teacher", label: "Öğretmen" },
  { value: "admin", label: "Yönetici" },
  { value: "parent", label: "Veli" },
];

const cityOptions = [
  { value: "istanbul", label: "İstanbul" },
  { value: "ankara", label: "Ankara" },
  { value: "izmir", label: "İzmir" },
  { value: "bursa", label: "Bursa" },
  { value: "antalya", label: "Antalya" },
  { value: "adana", label: "Adana" },
  { value: "konya", label: "Konya" },
  { value: "gaziantep", label: "Gaziantep" },
  { value: "kayseri", label: "Kayseri" },
  { value: "mersin", label: "Mersin" },
  { value: "eskisehir", label: "Eskişehir" },
  { value: "diyarbakir", label: "Diyarbakır" },
  { value: "samsun", label: "Samsun" },
  { value: "denizli", label: "Denizli" },
  { value: "sakarya", label: "Sakarya" },
  { value: "trabzon", label: "Trabzon" },
  { value: "mugla", label: "Muğla" },
  { value: "balikesir", label: "Balıkesir" },
  { value: "malatya", label: "Malatya" },
  { value: "erzurum", label: "Erzurum" },
  { value: "canakkale", label: "Çanakkale" },
  { value: "afyonkarahisar", label: "Afyonkarahisar" },
  { value: "kirklareli", label: "Kırklareli" },
  { value: "kutahya", label: "Kütahya" },
  { value: "usak", label: "Uşak" },
  { value: "nevsehir", label: "Nevşehir" },
];

export default function FormContent({
  onSubmit,
}: {
  onSubmit: (values: FormValues) => Promise<void>;
}) {
  const { resetForm } = useFormHook();

  const handleReset = () => {
    resetForm();
  };

  return (
    <Form onSubmit={onSubmit} className="space-y-4">
      <FormInput
        name="name"
        label="Ad Soyad"
        placeholder="Adınızı ve soyadınızı giriniz"
        helperText="Gerçek ad ve soyadınızı yazınız"
        fullWidth
      />
      <FormInput
        name="email"
        type="email"
        label="E-posta"
        placeholder="E-posta adresinizi giriniz"
        helperText="Geçerli bir e-posta adresi girin (örn: kullanici@ornek.com)"
        fullWidth
      />
      <FormInput
        name="age"
        type="number"
        label="Yaş"
        placeholder="Yaşınızı giriniz"
        helperText="18-100 yaş aralığında olmalıdır"
        fullWidth
      />
      <FormSelect
        name="category"
        label="Kategori"
        placeholder="Kategori seçiniz"
        options={categoryOptions}
        helperText="Size en uygun kategoriyi seçiniz"
      />
      <FormAutoComplete
        name="city"
        label="Şehir"
        placeholder="Şehir adını yazın veya seçin"
        options={cityOptions}
        helperText="Yaşadığınız şehri seçiniz veya yazınız"
      />
      <FormTextarea
        name="description"
        label="Açıklama"
        placeholder="Kendiniz hakkında kısa bir açıklama yazınız"
        rows={3}
        helperText="İsteğe bağlı - Kendinizi tanıtın (max 500 karakter)"
        fullWidth
      />
      <FormCheckbox
        name="terms"
        label="Kullanım şartlarını kabul ediyorum"
        helperText="Devam etmek için kullanım şartlarını kabul etmelisiniz"
      />
      <div className="flex gap-3 pt-4">
        <FormButton variant="primary" disableOnInvalid className="flex-1">
          Kayıt Ol
        </FormButton>
        <FormButton type="button" variant="secondary" onClick={handleReset}>
          Temizle
        </FormButton>
      </div>
    </Form>
  );
}
