import Link from "next/link";
import { Button, Loading, Popover, CustomImage } from "@/components/ui";
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

  // Kullanıcı Paneli butonu sadece COMPANY ve ADMIN rollerinde görünsün
  const showDashboardButton =
    currentRole === Role.COMPANY || currentRole === Role.ADMIN;

  if (!user) {
    return (
      <div className="auth-buttons-wrapper">
        <Link href="/auth/login" className="auth-link auth-login">
          <i className="ph ph-sign-in"></i>
          <span>Giriş Yap</span>
        </Link>
        <Link href="/auth/register" className="auth-link auth-register">
          <i className="ph ph-user-plus"></i>
          <span>Kayıt Ol</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="user-menu-wrapper">
      {/* Dashboard Button - Sadece COMPANY ve ADMIN için görünür */}
      {showDashboardButton && (
        <Button
          href={getDashboardUrl()}
          variant="inline"
          size="xs"
          leftIcon="ph ph-squares-four"
          className="dashboard-btn"
        >
          <span className="dashboard-btn-text">Kullanıcı Paneli</span>
        </Button>
      )}

      {/* User Menu Popover */}
      <div className="user-menu-popover">
        <Popover
          placement="bottom-end"
          trigger="hover"
          content={
            <div
              style={{
                minWidth: "220px",
                padding: "8px",
              }}
            >
              {/* User Info */}
              <div
                style={{
                  padding: "10px",
                  marginBottom: "4px",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "13px",
                    color: "var(--neutral-900)",
                    marginBottom: "2px",
                  }}
                >
                  {user.fullName}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--neutral-500)",
                    marginBottom: "8px",
                  }}
                >
                  {user.email}
                </div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 6px",
                    fontSize: "10px",
                    fontWeight: 600,
                    backgroundColor: "var(--main-50)",
                    color: "var(--main-700)",
                    borderRadius: "3px",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                  }}
                >
                  {String(currentRole)}
                </span>
              </div>

              <div
                style={{
                  height: "1px",
                  backgroundColor: "rgba(0,0,0,0.06)",
                  margin: "4px 0",
                }}
              />

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                <Button
                  onClick={logout}
                  variant="error"
                  size="xs"
                  leftIcon="ph ph-sign-out"
                  fullWidth
                  style={{
                    justifyContent: "flex-start",
                    padding: "8px 10px",
                    fontSize: "13px",
                    borderRadius: "4px",
                    fontWeight: 500,
                  }}
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
            <CustomImage
              src={user?.profileImageUrl}
              tempImage={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.fullName || "User"
              )}&background=random&color=fff&size=88`}
              alt={user?.fullName || "Kullanıcı"}
              width={44}
              height={44}
              variant="circle"
            />
          </button>
        </Popover>
      </div>
    </div>
  );
};

export default UserMenu;
