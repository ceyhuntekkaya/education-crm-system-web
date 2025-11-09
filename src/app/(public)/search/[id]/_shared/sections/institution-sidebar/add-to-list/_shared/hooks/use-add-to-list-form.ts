"use client";

import { useState, useEffect } from "react";
import { useFormHook } from "@/hooks";
import {
  FormValues,
  CreateParentSchoolListRequest,
  AddSchoolToListRequest,
  ApiResponseDto,
  ParentSchoolListResponse,
  ParentSchoolListItemResponse,
} from "@/types";
import { ListOption } from "../types";

interface UseAddToListFormProps {
  listOptions: ListOption[];
  schoolId: number | null;
  createList: (
    data: CreateParentSchoolListRequest
  ) => Promise<ApiResponseDto<ParentSchoolListResponse> | null>;
  addSchoolToList: (
    data: AddSchoolToListRequest
  ) => Promise<ApiResponseDto<ParentSchoolListItemResponse> | null>;
  onSuccess: () => void;
}

interface UseAddToListFormReturn {
  selectedListId: string;
  showAllOptions: boolean;
  setShowAllOptions: (show: boolean) => void;
  handleOptionSelect: (optionValue: string) => void;
  handleFormSubmit: (formValues: FormValues) => Promise<void>;
}

/**
 * Hook to manage add to list form logic
 */
export const useAddToListForm = ({
  listOptions,
  schoolId,
  createList,
  addSchoolToList,
  onSuccess,
}: UseAddToListFormProps): UseAddToListFormReturn => {
  const { values, setValue } = useFormHook();
  const [showAllOptions, setShowAllOptions] = useState(false);

  // Set default selection when lists are loaded
  useEffect(() => {
    if (listOptions.length > 0 && !values.selectedListId) {
      const defaultList = listOptions.find((opt) => opt.isDefault);
      const initialValue = defaultList?.value || listOptions[0].value;
      setValue("selectedListId", initialValue);
    }
  }, [listOptions, values.selectedListId, setValue]);

  const handleOptionSelect = (optionValue: string) => {
    setValue("selectedListId", optionValue);
  };

  const handleFormSubmit = async (formValues: FormValues) => {
    const selectedListId = formValues.selectedListId as string;
    if (!schoolId || !selectedListId) return;

    const listId = parseInt(selectedListId);
    if (!listId) return;

    // Add school to selected list
    const response = await addSchoolToList({
      schoolId,
      parentSchoolListId: listId,
      isFavorite: false,
      addedFromSearch: window.location.pathname,
    });

    if (response?.data) {
      onSuccess();
    }
  };

  return {
    selectedListId: (values.selectedListId as string) || "",
    showAllOptions,
    setShowAllOptions,
    handleOptionSelect,
    handleFormSubmit,
  };
};

