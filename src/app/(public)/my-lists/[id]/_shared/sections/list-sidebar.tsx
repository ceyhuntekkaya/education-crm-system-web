"use client";

import React, { useEffect } from "react";
import { Form, FormRadio } from "@/components";
import { FormProvider, useForm } from "@/contexts";
import { FormValues } from "@/types";
import { initialValues, validationSchema } from "../schemas";
import { listOptions, ListType } from "../mock";
import { getListByValue, getListById } from "../utils";
import { useRouter } from "next/navigation";

// ListSidebar Props Interface
interface ListSidebarProps {
  listId?: string;
}

// ListSidebar Content Component
const ListSidebarContent: React.FC<ListSidebarProps> = ({ listId }) => {
  const router = useRouter();
  const { getValue } = useForm();

  const handleSubmit = async (values: FormValues) => {
    console.log("Seçilen liste türü:", values);
    console.log("Liste ID:", listId);
    // Burada API çağrısı yapılabilir
  };

  // Form değerlerindeki değişiklikleri dinle
  useEffect(() => {
    const selectedValue = getValue("selectedList");
    if (selectedValue && selectedValue !== initialValues.selectedList) {
      const selectedList = getListByValue(selectedValue as ListType);
      if (selectedList && selectedList.id.toString() !== listId) {
        router.push(`/my-lists/${selectedList.id}`);
      }
    }
  });

  return (
    <div
      className={`search-sidebar-filter sidebar rounded-12 bg-white p-32 box-shadow-md`}
      data-aos="fade-up"
    >
      <Form onSubmit={handleSubmit} className="d-flex flex-column h-100">
        <div className="flex-between">
          <div className="flex-grow-1">
            <div className="flex-between">
              <h4 className="mb-0">Liste Türleri</h4>
              <button
                type="button"
                className="sidebar-close text-xl text-neutral-500 d-lg-none hover-text-main-600"
              >
                <i className="ph-bold ph-x" />
              </button>
            </div>
            <span className="d-block border border-neutral-30 border-dashed my-24" />
          </div>
        </div>

        {/* Liste Seçenekleri */}
        <div className="flex-grow-1">
          <div className="list-options">
            <FormRadio
              name="selectedList"
              label=""
              value=""
              options={listOptions.map(
                (option: (typeof listOptions)[number]) => ({
                  value: option.value,
                  label: option.label,
                })
              )}
              multi={true}
              direction="vertical"
            />
          </div>
        </div>

        {/* Alt kısım - isteğe bağlı */}
        <div className="mt-auto pt-24">
          <span className="d-block border border-neutral-30 border-dashed mb-24" />
          <div className="text-center">
            <p className="text-sm text-neutral-500 mb-0">
              Toplam {listOptions.length} liste türü
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};

// Main ListSidebar Component with FormProvider
const ListSidebar: React.FC<ListSidebarProps> = ({ listId }) => {
  // ListId'ye göre initial value'yu belirle
  const currentList = listId ? getListById(parseInt(listId)) : null;

  const dynamicInitialValues = {
    ...initialValues,
    selectedList: currentList?.value || initialValues.selectedList,
  };

  return (
    <FormProvider
      initialValues={dynamicInitialValues}
      validationSchema={validationSchema}
    >
      <ListSidebarContent listId={listId} />
    </FormProvider>
  );
};

export default ListSidebar;
