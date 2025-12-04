import React, { useState, Suspense } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Icon,
} from "@/components/ui";
import { Form, FormInput } from "@/components/forms";
import { FormProvider } from "@/contexts";
import { Loading } from "@/components";
import { FormValues } from "@/types";
import { useFormHook } from "@/hooks";
import { useAuth } from "@/contexts/auth-context";
import { useSaveFavoriteSearch } from "../hooks";
import { useSearchContext } from "../contexts";
import { createApiParams, cleanApiParams } from "../utils";

interface SaveFavoriteSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Form içeriği component'i
const SaveFavoriteSearchModalContent: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { setValue, values: modalFormValues } = useFormHook();
  const { formValues, institutionTypes } = useSearchContext();
  const { user } = useAuth();
  const { saveFavoriteSearch, loading, error } = useSaveFavoriteSearch(onClose);

  // Form values'ların bir kopyasını al (reference koparmak için)
  const searchFormData = React.useMemo(() => {
    return JSON.parse(JSON.stringify(formValues));
  }, [formValues]);

  const handleSaveClick = () => {
    if (
      !modalFormValues.favoriteSearchName ||
      !(modalFormValues.favoriteSearchName as string).trim()
    ) {
      return;
    }

    if (!user?.id) {
      console.error("User ID not found");
      return;
    }

    const favoriteSearchName = (
      modalFormValues.favoriteSearchName as string
    ).trim();

    // Debug: Context'teki form values'ları kontrol et
    console.log("Search formValues from context:", searchFormData);

    // Form values'ları search ile aynı API formatına dönüştür
    const apiParams = createApiParams(searchFormData, institutionTypes || []);
    const cleanParams = cleanApiParams(apiParams);

    console.log("API formatında kayıt edilecek data:", cleanParams);

    // API formatındaki data'yı JSON string'e çevir
    const dataString = JSON.stringify(cleanParams);

    saveFavoriteSearch({
      parentId: user.id,
      name: favoriteSearchName,
      data: dataString,
    });
  };

  const handleFormSubmit = (
    modalFormValues: FormValues,
    event?: React.FormEvent
  ): void => {
    // Form'un default submit behavior'ını engelle
    event?.preventDefault();

    // Form submit'i sadece engellemek için, işlem handleSaveClick'te
    return;
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
        {/* Favori Arama Adı Input */}
        <div className="mb-32">
          <div className="card bg-main-25 border border-main-200">
            <div className="card-body p-20">
              <div className="d-flex align-items-center gap-12 mb-16">
                <div className="w-32 h-32 bg-main-600 rounded-8 d-flex align-items-center justify-content-center">
                  <i className="ph-bold ph-textbox text-white text-sm" />
                </div>
                <h6 className="text-main-700 fw-semibold mb-0">
                  Favori Arama Adı
                </h6>
              </div>

              <FormInput
                name="favoriteSearchName"
                placeholder="Örn: Lise Araması, İstanbul Kurumları, Bütçe Dostu Kurumlar..."
                required
              />

              <div className="d-flex align-items-start gap-8 mt-12">
                <i className="ph ph-lightbulb text-main-500 text-sm mt-2" />
                <span className="text-main-600 text-xs lh-sm">
                  İpucu: Anlamlı bir isim seçin, daha sonra kolayca
                  bulabilirsiniz
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Butonları */}
        <div className="d-flex align-items-center gap-12 pt-20 border-top border-neutral-100">
          <Button
            variant="outline"
            onClick={onClose}
            type="button"
            leftIcon="ph-x"
            className="flex-grow-1"
          >
            İptal
          </Button>
          <Button
            variant="inline"
            type="button"
            onClick={handleSaveClick}
            leftIcon="ph-bold ph-heart"
            className="flex-grow-1"
            loading={loading}
            disabled={loading}
          >
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export const SaveFavoriteSearchModal: React.FC<
  SaveFavoriteSearchModalProps
> = ({ isOpen, onClose }) => {
  const initialValues: FormValues = {
    favoriteSearchName: "",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" scrollable={true}>
      <ModalHeader title="Favori Arama Kaydet" onClose={onClose} />
      <ModalBody scrollable={true}>
        <FormProvider initialValues={initialValues}>
          <Suspense fallback={<Loading />}>
            <SaveFavoriteSearchModalContent onClose={onClose} />
          </Suspense>
        </FormProvider>
      </ModalBody>
    </Modal>
  );
};
