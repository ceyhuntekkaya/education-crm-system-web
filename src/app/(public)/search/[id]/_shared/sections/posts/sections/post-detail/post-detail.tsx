import React from "react";
import { Modal } from "@/components/ui";
import { usePostContext } from "../../context";
import { postMockData } from "../../mock";
import {
  PostDetailHeader,
  PostDetailMediaColumn,
  PostDetailContentColumn,
  PostDetailNotFound,
} from "./components";

const PostDetail: React.FC = () => {
  const { selectedPostId, close } = usePostContext();
  const post = postMockData.find((p) => p.id === selectedPostId);

  if (!post) {
    return <PostDetailNotFound onClose={close} />;
  }

  return (
    <>
      <PostDetailHeader post={post} onClose={close} />

      <Modal.Body className="p-0">
        <div className="row g-0 post-detail-layout">
          <div className="col-6">
            <PostDetailMediaColumn post={post} />
          </div>

          <div className="col-6">
            <PostDetailContentColumn post={post} />
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default PostDetail;
