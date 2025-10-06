"use client";

import React from "react";
import { Button, Form, FormTextarea } from "@/components";
import { FormProvider, useAuth } from "@/contexts";
import { FormValues } from "@/types";
import { useEffect } from "react";
import { useInstitutionDetail } from "../../contexts";

import { noteInitialValues, noteValidationSchema } from "./schemas";

// Initial values ve validation schema artık schemas'dan import ediliyor

const Notes: React.FC = () => {
  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
        <h4 className="mb-16">Notlar</h4>
        <span className="d-block border border-neutral-30 my-24 border-dashed" />

        <FormProvider
          initialValues={noteInitialValues}
          validationSchema={noteValidationSchema}
        >
          <NotesFormContent />
        </FormProvider>
      </div>
    </div>
  );
};

const NotesFormContent: React.FC = () => {
  const { user } = useAuth();
  const { institutionDetail } = useInstitutionDetail();

  useEffect(() => {
    // Kullanıcı bilgileri yüklendiğinde otomatik doldurma yapılabilir
    if (user) {
      // Eğer gerekli ise kullanıcı bilgilerini form alanlarına doldurabilirsiniz
    }
  }, [user]);

  const handleSubmit = async (values: FormValues) => {
    try {
      const noteData = {
        ...values,
        schoolId: institutionDetail?.school?.id,
        campusId: institutionDetail?.campus?.id,
        createdBy: user?.id,
        createdAt: new Date().toISOString(),
      };

      console.log("Note Data:", noteData);

      // API call logic here
      // await createNote(noteData);

      // Success handling
      // showSuccessMessage("Not başarıyla kaydedildi");
    } catch (error) {
      console.error("Note save error:", error);
      // Error handling
      // showErrorMessage("Not kaydedilirken bir hata oluştu");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex flex-column gap-20">
      <FormTextarea
        name="noteContent"
        // label="Not İçeriği"
        placeholder="Notunuzu buraya yazınız..."
        variant="outline"
        rows={6}
      />

      <Button
        type="submit"
        rightIcon="ph-arrow-up-right"
        className="rounded-pill mt-20"
      >
        Not Kaydet
      </Button>
    </Form>
  );
};

export default Notes;
