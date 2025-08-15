"use client";

import { useGet, usePut } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Post } from "@/types";
import React, { useState } from "react";

const UpdatePostExample = () => {
  const [postId, setPostId] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  // Önce mevcut post'u getir
  const { data: currentPost, loading: fetchLoading } = useGet<Post>(
    API_ENDPOINTS.EXAMPLES.POSTS.BY_ID(postId),
    {
      onSuccess: (post) => {
        const postData = post as Post;
        setTitle(postData.title);
        setBody(postData.body);
      },
    }
  );

  const { mutate: updatePost, loading: updateLoading } = usePut<
    Post,
    Partial<Post>
  >(API_ENDPOINTS.EXAMPLES.POSTS.UPDATE(postId), {
    onSuccess: (updatedPost) => {
      alert(`Post güncellendi!\nYeni başlık: ${updatedPost.title}`);
      console.log("Güncellenen post:", updatedPost);
    },
  });

  const handleUpdate = () => {
    updatePost({
      id: postId,
      title,
      body,
      userId: currentPost?.userId || 1,
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>✏️ Post Güncelle (JSONPlaceholder API)</h2>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Post ID (1-100):
        </label>
        <input
          type="number"
          value={postId}
          onChange={(e) => setPostId(parseInt(e.target.value) || 1)}
          min="1"
          max="100"
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      {fetchLoading && <p>Post yükleniyor...</p>}

      {currentPost && !fetchLoading && (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Başlık:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>
              İçerik:
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                resize: "vertical",
              }}
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={updateLoading}
            style={{
              padding: "10px 20px",
              backgroundColor: updateLoading ? "#ccc" : "#ffc107",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: updateLoading ? "not-allowed" : "pointer",
            }}
          >
            {updateLoading ? "⏳ Güncelleniyor..." : "✏️ Güncelle"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdatePostExample;
