import React from "react";
import { CustomImage } from "@/components/ui";
import { getFileServeUrl } from "@/lib/api/constants";
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

  // URL helper
  const getFullUrl = (url: string | undefined): string => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return getFileServeUrl(url);
  };

  // Date formatter
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-12">
          <div className="avatar">
            {post.featuredImageUrl ? (
              <CustomImage
                src={getFullUrl(post.featuredImageUrl)}
                alt={post.title || "Post"}
                width={48}
                height={48}
                variant="rounded"
              />
            ) : (
              <div
                className="bg-neutral-100 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48 }}
              >
                <i className="ph ph-image text-neutral-400 fs-24"></i>
              </div>
            )}
          </div>
          <div>
            <h4 className="text-neutral-900 fw-semibold mb-2">
              {post.title || "Başlıksız Gönderi"}
            </h4>
            <p className="text-neutral-600 mb-0 fs-14">
              {post.author?.fullName || "Anonim Kullanıcı"} •{" "}
              {formatDate(post.publishedAt)}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="btn btn-icon btn-sm text-neutral-400 hover:text-neutral-600"
            type="button"
            aria-label="Kapat"
          >
            <i className="ph ph-x fs-20"></i>
          </button>
        )}
      </div>
      <span className="d-block border border-neutral-30 my-24 border-dashed" />
    </div>
  );
};

export default PostDetailHeader;
