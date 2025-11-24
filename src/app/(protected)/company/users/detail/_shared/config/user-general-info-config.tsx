import React from "react";
import type { UserConfigItem } from "../types";
import { CustomImage } from "@/components/ui";

/**
 * Genel kullanıcı bilgileri konfigürasyonu
 */
export const userGeneralInfoConfig: UserConfigItem[] = [
  {
    label: "Profil Resmi",
    value: (user) => (
      <div className="d-flex align-items-center w-full justify-content-start">
        {user?.profileImageUrl ? (
          <CustomImage
            src={user.profileImageUrl}
            alt={user.fullName || "Kullanıcı resmi"}
            width={120}
            height={120}
            variant="circle"
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center bg-main-50 rounded-circle border border-main-200"
            style={{ width: "120px", height: "120px" }}
          >
            <i
              className="ph ph-user text-main-600"
              style={{ fontSize: "48px" }}
            />
          </div>
        )}
      </div>
    ),
    isShowing: (user) => !!user,
  },
  {
    label: "Ad Soyad",
    value: (user) => (
      <span className="text-main-600 fw-semibold">
        <i className="ph ph-user me-2"></i>
        {user?.fullName ||
          `${user?.firstName || ""} ${user?.lastName || ""}` ||
          "Belirtilmemiş"}
      </span>
    ),
    isShowing: (user) =>
      !!(user?.fullName || user?.firstName || user?.lastName),
  },
  {
    label: "E-posta",
    value: (user) =>
      user?.email ? (
        <a
          href={`mailto:${user.email}`}
          className="text-main-600 text-decoration-none d-flex align-items-center gap-2"
        >
          <i className="ph ph-envelope"></i>
          {user.email}
        </a>
      ) : (
        <span className="text-neutral-500">E-posta mevcut değil</span>
      ),
    isShowing: (user) => !!user?.email,
  },
  {
    label: "Telefon",
    value: (user) =>
      user?.phone ? (
        <a
          href={`tel:${user.phone}`}
          className="text-main-600 text-decoration-none d-flex align-items-center gap-2"
        >
          <i className="ph ph-phone"></i>
          {user.phone}
        </a>
      ) : (
        <span className="text-neutral-500">Telefon mevcut değil</span>
      ),
    isShowing: (user) => !!user?.phone,
  },
  {
    label: "Kullanıcı Tipi",
    value: (user) => {
      const typeLabels: Record<string, string> = {
        INSTITUTION_USER: "Kurum Kullanıcısı",
        PARENT: "Veli",
        STUDENT: "Öğrenci",
      };
      return (
        <span className="badge bg-info text-white">
          {typeLabels[user?.userType || ""] ||
            user?.userType ||
            "Belirtilmemiş"}
        </span>
      );
    },
    isShowing: (user) => !!user?.userType,
  },
  {
    label: "Durum",
    value: (user) => (
      <span
        className={`badge ${user?.isActive ? "bg-success" : "bg-secondary"}`}
      >
        {user?.isActive ? "Aktif" : "Pasif"}
      </span>
    ),
    isShowing: (user) => user?.isActive !== undefined,
  },
  {
    label: "E-posta Doğrulaması",
    value: (user) => (
      <span
        className={`badge ${
          user?.isEmailVerified ? "bg-success" : "bg-warning"
        }`}
      >
        <i
          className={`ph ${
            user?.isEmailVerified ? "ph-check-circle" : "ph-warning-circle"
          } me-1`}
        ></i>
        {user?.isEmailVerified ? "Doğrulandı" : "Doğrulanmadı"}
      </span>
    ),
    isShowing: (user) => user?.isEmailVerified !== undefined,
  },
  {
    label: "Telefon Doğrulaması",
    value: (user) => (
      <span
        className={`badge ${
          user?.isPhoneVerified ? "bg-success" : "bg-warning"
        }`}
      >
        <i
          className={`ph ${
            user?.isPhoneVerified ? "ph-check-circle" : "ph-warning-circle"
          } me-1`}
        ></i>
        {user?.isPhoneVerified ? "Doğrulandı" : "Doğrulanmadı"}
      </span>
    ),
    isShowing: (user) => user?.isPhoneVerified !== undefined,
  },
  {
    label: "Son Giriş",
    value: (user) =>
      user?.lastLoginAt ? (
        <span className="text-neutral-700">
          <i className="ph ph-clock me-2"></i>
          {new Date(user.lastLoginAt).toLocaleString("tr-TR")}
        </span>
      ) : (
        <span className="text-neutral-500">Henüz giriş yapmamış</span>
      ),
    isShowing: (user) => !!user?.lastLoginAt,
  },
  {
    label: "Kayıt Tarihi",
    value: (user) =>
      user?.createdAt ? (
        <span className="text-neutral-700">
          <i className="ph ph-calendar me-2"></i>
          {new Date(user.createdAt).toLocaleString("tr-TR")}
        </span>
      ) : (
        <span className="text-neutral-500">Belirtilmemiş</span>
      ),
    isShowing: (user) => !!user?.createdAt,
  },
];
