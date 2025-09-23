import React from "react";
import { truncateText } from "../../../utils/index";

interface PostCardContentProps {
  title?: string;
}

const PostCardContent: React.FC<PostCardContentProps> = ({ title }) => {
  if (!title) return null;

  return (
    <h5 className="mb-12 fw-semibold text-neutral-800 line-height-1-4 flex-grow-1">
      {truncateText(title, 100)}
    </h5>
  );
};

export default PostCardContent;
