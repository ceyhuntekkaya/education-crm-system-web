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
import { useSearchParams } from "next/navigation";

interface SaveFavoriteSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Form içeriği component'i
const SaveFavoriteSearchModalContent: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const { setValue } = useFormHook();
  const searchParams = useSearchParams();

  const handleFormSubmit = (formValues: FormValues) => {
    if (
      !formValues.favoriteSearchName ||
      !(formValues.favoriteSearchName as string).trim()
    ) {
      alert("Lütfen favori arama adını giriniz.");
      return;
    }

    const favoriteSearchName = (formValues.favoriteSearchName as string).trim();

    // Mevcut arama parametrelerini al
    const currentParams = Array.from(searchParams.entries())
      .filter(([key]) => key !== "favId") // favId parametresini hariç tut
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    const saveData = {
      name: favoriteSearchName,
      searchParams: currentParams,
      createdAt: new Date().toISOString(),
    };

    // Favori arama kaydet işlemi burada yapılacak
    console.log("Favori arama kaydedildi:", saveData);

    // Başarı mesajı göster
    alert(`"${favoriteSearchName}" adlı favori arama başarıyla kaydedildi!`);

    onClose();
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
                placeholder="Örn: Lise Araması, İstanbul Okulları, Bütçe Dostu Okullar..."
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
            type="submit"
            leftIcon="ph-bold ph-heart"
            className="flex-grow-1"
          >
            Kaydet
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
