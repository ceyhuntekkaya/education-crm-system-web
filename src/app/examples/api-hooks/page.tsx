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
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm mb-5 p-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-5">
          🚀 API Hooks Demo - JSONPlaceholder API
        </h1>
        <p className="text-gray-600 text-base m-0">
          Bu demo sayfası, oluşturduğumuz API hook sisteminin tüm özelliklerini
          gerçek bir API ile test etmenizi sağlar.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex gap-5 max-w-6xl mx-auto px-5">
        {/* Tab Menu */}
        <div className="w-64">
          <div className="bg-white rounded-lg p-4 shadow-sm sticky top-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              📋 Örnekler
            </h3>
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full px-3 py-3 text-left text-sm font-medium rounded-md transition-all duration-200
                    ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm min-h-[500px]">
            {tabs.find((tab) => tab.id === activeTab)?.component}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 p-5 bg-white border-t border-gray-200 text-center text-gray-600">
        <p>
          🔗 API:{" "}
          <a
            href="https://jsonplaceholder.typicode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            JSONPlaceholder
          </a>{" "}
          | 📚 Dokümantasyon:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
            docs/API_HOOKS.md
          </code>
        </p>
      </div>
    </div>
  );
}
