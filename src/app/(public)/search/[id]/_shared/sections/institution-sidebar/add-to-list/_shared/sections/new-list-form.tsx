import React, { useState } from "react";
import { FormInput } from "@/components/forms";
import { Button } from "@/components/ui";
import { useFormHook } from "@/hooks";
import { useAddToList } from "../context";

interface NewListFormProps {
  isVisible: boolean;
}

export const NewListForm: React.FC<NewListFormProps> = ({ isVisible }) => {
  const { values, setValue } = useFormHook();
  const { createList, listsLoading, handleOptionSelect } = useAddToList();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateList = async () => {
    const listName = (values.newListName as string)?.trim();
    if (!listName) return;

    setIsCreating(true);
    const response = await createList({
      listName,
      isDefault: false,
    });
    setIsCreating(false);

    if (response?.data?.id) {
      // Liste oluşturuldu, input'u temizle ve yeni listeyi otomatik seç
      setValue("newListName", "");
      handleOptionSelect(response.data.id.toString());
    }
  };

  return (
    <div
      className="transition-3 overflow-hidden"
      style={{
        maxHeight: isVisible ? "300px" : "0px",
        opacity: isVisible ? 1 : 0,
        marginTop: isVisible ? "16px" : "0px",
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

          <div className="row g-12">
            <div className="col-10">
              <FormInput
                name="newListName"
                placeholder="Örn: Tercih Listem, İncelenecekler, Favorilerim..."
              />
            </div>
            <div className="col-2">
              <Button
                type="button"
                variant="inline"
                className="btn-main w-100 h-100 d-flex align-items-center justify-content-center p-0"
                onClick={handleCreateList}
                disabled={isCreating || listsLoading}
              >
                <i
                  className={`ph-bold ${
                    isCreating ? "ph-spinner ph-spin" : "ph-plus"
                  } text-xl`}
                />
              </Button>
            </div>
          </div>

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
  );
};
