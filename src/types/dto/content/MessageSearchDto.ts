export interface MessageSearchDto {
  searchTerm?: string;
  schoolId?: number;
  assignedToUserId?: number;
  messageType?: string;
  priority?: string;
  status?: string;
  followUpRequired?: boolean;
  hasAttachments?: boolean;
  createdAfter?: string;
  createdBefore?: string;
  tags?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}
