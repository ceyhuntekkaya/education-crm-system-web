import { PostDto, PostCreateDto, PostUpdateDto } from "@/types";
import { SelectOption } from "./hook-types";

export interface PostAddEditContextType {
  // Current post data
  post: PostDto | null;
  postDetailLoading: boolean; // Sadece veri çekerken
  postSubmitLoading: boolean; // Form submit edilirken
  postError: string | null;

  // Edit mode state
  isEditing: boolean;
  postId: string | null;

  // Form options
  postTypeOptions: SelectOption[];
  postStatusOptions: SelectOption[];

  // Actions
  fetchPost: (() => void) | undefined;
  postPost: (data: PostCreateDto) => Promise<PostDto | null>;
  putPost: (data: PostUpdateDto) => Promise<PostDto | null>;
}
