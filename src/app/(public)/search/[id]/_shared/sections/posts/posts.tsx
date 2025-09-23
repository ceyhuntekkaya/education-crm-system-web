"use client";

import React from "react";
import { Modal } from "@/components/ui";
import { PostProvider, usePostContext } from "./context/post-context";
import { PostProps } from "./types/index";

import {
  PostDetail,
  PostEmptyState,
  PostFooter,
  PostGrid,
  PostHeader,
  PostFilterForm,
} from "./sections";

const PostContent: React.FC = () => {
  const { isOpen, close, selectedPostId, postData } = usePostContext();

  return (
    <div className="tutor-details__content">
      <PostFilterForm />
      {/* Ana Container - Diğer tablarla uyumlu */}
      <div className="border border-neutral-30 rounded-12 bg-white p-8 ">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          {/* Başlık ve Açıklama */}
          <h4 className="mb-16">Sosyal Medya 📱</h4>
          <span className="d-block border border-neutral-30 my-20 border-dashed" />

          {/* Filter Form */}

          {/* İçerik Alanı - Consistent padding */}
          <div className="bg-white rounded-8 p-20">
            {/* Header - İstatistikler */}
            <PostHeader />

            {/* Feed Content - Consistent spacing */}
            <div className="social-feed-content mt-24">
              {postData.length > 0 ? (
                <>
                  <PostGrid />
                  <div className="social-feed-actions mt-24">
                    <PostFooter />
                  </div>
                </>
              ) : (
                <div className="mt-16">
                  <PostEmptyState />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Post Detail Modal */}
      <Modal
        isOpen={isOpen}
        onClose={close}
        size="xl"
        className="social-post-modal"
        closeOnBackdropClick={true}
        scrollable={true}
      >
        {selectedPostId && <PostDetail />}
      </Modal>
    </div>
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
