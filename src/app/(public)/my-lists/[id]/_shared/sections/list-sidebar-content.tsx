"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Form, FormRadio } from "@/components";
import { FormProvider, useForm } from "@/contexts";
import { useMyList } from "../contexts";
import * as yup from "yup";

interface ListSidebarContentProps {
  listId: string;
}

/**
 * ListSidebar Content Component
 * Displays list of parent lists for navigation
 * Gets data from MyListContext
 */
export const ListSidebarContent: React.FC<ListSidebarContentProps> = ({
  listId,
}) => {
  const router = useRouter();
  const { parentLists, listsLoading } = useMyList();

  const initialValues = useMemo(
    () => ({
      selectedList: listId || "",
    }),
    [listId]
  );

  const validationSchema = useMemo(
    () =>
      yup.object({
        selectedList: yup.string().required("Liste seçimi zorunludur"),
      }),
    []
  );

  if (listsLoading) {
    return (
      <div className="search-sidebar-filter sidebar rounded-12 bg-white p-32 box-shadow-md">
        <p className="text-center">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <ListSidebarContentInner listId={listId} parentLists={parentLists} />
    </FormProvider>
  );
};

/**
 * Inner component that uses FormProvider
 */
const ListSidebarContentInner: React.FC<{
  listId: string;
  parentLists: any[];
}> = ({ listId, parentLists }) => {
  const router = useRouter();
  const { getValue } = useForm();

  // Navigate to selected list when form value changes
  useEffect(() => {
    const selectedValue = getValue("selectedList");
    if (selectedValue && selectedValue !== listId) {
      router.push(`/my-lists/${selectedValue}`);
    }
  }, [listId, router, getValue]);

  // Transform API lists to FormRadio options
  const listOptions = useMemo(() => {
    return parentLists.map((list) => ({
      value: list.id?.toString() || "",
      label: list.listName || "İsimsiz Liste",
    }));
  }, [parentLists]);

  return (
    <div
      className="search-sidebar-filter sidebar rounded-12 bg-white p-32 box-shadow-md"
      data-aos="fade-up"
    >
      <Form onSubmit={() => {}} className="d-flex flex-column h-100">
        <div className="flex-between">
          <div className="flex-grow-1">
            <div className="flex-between">
              <h4 className="mb-0">Listelerim</h4>
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
            {listOptions.length > 0 ? (
              <FormRadio
                name="selectedList"
                label=""
                value=""
                options={listOptions}
                multi={true}
                direction="vertical"
              />
            ) : (
              <p className="text-center text-neutral-500">Liste bulunamadı</p>
            )}
          </div>
        </div>

        {/* Alt kısım */}
        <div className="mt-auto pt-24">
          <span className="d-block border border-neutral-30 border-dashed mb-24" />
          <div className="text-center">
            <p className="text-sm text-neutral-500 mb-0">
              Toplam {parentLists.length} liste
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};
