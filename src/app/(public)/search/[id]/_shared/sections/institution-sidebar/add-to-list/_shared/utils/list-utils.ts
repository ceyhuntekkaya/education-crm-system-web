import { ParentSchoolListResponse } from "@/types";
import { ListOption } from "../types";
import { DEFAULT_LIST_ICONS } from "../constants";

/**
 * Converts API response to ListOption format
 */
export const transformListToOption = (
  list: ParentSchoolListResponse
): ListOption => {
  return {
    value: list.id?.toString() || "",
    label: list.listName || "",
    icon: list.icon || DEFAULT_LIST_ICONS.default,
    schoolCount: list.schoolCount,
    isDefault: list.isDefault,
    listId: list.id,
  };
};

/**
 * Transforms array of lists to options
 */
export const transformListsToOptions = (
  lists: ParentSchoolListResponse[]
): ListOption[] => {
  return lists.map(transformListToOption);
};

/**
 * Finds a list by ID
 */
export const findListById = (
  lists: ParentSchoolListResponse[],
  id: number
): ParentSchoolListResponse | undefined => {
  return lists.find((list) => list.id === id);
};

/**
 * Gets default list from array
 */
export const getDefaultList = (
  lists: ParentSchoolListResponse[]
): ParentSchoolListResponse | undefined => {
  return lists.find((list) => list.isDefault);
};

/**
 * Sorts lists - default first, then by name
 */
export const sortLists = (
  lists: ParentSchoolListResponse[]
): ParentSchoolListResponse[] => {
  return [...lists].sort((a, b) => {
    // Default lists first
    if (a.isDefault && !b.isDefault) return -1;
    if (!a.isDefault && b.isDefault) return 1;

    // Then alphabetically
    return (a.listName || "").localeCompare(b.listName || "");
  });
};

