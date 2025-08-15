"use client";

import { useGet } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { User } from "@/types";
import React, { useState, useCallback } from "react";

const UsersListExample = () => {
  // useCallback ile stabil options
  const handleSuccess = useCallback((data: unknown) => {
    console.log("Kullanıcılar yüklendi:", data);
  }, []);

  const handleError = useCallback((error: string) => {
    console.error("Kullanıcılar yüklenemedi:", error);
  }, []);

  // Basit GET isteği - Tüm kullanıcıları getir
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useGet<User[]>(API_ENDPOINTS.EXAMPLES.USERS.LIST, {
    onSuccess: handleSuccess,
    onError: handleError,
  });

  // Tek kullanıcı getirme (koşullu)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { data: selectedUser, loading: userLoading } = useGet<User>(
    selectedUserId ? API_ENDPOINTS.EXAMPLES.USERS.BY_ID(selectedUserId) : null,
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
    </div>
  );
};

export default UsersListExample;
