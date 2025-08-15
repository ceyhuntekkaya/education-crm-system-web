"use client";

import { usePostForm } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Comment, CreateComment } from "@/types";
import React from "react";

const CreateCommentForm = () => {
  const { submitForm, loading, error } = usePostForm<CreateComment, Comment>(
    API_ENDPOINTS.EXAMPLES.COMMENTS.CREATE,
    {
      resetOnSuccess: true,
      onSuccess: (comment) => {
        alert(`Yorum eklendi! ID: ${comment.id}\nİsim: ${comment.name}`);
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    submitForm({
      postId: parseInt(formData.get("postId") as string) || 1,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      body: formData.get("body") as string,
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>💬 Yorum Ekle (JSONPlaceholder API)</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Post ID:
          </label>
          <input
            name="postId"
            type="number"
            placeholder="Post ID (1-100)"
            defaultValue="1"
            min="1"
            max="100"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>İsim:</label>
          <input
            name="name"
            placeholder="Adınız"
            required
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
            Email:
          </label>
          <input
            name="email"
            type="email"
            placeholder="email@example.com"
            required
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
            Yorum:
          </label>
          <textarea
            name="body"
            placeholder="Yorumunuzu yazın..."
            required
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
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "📤 Gönderiliyor..." : "💬 Yorum Ekle"}
        </button>

        {error && (
          <div
            style={{
              color: "red",
              padding: "10px",
              backgroundColor: "#ffebee",
              borderRadius: "4px",
            }}
          >
            ❌ Hata: {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCommentForm;
