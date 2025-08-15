"use client";

// API Hook kullanım örnekleri - JSONPlaceholder Fake API ile
// Bu örnekler gerçek çalışan API'lar ile test edilebilir

import {
  useGet,
  usePost,
  usePut,
  useGetPaginated,
  usePostForm,
  useDeleteById,
} from "@/hooks/api";
import React, { useState } from "react";

// JSONPlaceholder API tipleri
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Fake API Base URL
const FAKE_API_BASE = "https://jsonplaceholder.typicode.com";

// 1. GET istekleri - JSONPlaceholder Users API
export const UsersListExample = () => {
  // Basit GET isteği - Tüm kullanıcıları getir
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useGet<User[]>(`${FAKE_API_BASE}/users`, {
    onSuccess: (data) => {
      console.log("Kullanıcılar yüklendi:", data);
    },
    onError: (error) => {
      console.error("Kullanıcılar yüklenemedi:", error);
    },
  });

  // Tek kullanıcı getirme (koşullu)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { data: selectedUser, loading: userLoading } = useGet<User>(
    selectedUserId ? `${FAKE_API_BASE}/users/${selectedUserId}` : null,
    { enabled: !!selectedUserId }
  );

  if (loading) return <div>Kullanıcılar yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>👥 Kullanıcı Listesi (JSONPlaceholder API)</h2>
      <button
        onClick={refetch}
        style={{ marginBottom: "20px", padding: "10px" }}
      >
        🔄 Yenile
      </button>

      <div style={{ display: "grid", gap: "10px" }}>
        {users?.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: selectedUserId === user.id ? "#f0f8ff" : "white",
            }}
            onClick={() => setSelectedUserId(user.id)}
          >
            <h3>
              {user.name} (@{user.username})
            </h3>
            <p>📧 {user.email}</p>
            <p>📞 {user.phone}</p>
            <p>🌐 {user.website}</p>
            <p>🏢 {user.company.name}</p>
            <p>📍 {user.address.city}</p>
          </div>
        ))}
      </div>

      {selectedUserId && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <h3>Seçili Kullanıcı Detayı:</h3>
          {userLoading ? (
            <p>Kullanıcı detayı yükleniyor...</p>
          ) : selectedUser ? (
            <div>
              <p>
                <strong>Ad:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Şirket:</strong> {selectedUser.company.name}
              </p>
              <p>
                <strong>Şirket Sloganı:</strong>{" "}
                {selectedUser.company.catchPhrase}
              </p>
              <p>
                <strong>Adres:</strong> {selectedUser.address.street},{" "}
                {selectedUser.address.city}
              </p>
            </div>
          ) : (
            <p>Kullanıcı bulunamadı</p>
          )}
        </div>
      )}
    </div>
  );
};

// 2. POST istekleri - JSONPlaceholder Posts API
export const CreatePostExample = () => {
  const {
    mutate: createPost,
    loading,
    error,
  } = usePost<Post, Omit<Post, "id">>(`${FAKE_API_BASE}/posts`, {
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

// 3. Form POST örneği - JSONPlaceholder ile Yorum Ekleme
export const CreateCommentForm = () => {
  const { submitForm, loading, error } = usePostForm<
    Omit<Comment, "id">,
    Comment
  >(`${FAKE_API_BASE}/comments`, {
    resetOnSuccess: true,
    onSuccess: (comment) => {
      alert(`Yorum eklendi! ID: ${comment.id}\nİsim: ${comment.name}`);
    },
  });

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

// 4. PUT/UPDATE örneği - JSONPlaceholder ile Post Güncelleme
export const UpdatePostExample = () => {
  const [postId, setPostId] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  // Önce mevcut post'u getir
  const { data: currentPost, loading: fetchLoading } = useGet<Post>(
    `${FAKE_API_BASE}/posts/${postId}`,
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
  >(`${FAKE_API_BASE}/posts/${postId}`, {
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

// 5. DELETE örneği - JSONPlaceholder ile Post Silme
export const DeletePostExample = () => {
  const [postId, setPostId] = useState<number>(1);

  const { deleteById, loading } = useDeleteById<{ success?: boolean }>(
    `${FAKE_API_BASE}/posts`,
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

// 6. Pagination örneği - Posts listesi
export const PostsPaginationExample = () => {
  const {
    data: posts,
    loading,
    goToPage,
    nextPage,
    prevPage,
  } = useGetPaginated<Post[]>(`${FAKE_API_BASE}/posts`, { page: 1, limit: 10 });

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

// 7. Kompozit örnek - Todo Listesi Yönetimi
export const TodoManagementExample = () => {
  const {
    data: todos,
    loading,
    refetch,
  } = useGet<Todo[]>(`${FAKE_API_BASE}/todos?_limit=10`);
  const { mutate: createTodo, loading: createLoading } = usePost<
    Todo,
    Omit<Todo, "id">
  >(`${FAKE_API_BASE}/todos`);
  const { mutate: updateTodo, loading: updateLoading } = usePut<
    Todo,
    Partial<Todo> & { id: number }
  >((data) => `${FAKE_API_BASE}/todos/${data.id}`);

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

// 🎯 ANA DEMO COMPONENT - Tüm örnekleri gösterir
export const ApiHooksDemoPage = () => {
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
};
