import {
  ParentSchoolListResponse,
  SchoolSearchResultDto,
} from "@/types";

export interface MyListContextType {
  // List metadata
  listId: number | null;
  listDetail: ParentSchoolListResponse | undefined;
  
  // All parent lists (cached)
  parentLists: ParentSchoolListResponse[];
  listsLoading: boolean;

  // List items data (now directly school data)
  listItems: SchoolSearchResultDto[];
  loading: boolean;
  error: string | null;

  // Actions
  refetch: () => void;
}

