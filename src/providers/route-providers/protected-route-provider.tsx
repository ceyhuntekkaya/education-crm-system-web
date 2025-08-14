"use client";

import { useAuth } from "@/contexts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UnauthorizedAccess } from "@/components";
import { ROLES, AllowedRoles } from "@/types/roles";
import { ROUTES } from "@/config";

interface ProtectedRouteProviderProps {
  children: React.ReactNode;
  roles?: AllowedRoles;
}

export default function ProtectedRouteProvider({
  children,
  roles,
}: ProtectedRouteProviderProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      // Sadece giriş yapmamış kullanıcıları login sayfasına yönlendir
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [user, isLoading, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Kullanıcı giriş yapmamışsa hiçbir şey render etme (useEffect login'e yönlendirecek)
  if (!user) {
    return null;
  }

  // Rol kontrolü - admin her şeye erişebilir, diğer roller sadece izin verilen rollerde olmalı
  if (roles && roles.length > 0) {
    const userHasPermission =
      roles.includes(user.role as ROLES) || user.role === ROLES.ADMIN;

    if (!userHasPermission) {
      // Yetkisiz erişim - unauthorized component'i render et
      return <UnauthorizedAccess user={user} />;
    }
  }

  // Normal erişim - içeriği render et
  return <>{children}</>;
}
