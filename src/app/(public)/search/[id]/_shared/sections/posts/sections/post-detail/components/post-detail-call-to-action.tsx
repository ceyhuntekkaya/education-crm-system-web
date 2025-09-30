import React from "react";
import { Button } from "@/components/ui";
import { usePostContext } from "../../../context/post-context";

const PostDetailCallToAction: React.FC = () => {
  const { selectedPost } = usePostContext();

  if (!selectedPost?.callToAction || !selectedPost?.ctaUrl) return null;

  return (
    <div className="mb-24">
      <Button
        href={selectedPost.ctaUrl}
        variant="inline"
        size="xs"
        rightIcon="ph-arrow-right"
        className="shadow-sm"
      >
        {selectedPost.callToAction}
      </Button>
    </div>
  );
};

export default PostDetailCallToAction;
