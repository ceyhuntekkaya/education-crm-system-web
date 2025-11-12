export interface ParentSearchList {
  id?: number;
  parentId: number;
  name: string;
  data: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: any;
  updatedBy?: any;
  isActive?: boolean;
}

export interface CreateParentSearchListRequest {
  parentId: number;
  name: string;
  data: string;
}

export interface ParentSearchListResponse extends ParentSearchList {}

// Backend array döndürüyor, wrapper object değil
export interface ParentSearchListsResponse {
  data: ParentSearchList[];
}
