import React from "react";
import { Modal } from "@/components/ui";
import { usePostContext } from "../../context";
import {
  PostDetailHeader,
  PostDetailMediaColumn,
  PostDetailContentColumn,
  PostDetailNotFound,
} from "./components";

const PostDetail: React.FC = () => {
  const { selectedPost } = usePostContext();

  if (!selectedPost) {
    return <PostDetailNotFound />;
  }

  return (
    <>
      <PostDetailHeader />

      <Modal.Body className="p-0">
        <div className="row g-0 post-detail-layout">
          <div className="col-6">
            <PostDetailMediaColumn />
          </div>

          <div className="col-6">
            <PostDetailContentColumn />
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default PostDetail;
