"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts";
import { usePathname } from "next/navigation";
import { PATHS } from "@/routes/paths";
import { Role } from "@/enums/Role";
import { ROUTES } from "@/routes/routes";
import { Loading } from "@/components";

interface ProtectedGuardProps {
  children: React.ReactNode;
  allowedDepartments?: string[];
  allowedPermissions?: string[];
}

function isUserAllowedOnRoute(userRoles: Role[], currentPath: string): boolean {
  const allRoutes = ROUTES.flatMap((route: any) => {
    const children = (route.children || []).map((child: any) => ({
      ...child,
      parentRoles: route.roles,
    }));
    return [route, ...children];
  });

  const matchedRoute = allRoutes.find(
    (route: any) => route.path === currentPath
  );
  if (!matchedRoute) return true;
  const rolesToCheck = matchedRoute.roles || matchedRoute.parentRoles;
  if (!Array.isArray(rolesToCheck)) return true;
  return (rolesToCheck as Role[]).some((role: Role) =>
    userRoles.includes(role)
  );
}

export default function ProtectedGuard({
  children,
  allowedDepartments,
  allowedPermissions,
}: ProtectedGuardProps) {
  const {
    user,
    isLoading,
    currentRole,
    currentDepartments,
    currentPermissions,
  } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (isLoading) return <Loading />;

  // auth guard
  if (!user) {
    router.push(PATHS.AUTH.LOGIN);
    return null;
  }

  // department guard
  if (Array.isArray(allowedDepartments) && allowedDepartments.length > 0) {
    const userDepartments = Array.isArray(currentDepartments)
      ? currentDepartments
      : [];
    const hasAllowedDepartment = userDepartments.some((dep) =>
      allowedDepartments.includes(dep)
    );
    if (!hasAllowedDepartment) {
      return null;
    }
  }

  // permission guard
  if (Array.isArray(allowedPermissions) && allowedPermissions.length > 0) {
    const userPermissions = Array.isArray(currentPermissions)
      ? currentPermissions
      : [];
    const hasAllowedPermission = userPermissions.some((perm) =>
      allowedPermissions.includes(perm)
    );
    if (!hasAllowedPermission) {
      return null;
    }
  }

  // role route guard
  const userRoles = currentRole ? [currentRole as Role] : [];
  if (!isUserAllowedOnRoute(userRoles, pathname)) {
    router.push("/unauthorized");
    return null;
  }

  return <>{children}</>;
}
