"use client";

// API Hook kullanım örnekleri - JSONPlaceholder Fake API ile
// Bu örnekler gerçek çalışan API'lar ile test edilebilir

import React, { useState } from "react";
import {
  UsersListExample,
  CreatePostExample,
  CreateCommentForm,
  UpdatePostExample,
  DeletePostExample,
  PostsPaginationExample,
  TodoManagementExample,
} from "./components";

// 🎯 ANA DEMO COMPONENT - Tüm örnekleri gösterir
export default function ApiHooksExamplePage() {
  const [activeTab, setActiveTab] = useState<string>("users");

  const tabs = [
    { id: "users", label: "👥 Kullanıcılar", component: <UsersListExample /> },
    {
      id: "create-post",
      label: "📝 Post Oluştur",
      component: <CreatePostExample />,
    },
    {
      id: "create-comment",
      label: "💬 Yorum Ekle",
      component: <CreateCommentForm />,
    },
    {
      id: "update-post",
      label: "✏️ Post Güncelle",
      component: <UpdatePostExample />,
    },
    {
      id: "delete-post",
      label: "🗑️ Post Sil",
      component: <DeletePostExample />,
    },
    {
      id: "pagination",
      label: "📄 Pagination",
      component: <PostsPaginationExample />,
    },
    {
      id: "todos",
      label: "📋 Todo Yönetimi",
      component: <TodoManagementExample />,
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <div
        style={{
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          marginBottom: "20px",
          padding: "20px",
        }}
      >
        <h1 style={{ margin: "0 0 20px 0", color: "#333" }}>
          🚀 API Hooks Demo - JSONPlaceholder API
        </h1>
        <p style={{ margin: "0", color: "#666" }}>
          Bu demo sayfası, oluşturduğumuz API hook sisteminin tüm özelliklerini
          gerçek bir API ile test etmenizi sağlar.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {/* Tab Menu */}
        <div style={{ width: "250px" }}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "15px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              position: "sticky",
              top: "20px",
            }}
          >
            <h3 style={{ margin: "0 0 15px 0", color: "#333" }}>📋 Örnekler</h3>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px",
                  marginBottom: "8px",
                  border: "none",
                  borderRadius: "6px",
                  textAlign: "left",
                  cursor: "pointer",
                  backgroundColor: activeTab === tab.id ? "#007bff" : "#f8f9fa",
                  color: activeTab === tab.id ? "white" : "#333",
                  fontSize: "14px",
                  transition: "all 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              minHeight: "500px",
            }}
          >
            {tabs.find((tab) => tab.id === activeTab)?.component}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "white",
          borderTop: "1px solid #eee",
          textAlign: "center",
          color: "#666",
        }}
      >
        <p>
          🔗 API:{" "}
          <a
            href="https://jsonplaceholder.typicode.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            JSONPlaceholder
          </a>{" "}
          | 📚 Dokümantasyon: <code>docs/API_HOOKS.md</code>
        </p>
      </div>
    </div>
  );
}
