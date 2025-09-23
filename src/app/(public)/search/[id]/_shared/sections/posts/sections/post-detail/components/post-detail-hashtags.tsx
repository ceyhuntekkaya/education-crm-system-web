import React from "react";

interface PostDetailHashtagsProps {
  post: any;
}

const PostDetailHashtags: React.FC<PostDetailHashtagsProps> = ({ post }) => {
  if (!post.hashtags) return null;

  return (
    <div className="mb-24">
      <div className="d-flex flex-wrap gap-8">
        {post.hashtags.split(" ").map((hashtag: string, index: number) => (
          <span
            key={index}
            className="badge bg-main-50 text-main-700 px-12 py-6 rounded-pill fs-13 fw-medium hover-bg-main-100 cursor-pointer transition-all"
          >
            {hashtag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostDetailHashtags;
