"use client";

import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { MyListContextType } from "../types";
import { useGetListItems, useParentLists } from "../hooks";

// Create Context
const MyListContext = createContext<MyListContextType | undefined>(undefined);

interface MyListProviderProps {
  children: ReactNode;
  listId: number;
}

/**
 * My List Provider Component
 * Manages all list data (parent lists + list items)
 * Uses global cache for parent lists
 */
export const MyListProvider: React.FC<MyListProviderProps> = ({
  children,
  listId,
}) => {
  // Fetch all parent lists (cached globally)
  const { parentLists, loading: listsLoading } = useParentLists();

  // Find current list detail from parent lists
  const listDetail = useMemo(() => {
    return parentLists.find((list) => list.id === listId);
  }, [parentLists, listId]);

  // Fetch list items (schools in the list)
  const {
    listItems,
    loading: itemsLoading,
    error,
    refetch,
  } = useGetListItems(listId);

  const contextValue: MyListContextType = useMemo(
    () => ({
      listId,
      listDetail,
      parentLists,
      listsLoading,
      listItems,
      loading: itemsLoading,
      error,
      refetch,
    }),
    [
      listId,
      listDetail,
      parentLists,
      listsLoading,
      listItems,
      itemsLoading,
      error,
      refetch,
    ]
  );

  return (
    <MyListContext.Provider value={contextValue}>
      {children}
    </MyListContext.Provider>
  );
};

/**
 * Custom Hook to use My List Context
 */
export const useMyList = (): MyListContextType => {
  const context = useContext(MyListContext);
  if (context === undefined) {
    throw new Error("useMyList must be used within a MyListProvider");
  }
  return context;
};

export default MyListContext;
