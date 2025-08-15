"use client";

import { usePost } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Post, CreatePost } from "@/types";
import React from "react";

const CreatePostExample = () => {
  const {
    mutate: createPost,
    loading,
    error,
  } = usePost<Post, CreatePost>(API_ENDPOINTS.EXAMPLES.POSTS.CREATE, {
    onSuccess: (data) => {
      alert(`Post oluşturuldu! ID: ${data.id}`);
      console.log("Yeni post:", data);
    },
    onError: (error) => {
      alert("Post oluşturma başarısız: " + error);
    },
  });

  const handleCreatePost = () => {
    createPost({
      userId: 1,
      title: "Yeni Blog Yazısı",
      body: "Bu, API hook sistemimizi test etmek için oluşturulmuş örnek bir blog yazısıdır.",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 Yeni Post Oluştur (JSONPlaceholder API)</h2>
      <button
        onClick={handleCreatePost}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "📤 Gönderiliyor..." : "📝 Post Oluştur"}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>❌ Hata: {error}</div>
      )}
    </div>
  );
};

export default CreatePostExample;
