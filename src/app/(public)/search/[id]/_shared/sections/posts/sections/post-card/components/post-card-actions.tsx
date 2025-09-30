import React from "react";

interface PostCardActionsProps {
  onCardClick?: () => void;
}

const PostCardActions: React.FC<PostCardActionsProps> = ({ onCardClick }) => {
  return (
    <div className="d-flex align-items-center gap-8">
      <button
        className="btn btn-ghost btn-sm px-8 py-4"
        aria-label="Beğen"
        onClick={(e) => e.stopPropagation()}
      >
        <i className="ph ph-heart"></i>
      </button>

      <button
        className="btn btn-ghost btn-sm px-8 py-4"
        aria-label="Yorum yap"
        onClick={onCardClick}
      >
        <i className="ph ph-chat-circle"></i>
      </button>

      <button
        className="btn btn-ghost btn-sm px-8 py-4"
        aria-label="Paylaş"
        onClick={(e) => e.stopPropagation()}
      >
        <i className="ph ph-paper-plane-tilt"></i>
      </button>
    </div>
  );
};

export default PostCardActions;
