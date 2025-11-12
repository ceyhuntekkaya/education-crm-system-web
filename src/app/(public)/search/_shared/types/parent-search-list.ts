export interface ParentSearchList {
  id?: number;
  parentId: number;
  name: string;
  data: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateParentSearchListRequest {
  parentId: number;
  name: string;
  data: string;
}

export interface ParentSearchListResponse extends ParentSearchList {}
