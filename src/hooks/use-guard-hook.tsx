"use client";

import { useMemo } from "react";
import { useAuth } from "@/contexts";
import { MenuItem } from "@/types/routes/menu";

export function useGuardHook() {
  const { currentDepartments, currentPermissions } = useAuth();

  console.log(currentDepartments, currentPermissions);

  // Menü öğelerini filtreleyen fonksiyon
  const filterMenuItems = useMemo(() => {
    return (menuItems: MenuItem[]): MenuItem[] => {
      const filterMenuItem = (item: MenuItem): MenuItem | null => {
        // Department kontrolü
        if (item.departments && item.departments.length > 0) {
          const hasAllowedDepartment = currentDepartments.some((userDep) =>
            item.departments!.includes(userDep)
          );
          if (!hasAllowedDepartment) {
            return null;
          }
        }

        // Permission kontrolü
        if (item.permissions && item.permissions.length > 0) {
          const hasAllowedPermission = currentPermissions.some((userPerm) =>
            item.permissions!.includes(userPerm)
          );
          if (!hasAllowedPermission) {
            return null;
          }
        }

        // Children'ları filtrele
        let filteredChildren: MenuItem[] | undefined;
        if (item.children && item.children.length > 0) {
          filteredChildren = item.children
            .map(filterMenuItem)
            .filter((child): child is MenuItem => child !== null);

          // Eğer hiç child kalmadıysa ve sadece children'a bağlı bir menü ise null döndür
          if (filteredChildren.length === 0 && item.children.length > 0) {
            // Eğer parent'ın kendi href'i yoksa (sadece children container'ı ise)
            if (!item.href || item.href === "#") {
              return null;
            }
          }
        }

        return {
          ...item,
          children: filteredChildren,
        };
      };

      return menuItems
        .map(filterMenuItem)
        .filter((item): item is MenuItem => item !== null);
    };
  }, [currentDepartments, currentPermissions]);

  // Kullanıcının belirli departmanlara erişimi var mı kontrol eden fonksiyon
  const hasAccessToDepartments = useMemo(() => {
    return (requiredDepartments: string[]): boolean => {
      if (!requiredDepartments || requiredDepartments.length === 0) return true;
      return currentDepartments.some((dep) =>
        requiredDepartments.includes(dep)
      );
    };
  }, [currentDepartments]);

  // Kullanıcının belirli izinlere erişimi var mı kontrol eden fonksiyon
  const hasAccessToPermissions = useMemo(() => {
    return (requiredPermissions: string[]): boolean => {
      if (!requiredPermissions || requiredPermissions.length === 0) return true;
      return currentPermissions.some((perm) =>
        requiredPermissions.includes(perm)
      );
    };
  }, [currentPermissions]);

  // Kullanıcının hem departman hem izin erişimi var mı kontrol eden fonksiyon
  const hasAccess = useMemo(() => {
    return (
      requiredDepartments?: string[],
      requiredPermissions?: string[]
    ): boolean => {
      const departmentAccess = hasAccessToDepartments(
        requiredDepartments || []
      );
      const permissionAccess = hasAccessToPermissions(
        requiredPermissions || []
      );

      // Her ikisi de belirtilmişse, her ikisine de erişim gerekli
      if (requiredDepartments?.length && requiredPermissions?.length) {
        return departmentAccess && permissionAccess;
      }

      // Sadece biri belirtilmişse, o geçerli
      if (requiredDepartments?.length) return departmentAccess;
      if (requiredPermissions?.length) return permissionAccess;

      // Hiçbiri belirtilmemişse, erişim var
      return true;
    };
  }, [hasAccessToDepartments, hasAccessToPermissions]);

  return {
    // Menü filtreleme fonksiyonu
    filterMenuItems,

    // Erişim kontrol fonksiyonları
    hasAccessToDepartments,
    hasAccessToPermissions,
    hasAccess,

    // Mevcut kullanıcı bilgileri (kolay erişim için)
    currentDepartments,
    currentPermissions,
  };
}
