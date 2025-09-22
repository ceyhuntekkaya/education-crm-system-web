import { PostSearchDto } from "@/types/dto/content";

export const postFilterInitialValues: PostSearchDto = {
  query: "",
  postType: undefined,
  status: "PUBLISHED",
  authorName: "",
  schoolName: "",
  isFeatured: undefined,
  isPinned: undefined,
  publishedAfter: "",
  publishedBefore: "",
  tags: [],
  hashtags: [],
  sortBy: "publishedAt",
  sortOrder: "desc",
  page: 1,
  size: 12,
};
