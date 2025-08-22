"use client";

import { useGetPaginated } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Post } from "@/types";
import React from "react";

const PostsPaginationExample = () => {
  const {
    data: posts,
    loading,
    goToPage,
    nextPage,
    prevPage,
  } = useGetPaginated<Post[]>(API_ENDPOINTS.EXAMPLES.POSTS.LIST, {
    page: 1,
    limit: 10,
  });

  if (loading)
    return <div style={{ padding: "20px" }}>📄 Postlar yükleniyor...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📄 Posts Listesi - Pagination (JSONPlaceholder API)</h2>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={prevPage}
          style={{
            padding: "8px 16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          ⬅️ Önceki
        </button>
        <button
          onClick={() => goToPage(1)}
          style={{
            padding: "8px 16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          Sayfa 1
        </button>
        <button
          onClick={() => goToPage(2)}
          style={{
            padding: "8px 16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          Sayfa 2
        </button>
        <button
          onClick={() => goToPage(3)}
          style={{
            padding: "8px 16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          Sayfa 3
        </button>
        <button
          onClick={nextPage}
          style={{
            padding: "8px 16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          Sonraki ➡️
        </button>
      </div>

      <div style={{ display: "grid", gap: "15px" }}>
        {posts?.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #eee",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
              {post.id}. {post.title}
            </h3>
            <p style={{ margin: "0", color: "#666", lineHeight: "1.5" }}>
              {post.body}
            </p>
            <small style={{ color: "#999" }}>User ID: {post.userId}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPaginationExample;
