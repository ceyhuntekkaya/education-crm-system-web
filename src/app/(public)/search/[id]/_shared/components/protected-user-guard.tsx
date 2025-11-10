"use client";

import React from "react";
import { useAuth } from "@/contexts/auth-context";
import { CustomCard, Button, Icon } from "@/components";

interface ProtectedUserGuardProps {
  children: React.ReactNode;
  message?: string;
  /** Eğer true ise, kullanıcı giriş yapmamışsa mesaj göstermeden direkt null döner (component gizlenir) */
  hidden?: boolean;
}

/**
 * Kullanıcı giriş kontrolü yapan guard component
 * Giriş yapmamış kullanıcılara giriş yapma mesajı gösterir
 * hidden prop'u true ise mesaj göstermeden null döner
 */
export const ProtectedUserGuard: React.FC<ProtectedUserGuardProps> = ({
  children,
  message = "Bu bölüme erişim için lütfen önce giriş yapınız.",
  hidden = false,
}) => {
  const { user } = useAuth();

  if (!user) {
    // Hidden mode: hiçbir şey gösterme
    if (hidden) {
      return null;
    }

    // Normal mode: mesaj kartı göster
    return (
      <CustomCard className="text-center mt-20">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <Icon
            icon="ph-bold ph-lock"
            variant="inline"
            size="lg"
            className="text-neutral-400 mb-24"
            style={{ width: "80px", height: "80px", fontSize: "48px" }}
          />
          <h4 className="text-neutral-700 mb-12">Giriş Yapmanız Gerekiyor</h4>
          <p
            className="text-neutral-500 mb-32 text-center"
            style={{ maxWidth: "400px" }}
          >
            {message}
          </p>
          <Button
            variant="inline"
            size="md"
            leftIcon="ph-bold ph-sign-in"
            href="/login"
          >
            Giriş Yap
          </Button>
        </div>
      </CustomCard>
    );
  }

  return <>{children}</>;
};

