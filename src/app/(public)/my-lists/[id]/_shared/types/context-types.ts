import {
  ParentSchoolListItemResponse,
  ParentSchoolListResponse,
} from "@/types";

export interface MyListContextType {
  // List metadata
  listId: number | null;
  listDetail: ParentSchoolListResponse | undefined;
  
  // All parent lists (cached)
  parentLists: ParentSchoolListResponse[];
  listsLoading: boolean;

  // List items data
  listItems: ParentSchoolListItemResponse[];
  loading: boolean;
  error: string | null;

  // Actions
  refetch: () => void;
}

