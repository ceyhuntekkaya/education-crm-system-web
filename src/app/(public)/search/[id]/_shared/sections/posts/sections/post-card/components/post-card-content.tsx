import React from "react";
import { PostSummaryDto } from "@/types/dto/content";
import { truncateText } from "../../../utils/index";

interface PostCardContentProps {
  post: PostSummaryDto;
}

const PostCardContent: React.FC<PostCardContentProps> = ({ post }) => {
  const { title } = post;

  if (!title) return null;

  return (
    <h5 className="mb-12 fw-semibold text-neutral-800 line-height-1-4 flex-grow-1">
      {truncateText(title, 100)}
    </h5>
  );
};

export default PostCardContent;
