"use client";

import React from "react";
import { Modal } from "@/components/ui";
import { PostProvider, usePostContext } from "./context/post-context";
import { PostFilterForm } from "./sections";
import { PostProps } from "./types/index";
import {
  PostHeader,
  PostGrid,
  PostEmptyState,
  PostFooter,
  PostDetailModalContent,
} from "./components/index";

const PostContent: React.FC = () => {
  const { isOpen, close, selectedPostId, postData } = usePostContext();

  return (
    <>
      <div className="posts-section">
        {/* Filter Form Section - Kompakt tasarım */}
        <PostFilterForm />

        {/* Main Posts Container with consistent styling */}
        <div className="border border-neutral-30 rounded-12 bg-white p-8">
          <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
            <PostHeader />

            {postData.length > 0 ? (
              <>
                <PostGrid />
                <PostFooter />
              </>
            ) : (
              <PostEmptyState />
            )}
          </div>
        </div>

        {/* Post Detail Modal */}
        <Modal isOpen={isOpen} onClose={close} size="xl">
          {selectedPostId && <PostDetailModalContent />}
        </Modal>
      </div>
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
