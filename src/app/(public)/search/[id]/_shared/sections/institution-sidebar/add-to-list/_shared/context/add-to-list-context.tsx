"use client";

import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { AddToListContextType } from "../types";
import {
  useGetParentLists,
  useCreateList,
  useAddSchoolToList,
  useAddToListForm,
} from "../hooks";
import { useInstitutionSidebarData } from "../../../hooks/useInstitutionSidebarData";
import { transformListsToOptions, sortLists } from "../utils";

const AddToListContext = createContext<AddToListContextType | undefined>(
  undefined
);

interface AddToListProviderProps {
  children: ReactNode;
  onSuccess?: () => void;
}

export const AddToListProvider: React.FC<AddToListProviderProps> = ({
  children,
  onSuccess,
}) => {
  // Get school data from parent context
  const { school } = useInstitutionSidebarData();

  // Fetch parent lists
  const {
    parentLists,
    loading: listsLoading,
    error: listsError,
    refetch: fetchLists,
  } = useGetParentLists();

  // Create list hook
  const { createList: createListMutation, loading: createLoading } =
    useCreateList({
      onSuccess: () => {
        // Refetch lists after creating a new one
        fetchLists();
      },
    });

  // Add school to list hook
  const { addSchoolToList: addSchoolMutation, loading: addLoading } =
    useAddSchoolToList();

  // Sort and transform lists
  const listOptions = useMemo(() => {
    const sortedLists = sortLists(parentLists);
    return transformListsToOptions(sortedLists);
  }, [parentLists]);

  // Form logic
  const formHandlers = useAddToListForm({
    listOptions,
    schoolId: school?.id || null,
    createList: createListMutation,
    addSchoolToList: addSchoolMutation,
    onSuccess: onSuccess || (() => {}),
  });

  const contextValue: AddToListContextType = {
    // Parent lists data
    parentLists,
    listOptions,
    listsLoading: listsLoading || createLoading || addLoading,
    listsError,

    // Actions
    fetchLists,
    createList: createListMutation,
    addSchoolToList: addSchoolMutation,

    // Current school
    schoolId: school?.id || null,
    schoolName: school?.name || null,

    // Form state and handlers
    ...formHandlers,
  };

  return (
    <AddToListContext.Provider value={contextValue}>
      {children}
    </AddToListContext.Provider>
  );
};

export const useAddToList = (): AddToListContextType => {
  const context = useContext(AddToListContext);
  if (context === undefined) {
    throw new Error("useAddToList must be used within a AddToListProvider");
  }
  return context;
};
