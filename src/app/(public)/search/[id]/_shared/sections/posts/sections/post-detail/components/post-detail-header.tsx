import React from "react";
import Image from "next/image";
import { Modal } from "@/components/ui";
import { usePostContext } from "../../../context";
import { formatDate } from "../../../utils";

const PostDetailHeader: React.FC = () => {
  const { selectedPost, close } = usePostContext();

  if (!selectedPost) return null;
  return (
    <Modal.Header onClose={close} className="border-bottom px-24 py-20">
      <div className="d-flex align-items-center gap-12">
        <div className="avatar avatar-sm">
          <Image
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              selectedPost.author?.fullName || "User"
            )}&background=6366f1&color=fff&size=32&rounded=true`}
            alt={selectedPost.author?.fullName || "User"}
            width={32}
            height={32}
            className="rounded-circle"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-neutral-900 fw-medium fs-14 mb-2">
            {selectedPost.author?.fullName || "Anonim Kullanıcı"}
          </h4>
          <div className="d-flex align-items-center gap-8">
            <span className="text-neutral-500 fs-12">
              {selectedPost.school?.name || "Okul Belirtilmemiş"}
            </span>
            <span className="text-neutral-400">•</span>
            <time className="text-neutral-500 fs-12">
              {formatDate(selectedPost.publishedAt)}
            </time>
          </div>
        </div>
      </div>
    </Modal.Header>
  );
};

export default PostDetailHeader;
