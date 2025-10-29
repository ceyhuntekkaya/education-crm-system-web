"use client";

import React from "react";
import { Modal, CustomCard } from "@/components/ui";
import { PostProvider, usePostContext } from "./context/post-context";
import { PostProps } from "./types/index";

import { PostDetail, PostEmptyState, PostGrid, PostHeader } from "./sections";

const PostContent: React.FC = () => {
  const { isOpen, close, selectedPostId, postData, selectedPost } =
    usePostContext();

  return (
    <>
      {/* Main Posts Container with CustomCard */}
      <CustomCard
        title="Sosyal Medya 📱"
        subtitle={
          <div className="d-flex align-items-center gap-8 text-neutral-600">
            <i className="ph ph-share-network text-main-600"></i>
            <span className="text-sm fw-medium">{postData.length} Gönderi</span>
          </div>
        }
        className="mt-24"
      >
        {/* Header - İstatistikler */}
        <PostHeader />

        {/* Feed Content */}
        <div className="social-feed-content mt-24">
          {postData.length > 0 ? (
            <PostGrid />
          ) : (
            <div className="mt-16">
              <PostEmptyState />
            </div>
          )}
        </div>
      </CustomCard>

      {/* Modern Post Detail Modal */}
      <Modal
        isOpen={isOpen}
        onClose={close}
        size="xl"
        className="social-post-modal"
        closeOnBackdropClick={true}
        scrollable={true}
      >
        {selectedPostId && selectedPost && (
          <PostDetail post={selectedPost} onClose={close} />
        )}
      </Modal>
    </>
  );
};

const Posts: React.FC<PostProps> = () => {
  return (
    <PostProvider>
      <PostContent />
    </PostProvider>
  );
};

export default Posts;
