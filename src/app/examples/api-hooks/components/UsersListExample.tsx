"use client";

import React, { useState } from "react";
import { useGet } from "@/hooks/api";
import { User } from "@/types/jsonplaceholder";
import { Form, FormInput, FormButton } from "@/components/forms";
import { FormProvider, FormValues } from "@/contexts";
import { useFormHook } from "@/hooks";
import { API_ENDPOINTS } from "@/lib/api";
import { Button } from "@/components";

const initialValues = {
  name: "",
  email: "",
  username: "",
  phone: "",
};

const UsersListContent: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { values, resetForm, isDirty } = useFormHook();

  const {
    data: users,
    loading,
    error,
    refetch,
  } = useGet<User[]>(API_ENDPOINTS.EXAMPLES.USERS.LIST, {
    params: isDirty ? values : undefined,
  });

  // Her seçilen kullanıcı için ayrı API çağrısı
  const {
    data: selectedUserDetails,
    loading: userDetailsLoading,
    error: userDetailsError,
  } = useGet<User>(
    selectedUser ? API_ENDPOINTS.EXAMPLES.USERS.BY_ID(selectedUser.id) : null,
    {
      enabled: !!selectedUser,
    }
  );

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted with filters:", data);
    refetch();
  };

  const handleClearFilters = () => {
    resetForm();
    setSelectedUser(null);
  };

  const handleUserSelect = (user: User) => {
    const isCurrentlySelected = selectedUser?.id === user.id;
    setSelectedUser(isCurrentlySelected ? null : user);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Kullanıcılar yükleniyor...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Hata Oluştu</h3>
        <p className="text-red-600 mt-1">{error}</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Form */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Kullanıcı Filtreleme
        </h3>

        <Form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name="name"
              label="İsim"
              placeholder="İsime göre ara..."
              fullWidth
            />

            <FormInput
              name="email"
              label="E-posta"
              placeholder="E-postaya göre ara..."
              type="email"
              fullWidth
            />

            <FormInput
              name="username"
              label="Kullanıcı Adı"
              placeholder="Kullanıcı adına göre ara..."
              fullWidth
            />

            <FormInput
              name="phone"
              label="Telefon"
              placeholder="Telefona göre ara..."
              fullWidth
            />
          </div>

          <div className="flex gap-3 pt-4">
            <FormButton
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Filtrele
            </FormButton>

            <Button
              type="button"
              variant="secondary"
              onClick={handleClearFilters}
            >
              Temizle
            </Button>
          </div>
        </Form>
      </div>

      {/* Debug Panel - Development Only */}
      <div className="bg-gray-50 border rounded-lg p-4 text-sm">
        <h4 className="font-medium text-gray-700 mb-2 mt-3">
          Debug - Form Values:
        </h4>
        <pre className="text-gray-600 whitespace-pre-wrap">
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Kullanıcılar ({users?.length || 0})
          </h3>
        </div>

        <div className="divide-y">
          {users && users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className={`p-6 cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedUser?.id === user.id
                    ? "bg-blue-50 border-l-4 border-l-blue-500"
                    : ""
                }`}
                onClick={() => handleUserSelect(user)}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-600">@{user.username}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-600">{user.phone}</p>
                  </div>

                  <div className="text-right text-sm text-gray-500">
                    <p>{user.address?.city}</p>
                    <p>{user.company?.name}</p>
                  </div>
                </div>

                {selectedUser?.id === user.id && (
                  <div className="mt-4 pt-4 border-t bg-gray-50 -mx-6 px-6">
                    <h5 className="font-medium text-gray-900 mb-2">
                      Detaylı Bilgiler (API&apos;den Gelen)
                    </h5>

                    {userDetailsLoading && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span>Kullanıcı detayları yükleniyor...</span>
                      </div>
                    )}

                    {userDetailsError && (
                      <div className="bg-red-50 border border-red-200 rounded p-3 text-sm">
                        <p className="text-red-600">
                          Kullanıcı detayları yüklenirken hata oluştu:{" "}
                          {userDetailsError}
                        </p>
                      </div>
                    )}

                    {selectedUserDetails && !userDetailsLoading && (
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                          <p className="text-blue-800 font-medium">
                            Bu veriler USERS.BY_ID({selectedUser?.id})
                            endpoint&apos;inden geldi
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p>
                              <span className="font-medium">ID:</span>{" "}
                              {selectedUserDetails.id}
                            </p>
                            <p>
                              <span className="font-medium">İsim:</span>{" "}
                              {selectedUserDetails.name}
                            </p>
                            <p>
                              <span className="font-medium">
                                Kullanıcı Adı:
                              </span>{" "}
                              {selectedUserDetails.username}
                            </p>
                            <p>
                              <span className="font-medium">E-posta:</span>{" "}
                              {selectedUserDetails.email}
                            </p>
                            <p>
                              <span className="font-medium">Telefon:</span>{" "}
                              {selectedUserDetails.phone}
                            </p>
                            <p>
                              <span className="font-medium">Website:</span>{" "}
                              {selectedUserDetails.website}
                            </p>
                          </div>

                          <div>
                            {selectedUserDetails.address && (
                              <div className="space-y-1">
                                <p className="font-medium text-gray-700">
                                  Adres Bilgileri:
                                </p>
                                <p>
                                  <span className="font-medium">Sokak:</span>{" "}
                                  {selectedUserDetails.address.street}
                                </p>
                                <p>
                                  <span className="font-medium">Daire:</span>{" "}
                                  {selectedUserDetails.address.suite}
                                </p>
                                <p>
                                  <span className="font-medium">Şehir:</span>{" "}
                                  {selectedUserDetails.address.city}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Posta Kodu:
                                  </span>{" "}
                                  {selectedUserDetails.address.zipcode}
                                </p>
                                {selectedUserDetails.address.geo && (
                                  <p>
                                    <span className="font-medium">
                                      Koordinat:
                                    </span>{" "}
                                    {selectedUserDetails.address.geo.lat},{" "}
                                    {selectedUserDetails.address.geo.lng}
                                  </p>
                                )}
                              </div>
                            )}

                            {selectedUserDetails.company && (
                              <div className="space-y-1 mt-3">
                                <p className="font-medium text-gray-700">
                                  Şirket Bilgileri:
                                </p>
                                <p>
                                  <span className="font-medium">Şirket:</span>{" "}
                                  {selectedUserDetails.company.name}
                                </p>
                                <p>
                                  <span className="font-medium">Slogan:</span>{" "}
                                  {selectedUserDetails.company.catchPhrase}
                                </p>
                                {selectedUserDetails.company.bs && (
                                  <p>
                                    <span className="font-medium">
                                      İş Alanı:
                                    </span>{" "}
                                    {selectedUserDetails.company.bs}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-gray-100 rounded p-3 text-xs">
                          <p className="font-medium text-gray-700 mb-2">
                            Backend Yanıtı (JSON):
                          </p>
                          <pre className="text-gray-600 whitespace-pre-wrap max-h-40 overflow-y-auto">
                            {JSON.stringify(selectedUserDetails, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>Kullanıcı bulunamadı.</p>
              <p className="text-sm mt-1">Farklı filtreler deneyebilirsiniz.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const UsersListExample: React.FC = () => {
  return (
    <FormProvider initialValues={initialValues}>
      <UsersListContent />
    </FormProvider>
  );
};

export default UsersListExample;
