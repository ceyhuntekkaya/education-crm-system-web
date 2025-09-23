import React, { useState } from "react";
import { stripHtmlTags, highlightHashtags } from "../../../utils";

interface PostDetailContentProps {
  post: any;
}

const PostDetailContent: React.FC<PostDetailContentProps> = ({ post }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  if (!post.content) return null;

  return (
    <div className="mb-24 content-section">
      <div className="content-header mb-16">
        <h6 className="text-neutral-800 fs-14 fw-semibold mb-0 d-flex align-items-center gap-10">
          <div className="content-icon">
            <i className="ph ph-article fs-14" />
          </div>
          İçerik
        </h6>
      </div>

      <div className="content-card">
        <div
          className="post-content"
          dangerouslySetInnerHTML={{
            __html: showFullContent
              ? highlightHashtags(post.content)
              : highlightHashtags(
                  stripHtmlTags(post.content).substring(0, 250) +
                    (stripHtmlTags(post.content).length > 250 ? "..." : "")
                ),
          }}
          data-aos={showFullContent ? "fade-in" : ""}
          data-aos-duration="500"
        />

        {stripHtmlTags(post.content).length > 250 && (
          <div className="position-relative">
            {/* Gradient Fade Effect */}
            {!showFullContent && <div className="content-fade" />}

            <div className="text-center mt-16">
              <span
                className="text-main-600 fw-medium fs-14 cursor-pointer hover-text-main-700 transition-all d-inline-flex align-items-center gap-6"
                onClick={() => setShowFullContent(!showFullContent)}
                data-aos="fade-up"
                data-aos-duration="300"
              >
                {showFullContent ? "Daha Az Göster" : "Devamını Oku"}
                <i
                  className={`ph ${
                    showFullContent ? "ph-caret-up" : "ph-caret-down"
                  } transition-all`}
                />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailContent;
