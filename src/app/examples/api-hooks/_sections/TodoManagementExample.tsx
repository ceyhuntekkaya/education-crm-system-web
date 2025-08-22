"use client";

import { useGet, usePost, usePut } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Todo, CreateTodo, UpdateTodo } from "@/types";
import React from "react";

const TodoManagementExample = () => {
  const {
    data: todos,
    loading,
    refetch,
  } = useGet<Todo[]>(API_ENDPOINTS.EXAMPLES.TODOS.LIMITED(10));
  const { mutate: createTodo, loading: createLoading } = usePost<
    Todo,
    CreateTodo
  >(API_ENDPOINTS.EXAMPLES.TODOS.CREATE);
  const { mutate: updateTodo, loading: updateLoading } = usePut<
    Todo,
    UpdateTodo
  >((data) => API_ENDPOINTS.EXAMPLES.TODOS.UPDATE(data.id));

  const handleToggleTodo = (todo: Todo) => {
    updateTodo(
      {
        id: todo.id,
        completed: !todo.completed,
      },
      {
        onSuccess: () => {
          refetch(); // Listeyi yenile
        },
      }
    );
  };

  const handleAddTodo = () => {
    const title = prompt("Yeni todo başlığı:");
    if (title) {
      createTodo(
        {
          userId: 1,
          title,
          completed: false,
        },
        {
          onSuccess: () => {
            refetch(); // Listeyi yenile
          },
        }
      );
    }
  };

  if (loading)
    return <div style={{ padding: "20px" }}>📋 Todos yükleniyor...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>📋 Todo Listesi Yönetimi (JSONPlaceholder API)</h2>

      <button
        onClick={handleAddTodo}
        disabled={createLoading}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: createLoading ? "not-allowed" : "pointer",
        }}
      >
        {createLoading ? "➕ Ekleniyor..." : "➕ Yeni Todo Ekle"}
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {todos?.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "15px",
              border: "1px solid #eee",
              borderRadius: "8px",
              backgroundColor: todo.completed ? "#e8f5e8" : "#fff",
            }}
          >
            <button
              onClick={() => handleToggleTodo(todo)}
              disabled={updateLoading}
              style={{
                padding: "5px 10px",
                backgroundColor: todo.completed ? "#dc3545" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: updateLoading ? "not-allowed" : "pointer",
              }}
            >
              {todo.completed ? "❌" : "✅"}
            </button>

            <span
              style={{
                flex: 1,
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#666" : "#333",
              }}
            >
              {todo.title}
            </span>

            <small style={{ color: "#999" }}>
              ID: {todo.id} | User: {todo.userId}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoManagementExample;
