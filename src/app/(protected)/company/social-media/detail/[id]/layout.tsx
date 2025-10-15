"use client";

import React from "react";
import { useParams } from "next/navigation";
import { PostDetailProvider } from "./_shared";
import { validatePostId } from "./_shared/utils/post-detail.utils";

interface PostDetailLayoutProps {
  children: React.ReactNode;
}

const PostDetailLayout: React.FC<PostDetailLayoutProps> = ({ children }) => {
  const params = useParams();
  const id = params?.id as string;

  // ID'yi valide et
  const postId = validatePostId(id);

  if (!postId) {
    return (
      <div className="text-center py-8">
        <i className="ph ph-warning-circle text-danger fs-2 mb-3"></i>
        <p className="text-danger mb-0">Geçersiz post ID&apos;si: {id}</p>
      </div>
    );
  }

  return <PostDetailProvider postId={postId}>{children}</PostDetailProvider>;
};

export default PostDetailLayout;
