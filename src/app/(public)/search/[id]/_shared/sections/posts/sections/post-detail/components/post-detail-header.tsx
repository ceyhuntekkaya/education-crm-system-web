import React from "react";
import { CustomImage } from "@/components/ui";
import { formatDate } from "../../../utils";
import { PostDto } from "@/types/dto/content";

interface PostDetailHeaderProps {
  post: PostDto;
  onClose?: () => void;
}

const PostDetailHeader: React.FC<PostDetailHeaderProps> = ({
  post,
  onClose,
}) => {
  if (!post) return null;

  return (
    <div className="d-flex align-items-center justify-content-between  border-bottom border-neutral-200 px-24 py-20">
      <div className="d-flex align-items-center gap-12">
        <div className="avatar avatar-sm">
          <CustomImage
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              post.author?.fullName || "User"
            )}&background=6366f1&color=fff&size=32&rounded=true`}
            alt={post.author?.fullName || "User"}
            width={32}
            height={32}
            className="rounded-circle"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-neutral-900 fw-medium fs-14 mb-2">
            {post.author?.fullName || "Anonim Kullanıcı"}
          </h4>
          <div className="d-flex align-items-center gap-8">
            <span className="text-neutral-500 fs-12">
              {post.school?.name || "Okul Belirtilmemiş"}
            </span>
            <span className="text-neutral-400">•</span>
            <time className="text-neutral-500 fs-12">
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="btn btn-icon btn-sm text-neutral-400 hover:text-neutral-600"
          type="button"
          aria-label="Kapat"
        >
          <i className="ph ph-x fs-18"></i>
        </button>
      )}
    </div>
  );
};

export default PostDetailHeader;
