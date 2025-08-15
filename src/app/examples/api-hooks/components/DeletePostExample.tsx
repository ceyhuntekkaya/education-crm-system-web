"use client";

import { useDeleteById } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import React, { useState } from "react";

const DeletePostExample = () => {
  const [postId, setPostId] = useState<number>(1);

  const { deleteById, loading } = useDeleteById<{ success?: boolean }>(
    API_ENDPOINTS.EXAMPLES.POSTS.LIST, // Base URL for posts
    {
      onSuccess: () => {
        alert(`Post ${postId} başarıyla silindi!`);
      },
      onError: (error) => {
        alert("Silme işlemi başarısız: " + error);
      },
    }
  );

  const handleDelete = () => {
    if (confirm(`Post ${postId}'i silmek istediğinizden emin misiniz?`)) {
      deleteById(postId);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🗑️ Post Sil (JSONPlaceholder API)</h2>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Silinecek Post ID (1-100):
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
            marginRight: "10px",
          }}
        />
      </div>

      <button
        onClick={handleDelete}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "🗑️ Siliniyor..." : "🗑️ Post Sil"}
      </button>
    </div>
  );
};

export default DeletePostExample;
