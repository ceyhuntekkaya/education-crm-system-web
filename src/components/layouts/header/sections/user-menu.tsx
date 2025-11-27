import Image from "next/image";
import { Button, Loading, Popover } from "@/components/ui";
import { HEADER_CONFIG } from "../config";
import { useAuth } from "@/contexts";
import { Role } from "@/enums/Role";
import "./user-menu.scss";

const UserMenu = () => {
  const { user, currentRole, logout } = useAuth();

  // console.log("user in user menu:", user);

  const getDashboardUrl = () => {
    switch (currentRole) {
      case Role.COMPANY:
        return "/company";
      case Role.ADMIN:
        return "/company";
      // case Role.ADMIN:
      //   return "/admin";
      // case Role.USER:
      //   return "/user";
      // case Role.CANDIDATE:
      //   return "/candidate";
      default:
        return "/";
    }
  };

  if (!user) {
    return (
      <div className="auth-buttons-wrapper">
        <a href="/auth/login" className="auth-link auth-login">
          <i className="ph ph-sign-in"></i>
          <span>Giriş Yap</span>
        </a>
        <a href="/auth/register" className="auth-link auth-register">
          <i className="ph ph-user-plus"></i>
          <span>Kayıt Ol</span>
        </a>
      </div>
    );
  }

  return (
    <div className="user-menu-popover">
      <Popover
        placement="bottom-end"
        trigger="hover"
        content={
          <div className="user-menu-content">
            <div className="user-avatar-section">
              <Image
                src={HEADER_CONFIG.LOGO_PATH}
                alt={user.fullName || "User"}
                className="user-avatar"
                width={HEADER_CONFIG.USER_AVATAR_SIZE}
                height={HEADER_CONFIG.USER_AVATAR_SIZE}
              />
              <div className="user-info">
                <div className="user-name">{user.fullName}</div>
                <div className="user-email">{user.email}</div>
              </div>
              <span className="user-role-badge">{String(currentRole)}</span>
            </div>
            <div className="user-menu-actions">
              <Button
                href={getDashboardUrl()}
                variant="inline"
                size="xs"
                className="user-action-btn"
                leftIcon="ph ph-house"
              >
                Dashboard
              </Button>
              <Button
                onClick={logout}
                variant="error"
                size="xs"
                className="user-action-btn"
                rightIcon="ph ph-sign-out"
              >
                Çıkış Yap
              </Button>
            </div>
          </div>
        }
      >
        <button
          type="button"
          className="user-menu-trigger"
          aria-label="User menu"
        >
          <i className="ph ph-user-circle" />
        </button>
      </Popover>
    </div>
  );
};

export default UserMenu;
