import React from "react";
import { Button } from "@/components/ui";

interface PostDetailCallToActionProps {
  post: any;
}

const PostDetailCallToAction: React.FC<PostDetailCallToActionProps> = ({
  post,
}) => {
  if (!post.callToAction || !post.ctaUrl) return null;

  return (
    <div className="mb-24">
      <Button
        href={post.ctaUrl}
        variant="inline"
        size="xs"
        rightIcon="ph-arrow-right"
        className="shadow-sm"
      >
        {post.callToAction}
      </Button>
    </div>
  );
};

export default PostDetailCallToAction;
