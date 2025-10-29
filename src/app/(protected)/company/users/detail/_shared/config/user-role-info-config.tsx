import React from "react";
import type { UserConfigItem } from "../types";
import { getAccessTypeLabel, getAccessTypeBadgeClass } from "@/utils";

/**
 * Kullanıcı rol ve kurum bilgileri konfigürasyonu
 */
export const userRoleInfoConfig: UserConfigItem[] = [
  {
    label: "Roller",
    value: (user) =>
      user?.userRoles && user.userRoles.length > 0 ? (
        <div className="d-flex flex-wrap gap-2">
          {user.userRoles.map((role, index) => (
            <span key={index} className="badge bg-primary">
              {role.role || "-"} {role.roleLevel && `(${role.roleLevel})`}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-neutral-500">Rol atanmamış</span>
      ),
    isShowing: (user) => !!(user?.userRoles && user.userRoles.length > 0),
  },
  {
    label: "Marka",
    value: (user) =>
      user?.brand ? (
        <span className="text-neutral-700">
          <i className="ph ph-buildings me-2"></i>
          {user.brand.name}
        </span>
      ) : (
        <span className="text-neutral-500">Belirtilmemiş</span>
      ),
    isShowing: (user) => !!user?.brand,
  },
  {
    label: "Kampüs",
    value: (user) =>
      user?.campus ? (
        <span className="text-neutral-700">
          <i className="ph ph-graduation-cap me-2"></i>
          {user.campus.name}
        </span>
      ) : (
        <span className="text-neutral-500">Belirtilmemiş</span>
      ),
    isShowing: (user) => !!user?.campus,
  },
  {
    label: "Kurum Erişimleri",
    value: (user) =>
      user?.institutionAccess && user.institutionAccess.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-sm table-bordered">
            <thead>
              <tr>
                <th>Kurum</th>
                <th>Erişim Tipi</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {user.institutionAccess.map((access, index) => (
                <tr key={index}>
                  <td>{access.entityName}</td>
                  <td>
                    <span
                      className={`badge ${getAccessTypeBadgeClass(
                        access.accessType
                      )}`}
                    >
                      {getAccessTypeLabel(access.accessType)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        access.isActive ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {access.isActive ? "Aktif" : "Pasif"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <span className="text-neutral-500">Kurum erişimi yok</span>
      ),
    isShowing: (user) =>
      !!(user?.institutionAccess && user.institutionAccess.length > 0),
  },
  {
    label: "Abonelik",
    value: (user) =>
      user?.subscription ? (
        <div className="d-flex gap-3 align-items-center">
          <span className="text-neutral-700">
            <i className="ph ph-credit-card me-2"></i>
            {user.subscription.planName || "Plan adı belirtilmemiş"}
          </span>
          <span
            className={`badge ${
              user.subscription.isActive ? "bg-success" : "bg-secondary"
            }`}
          >
            {user.subscription.isActive ? "Aktif" : "Pasif"}
          </span>
        </div>
      ) : (
        <span className="text-neutral-500">Abonelik yok</span>
      ),
    isShowing: (user) => !!user?.subscription,
  },
];
