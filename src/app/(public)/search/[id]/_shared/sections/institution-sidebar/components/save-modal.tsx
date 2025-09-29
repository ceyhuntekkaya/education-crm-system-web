import React, { useState } from "react";
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
import { FormValues } from "@/types";
import { useInstitutionSidebarData } from "../hooks/useInstitutionSidebarData";
import { SAVE_OPTIONS } from "../types";
import { useFormHook } from "@/hooks";

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Kaydetme seçenekleri - yeni liste oluştur seçeneği ayrı gösterilecek
const SAVE_OPTIONS_ENHANCED = SAVE_OPTIONS;

// Form içeriği component'i
const SaveModalContent: React.FC<{ school: any; onClose: () => void }> = ({
  school,
  onClose,
}) => {
  const { setValue } = useFormHook();
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("favorites");
  const [showAllOptions, setShowAllOptions] = useState(false);

  React.useEffect(() => {
    setShowNewListForm(selectedOption === "new-list");

    // Yeni liste seçildiğinde modal'ın en altına scroll yap
    if (selectedOption === "new-list") {
      setTimeout(() => {
        // Modal body'yi bul ve scroll yap
        const modalBody = document.querySelector(".modal-body");
        if (modalBody) {
          modalBody.scrollTo({
            top: modalBody.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 300); // Form açılma animasyonu için daha uzun delay
    }
  }, [selectedOption]);

  const handleOptionSelect = (optionValue: string) => {
    setSelectedOption(optionValue);
    setValue("saveOption", optionValue);

    // Yeni liste seçildiğinde her tıklamada scroll yap
    if (optionValue === "new-list") {
      setTimeout(() => {
        // Modal body'yi bul ve scroll yap
        const modalBody = document.querySelector(".modal-body");
        if (modalBody) {
          modalBody.scrollTo({
            top: modalBody.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 300); // Form açılma animasyonu için delay
    }
  };

  const handleFormSubmit = (formValues: FormValues) => {
    let finalSaveOption = selectedOption;
    let customListName = "";

    // Eğer yeni liste oluştur seçildiyse
    if (selectedOption === "new-list") {
      if (
        !formValues.newListName ||
        !(formValues.newListName as string).trim()
      ) {
        alert("Lütfen yeni liste adını giriniz.");
        return;
      }
      finalSaveOption = "custom";
      customListName = (formValues.newListName as string).trim();
    }

    const saveData = {
      saveOption: finalSaveOption,
      customListName,
    };

    // Kaydet işlemi burada yapılacak
    console.log("Okul kaydedildi:", {
      schoolName: school.name,
      schoolId: school.id,
      ...saveData,
    });

    onClose();
  };

  return (
    <div>
      {/* Okul Hero Kartı */}
      <div className="text-center mb-24">
        <div className="bg-main-25 border border-main-200 rounded-12 p-20">
          <h5 className="text-main-700 fw-semibold mb-6">{school.name}</h5>
          <div className="d-flex align-items-center justify-content-center gap-4 mb-12">
            <i className="ph ph-map-pin text-main-500 text-xs" />
            <span className="text-main-600 text-sm">İstanbul, Türkiye</span>
          </div>
          <div className="bg-main-600 rounded-8 px-12 py-4 d-inline-flex align-items-center gap-6">
            <i className="ph-bold ph-bookmark-simple text-white text-xs" />
            <span className="text-white text-sm fw-medium">Listeye Kaydet</span>
          </div>
        </div>
        <p className="text-neutral-600 text-sm mt-16 mb-0">
          Bu okulu hangi listeye kaydetmek istiyorsunuz?
        </p>
      </div>

      <Form onSubmit={handleFormSubmit}>
        {/* Ana Kaydetme Seçenekleri */}
        <div className="mb-24">
          {/* Scroll yapılabilir liste container */}
          <div
            className={`overflow-auto save-options-scroll ${
              showAllOptions ? "max-h-280" : "max-h-200"
            }`}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#cbd5e1 #f8fafc",
              transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="d-flex flex-column gap-8 pe-2">
              {(showAllOptions
                ? SAVE_OPTIONS_ENHANCED
                : SAVE_OPTIONS_ENHANCED.slice(0, 4)
              ).map((option) => (
                <div key={option.value}>
                  <div
                    className={`border rounded-8 p-16 cursor-pointer transition-2 ${
                      selectedOption === option.value
                        ? "border-main-400 bg-main-25"
                        : "border-neutral-200 hover-border-main-300"
                    }`}
                    onClick={() => handleOptionSelect(option.value)}
                  >
                    <div className="d-flex align-items-center gap-12">
                      {/* Liste İkonu */}
                      <div>
                        <Icon
                          icon={
                            selectedOption === option.value
                              ? "ph-check"
                              : option.icon || "ph-list-bullets"
                          }
                          size="md"
                          variant={
                            selectedOption !== option.value
                              ? "inline"
                              : "outline"
                          }
                          // className={
                          //   selectedOption === option.value
                          //     ? "text-main-600"
                          //     : "text-neutral-600"
                          // }
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-grow-1">
                        <h6 className="text-neutral-700 fw-medium mb-0">
                          {option.label}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daha Fazla Göster/Daha Az Göster Butonu */}
          {SAVE_OPTIONS_ENHANCED.length > 4 && (
            <div className="mt-12">
              <button
                type="button"
                onClick={() => setShowAllOptions(!showAllOptions)}
                className="w-100 btn btn-sm btn-outline-main d-flex align-items-center justify-content-center gap-8 transition-3 hover-bg-main-25 hover-border-main-400"
                style={{
                  borderColor: showAllOptions ? "#0ea5e9" : undefined,
                  backgroundColor: showAllOptions ? "#f0f9ff" : undefined,
                }}
              >
                <i
                  className={`ph ph-caret-down text-sm transition-3`}
                  style={{
                    transform: showAllOptions
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
                <span className="fw-medium transition-2">
                  {showAllOptions
                    ? "Daha Az Göster"
                    : `Tüm Listeleri Göster (${
                        SAVE_OPTIONS_ENHANCED.length - 4
                      } tane daha)`}
                </span>
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 bg-main-100 rounded opacity-0 transition-2"
                  style={{
                    opacity: showAllOptions ? 0.1 : 0,
                    pointerEvents: "none",
                  }}
                />
              </button>
            </div>
          )}
        </div>

        {/* Ayırıcı Çizgi */}
        <div className="d-flex align-items-center gap-16 mb-24">
          <hr className="flex-grow-1 border-neutral-200 my-0" />
          <span className="text-neutral-400 text-xs fw-medium px-8">
            VEYA YENİ LİSTE
          </span>
          <hr className="flex-grow-1 border-neutral-200 my-0" />
        </div>

        {/* Yeni Liste Oluştur - Özel Tasarım */}
        <div className="mb-32">
          <div
            className={`card border-2 border-dashed transition-3 cursor-pointer ${
              selectedOption === "new-list"
                ? "border-main-400 bg-main-25 shadow-sm"
                : "border-neutral-200 hover-border-main-300"
            }`}
            onClick={() => handleOptionSelect("new-list")}
          >
            <div className="card-body p-20 text-center">
              <div
                className={`w-56 h-56 rounded-12 mx-auto mb-16 d-flex align-items-center justify-content-center transition-3 ${
                  selectedOption === "new-list"
                    ? "bg-main-600"
                    : "bg-neutral-100"
                }`}
                style={{
                  transform:
                    selectedOption === "new-list" ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <i
                  className={`ph-bold ph-plus-circle text-2xl transition-3 ${
                    selectedOption === "new-list"
                      ? "text-white"
                      : "text-neutral-500"
                  }`}
                  style={{
                    transform:
                      selectedOption === "new-list"
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.4s ease-in-out",
                  }}
                />
              </div>
              <h6 className="text-neutral-700 fw-semibold mb-8">
                Yeni Liste Oluştur
              </h6>
              <p className="text-neutral-500 text-sm mb-0">
                Özel bir liste oluşturup okulu oraya kaydedin
              </p>
            </div>
          </div>

          {/* Yeni Liste Form Alanı - Smooth Expand */}
          <div
            className="transition-3 overflow-hidden"
            style={{
              maxHeight: showNewListForm ? "200px" : "0px",
              opacity: showNewListForm ? 1 : 0,
              marginTop: showNewListForm ? "16px" : "0px",
              paddingTop: showNewListForm ? "0px" : "0px",
              paddingBottom: showNewListForm ? "0px" : "0px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="card bg-main-25 border border-main-200">
              <div className="card-body p-20">
                <div className="d-flex align-items-center gap-12 mb-16">
                  <div className="w-32 h-32 bg-main-600 rounded-8 d-flex align-items-center justify-content-center">
                    <i className="ph-bold ph-textbox text-white text-sm" />
                  </div>
                  <h6 className="text-main-700 fw-semibold mb-0">
                    Liste Adı Belirleyin
                  </h6>
                </div>

                <FormInput
                  name="newListName"
                  placeholder="Örn: Tercih Listem, İncelenecekler, Favorilerim..."
                />

                <div className="d-flex align-items-start gap-8 mt-12">
                  <i className="ph ph-lightbulb text-main-500 text-sm mt-2" />
                  <span className="text-main-600 text-xs lh-sm">
                    İpucu: Anlamlı bir liste adı seçin, daha sonra kolayca
                    bulabilirsiniz
                  </span>
                </div>
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
            className="btn-outline-main flex-grow-1"
          >
            <i className="ph ph-x me-8" />
            İptal
          </Button>
          <Button
            variant="inline"
            type="submit"
            className="btn-main flex-grow-1"
          >
            <i className="ph-bold ph-bookmark-simple me-8" />
            Kaydet
          </Button>
        </div>
      </Form>
    </div>
  );
};

export const SaveModal: React.FC<SaveModalProps> = ({ isOpen, onClose }) => {
  const { school } = useInstitutionSidebarData();

  const initialValues: FormValues = {
    saveOption: "favorites",
    newListName: "",
    note: "",
  };

  // Scrollbar stilleri için CSS
  const scrollbarStyles = `
    .save-options-scroll::-webkit-scrollbar {
      width: 6px;
    }
    .save-options-scroll::-webkit-scrollbar-track {
      background: #f8fafc;
      border-radius: 3px;
    }
    .save-options-scroll::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }
    .save-options-scroll::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `;

  return (
    <>
      <style>{scrollbarStyles}</style>
      <Modal isOpen={isOpen} onClose={onClose} size="md" scrollable={true}>
        <ModalHeader title="Okulu Kaydet" onClose={onClose} />
        <ModalBody scrollable={true}>
          <FormProvider initialValues={initialValues}>
            <SaveModalContent school={school} onClose={onClose} />
          </FormProvider>
        </ModalBody>
      </Modal>
    </>
  );
};
