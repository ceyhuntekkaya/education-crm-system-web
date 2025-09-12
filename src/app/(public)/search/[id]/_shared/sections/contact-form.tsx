"use client";
import * as yup from "yup";
import { Button, Form, FormInput, FormTextarea } from "@/components";
import { FormProvider } from "@/contexts";
import { FormValues } from "@/types";

const validationSchema = yup.object({
  name: yup.string().required("İsim zorunludur"),
  email: yup
    .string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email zorunludur"),
  phone: yup.string().required("Telefon numarası zorunludur"),
  message: yup.string().required("Mesaj zorunludur"),
});

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

interface ContactFormProps {
  schoolId?: number;
  campusId?: number;
}

const ContactForm: React.FC<ContactFormProps> = ({ schoolId, campusId }) => {
  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <ContactFormContent schoolId={schoolId} campusId={campusId} />
    </FormProvider>
  );
};

const ContactFormContent: React.FC<ContactFormProps> = ({
  schoolId,
  campusId,
}) => {
  const onSubmit = async (values: FormValues) => {
    const contactRequest = {
      name: String(values.name ?? ""),
      email: String(values.email ?? ""),
      phone: String(values.phone ?? ""),
      message: String(values.message ?? ""),
      schoolId: schoolId,
      campusId: campusId,
    };

    try {
      // TODO: API çağrısını buraya ekle
      console.log("Contact form submitted:", contactRequest);

      // Başarılı gönderim sonrası bilgilendirme
      alert("Mesajınız başarıyla gönderildi!");

      // Form alanlarını sıfırla (isteğe bağlı)
      // window.location.reload();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
        <h4 className="mb-16">İletişime Geç</h4>
        <span className="d-block border border-neutral-30 my-24 border-dashed" />

        <Form onSubmit={onSubmit} className="d-flex flex-column gap-20">
          <FormInput
            name="name"
            label="İsim"
            placeholder="İsminizi girin..."
            variant="outline"
          />

          <FormInput
            type="email"
            name="email"
            label="Email"
            placeholder="Email adresinizi girin..."
            variant="outline"
          />

          <FormInput
            type="tel"
            name="phone"
            label="Telefon"
            placeholder="Telefon numaranızı girin..."
            variant="outline"
          />

          <FormTextarea
            name="message"
            label="Mesaj"
            placeholder="Mesajınızı girin..."
            variant="outline"
            rows={4}
          />

          <Button
            type="submit"
            rightIcon="ph-arrow-up-right"
            className="rounded-pill mt-20"
          >
            Mesaj Gönder
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
