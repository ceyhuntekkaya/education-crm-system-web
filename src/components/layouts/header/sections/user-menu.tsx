import Image from "next/image";
import { Button, Loading, Popover } from "@/components/ui";
import { HEADER_CONFIG } from "../config";
import { useAuth } from "@/contexts";
import { Role } from "@/enums/Role";

const UserMenu = () => {
  const { user, currentRole, logout } = useAuth();

  const getDashboardUrl = () => {
    switch (currentRole) {
      case Role.COMPANY:
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
      <div className="d-flex gap-8">
        <Button href="/auth/login">Giriş Yap</Button>
        <Button href="/auth/register" variant="outline">
          Kayıt Ol
        </Button>
      </div>
    );
  }

  return (
    <Popover
      placement="bottom-end"
      trigger="hover"
      content={
        <div className="p-16">
          <div className="flex-center flex-column gap-16 mb-16">
            <Image
              src={HEADER_CONFIG.LOGO_PATH}
              alt={user.fullName}
              className="rounded-50 box-shadow-md"
              width={HEADER_CONFIG.USER_AVATAR_SIZE}
              height={HEADER_CONFIG.USER_AVATAR_SIZE}
            />
            <div className="text-center">
              <div className="fw-bold text-lg">{user.fullName}</div>
              <div className="text-sm text-neutral-500">{user.email}</div>
            </div>
            <span className="badge bg-main-600 text-white px-16 py-8 rounded-8 mt-8">
              {String(currentRole)}
            </span>
          </div>
          <div className="d-flex flex-column gap-8 mt-16">
            <Button href={getDashboardUrl()} variant="inline" size="xxs">
              Dashboard
            </Button>
            <Button
              onClick={logout}
              variant="error"
              size="xxs"
              rightIcon="ph-sign-out"
            >
              Çıkış Yap
            </Button>
          </div>
        </div>
      }
    >
      <button
        type="button"
        className="info-action w-52 h-52 bg-main-25 hover-bg-main-600 border border-neutral-30 rounded-circle flex-center text-2xl text-neutral-500 hover-text-white hover-border-main-600"
        style={{ border: "none", background: "none" }}
      >
        <i className="ph ph-user-circle" />
      </button>
    </Popover>
  );
};

export default UserMenu;
