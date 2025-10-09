import { useState } from "react";
import { UserDto } from "@/types/dto/user/UserDto";

export function useAuthRolePermissions() {
  const [currentRole, setCurrentRole] = useState<string>("");
  const [currentDepartments, setCurrentDepartments] = useState<string[]>([]);
  const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);

  const extractRoleData = (user: UserDto | null) => {
    if (!user?.userRoles?.[0]) {
      return {
        role: "",
        departments: [],
        permissions: [],
      };
    }

    const userRole = user.userRoles[0];
    
    return {
      role: userRole.role || "COMPANY", // Default fallback
      departments: userRole.departments?.map((dep: any) =>
        typeof dep === "string" ? dep : dep.name || dep
      ) || [],
      permissions: userRole.permissions?.map((perm: any) =>
        typeof perm === "string" ? perm : perm.name || perm
      ) || [],
    };
  };

  const updateRolePermissions = (user: UserDto | null) => {
    const { role, departments, permissions } = extractRoleData(user);
    setCurrentRole(role);
    setCurrentDepartments(departments);
    setCurrentPermissions(permissions);
  };

  const resetRolePermissions = () => {
    setCurrentRole("");
    setCurrentDepartments([]);
    setCurrentPermissions([]);
  };

  return {
    currentRole,
    currentDepartments,
    currentPermissions,
    setCurrentRole,
    setCurrentDepartments,
    setCurrentPermissions,
    updateRolePermissions,
    resetRolePermissions,
  };
}
