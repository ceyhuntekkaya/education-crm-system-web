import React from "react";
import {
  ParentSchoolListResponse,
  ParentSchoolListItemResponse,
  CreateParentSchoolListRequest,
  AddSchoolToListRequest,
  FormValues,
} from "@/types";
import { ListOption } from "./list-option-types";

export interface AddToListContextType {
  // Parent lists data
  parentLists: ParentSchoolListResponse[];
  listOptions: ListOption[];
  listsLoading: boolean;
  listsError: string | null;

  // Actions
  fetchLists: () => void;
  createList: (
    data: CreateParentSchoolListRequest,
    mutationOptions?: any,
  ) => Promise<ParentSchoolListResponse | null>;
  addSchoolToList: (
    data: AddSchoolToListRequest,
    mutationOptions?: any,
  ) => Promise<ParentSchoolListItemResponse | null>;

  // Current school
  schoolId: number | null;
  schoolName: string | null;

  // Form state and handlers
  selectedListId: string;
  showAllOptions: boolean;
  setShowAllOptions: (show: boolean) => void;
  handleOptionSelect: (optionValue: string) => void;
  handleFormSubmit: (formValues: FormValues) => Promise<void>;

  // Refs
  listSectionRef: React.RefObject<HTMLDivElement>;
}
