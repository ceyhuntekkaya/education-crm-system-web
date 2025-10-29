import { GridColDef } from "@/components/ui/data-grid";
import { UserDto } from "@/types";
import { formatDate } from "@/utils";
import Image from "next/image";
import { Badge } from "@/components";
import Popover from "@/components/ui/popover";

/**
 * Kullanıcı profil resmini döndürür
 */
const getUserProfileImage = (user: UserDto): string => {
  return user.profileImageUrl || "/assets/images/avatar-default.png";
};

/**
 * Kullanıcı tipini görsel olarak döndürür
 */
const getUserTypeDisplay = (
  userType?: "INSTITUTION_USER" | "PARENT"
): string => {
  switch (userType) {
    case "INSTITUTION_USER":
      return "Kurum Kullanıcısı";
    case "PARENT":
      return "Veli";
    default:
      return "-";
  }
};

/**
 * Doğrulama durumuna göre badge variant döndürür
 */
const getVerificationBadgeVariant = (
  isEmailVerified?: boolean,
  isPhoneVerified?: boolean
): "success" | "warning" | "danger" => {
  if (isEmailVerified && isPhoneVerified) return "success";
  if (isEmailVerified || isPhoneVerified) return "warning";
  return "danger";
};

/**
 * Son giriş tarihine göre aktivite seviyesi döndürür
 */
const getActivityLevel = (lastLoginAt?: string) => {
  if (!lastLoginAt)
    return { label: "Hiç giriş yapmadı", variant: "secondary" as const };

  const lastLogin = new Date(lastLoginAt);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0)
    return { label: "Bugün aktif", variant: "success" as const };
  if (diffInDays <= 7)
    return { label: "Bu hafta aktif", variant: "info" as const };
  if (diffInDays <= 30)
    return { label: "Bu ay aktif", variant: "warning" as const };
  return { label: "Uzun süredir pasif", variant: "danger" as const };
};

/**
 * Tarihten ne kadar zaman geçtiğini hesaplar
 */
const getTimeAgo = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInMs = now.getTime() - past.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Bugün";
  if (diffInDays === 1) return "Dün";
  if (diffInDays < 7) return `${diffInDays} gün önce`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} hafta önce`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} ay önce`;
  return `${Math.floor(diffInDays / 365)} yıl önce`;
};

// ==================== RENDER FUNCTIONS ====================

/**
 * Profil resmini render eder
 */
const renderProfileImage = (params: any) => {
  const user = params.row as UserDto;
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Image
        src={getUserProfileImage(user)}
        alt={user.fullName || "User"}
        className="rounded-circle"
        width={40}
        height={40}
        style={{
          objectFit: "cover",
          border: "2px solid #e0e0e0",
        }}
      />
    </div>
  );
};

/**
 * Kullanıcı adını render eder
 */
const renderFullName = (params: any) => {
  const user = params.row as UserDto;
  return (
    <div className="fw-medium text-truncate" title={user.fullName}>
      {user.fullName || "-"}
    </div>
  );
};

/**
 * Email adresini render eder
 */
const renderEmail = (params: any) => {
  const user = params.row as UserDto;
  return (
    <div className="text-truncate" title={user.email}>
      {user.email || "-"}
    </div>
  );
};

/**
 * Telefon numarasını render eder
 */
const renderPhone = (params: any) => {
  const user = params.row as UserDto;
  return (
    <div className="text-truncate" title={user.phone}>
      {user.phone || "-"}
    </div>
  );
};

/**
 * İletişim bilgilerini (telefon, email) render eder
 */
const renderContactInfo = (params: any) => {
  const user = params.row as UserDto;
  return (
    <div>
      <div className="fw-medium text-truncate" title={user.phone}>
        {user.phone || "-"}
      </div>
      <small className="text-muted d-block text-truncate" title={user.email}>
        {user.email || "-"}
      </small>
    </div>
  );
};

/**
 * Kullanıcı tipini render eder
 */
const renderUserType = (params: any) => {
  const user = params.row as UserDto;
  return (
    <div className="text-truncate">{getUserTypeDisplay(user.userType)}</div>
  );
};

/**
 * Kullanıcı durumunu (aktif/pasif) render eder
 */
const renderStatus = (params: any) => {
  const user = params.row as UserDto;
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Badge variant={user.isActive ? "success" : "danger"}>
        {user.isActive ? "Aktif" : "Pasif"}
      </Badge>
    </div>
  );
};

/**
 * Kullanıcı rollerini render eder
 */
const renderRoles = (params: any) => {
  const user = params.row as UserDto;
  const roles = user.roles || [];

  if (roles.length === 0) return <span className="text-muted">-</span>;

  return (
    <div className="d-flex flex-column gap-1">
      <div className="fw-medium text-truncate" title={roles[0]}>
        {roles[0]}
      </div>
      {roles.length > 1 && (
        <small className="text-info">+{roles.length - 1} rol daha</small>
      )}
    </div>
  );
};

/**
 * Marka ve kampüs bilgilerini render eder
 */
const renderInstitution = (params: any) => {
  const user = params.row as UserDto;
  const brandName = user.brand?.name;
  const campusName = user.campus?.name;

  return (
    <div className="overflow-hidden">
      {brandName && (
        <div className="fw-medium text-truncate" title={brandName}>
          {brandName}
        </div>
      )}
      {campusName && (
        <small className="text-muted d-block text-truncate" title={campusName}>
          {campusName}
        </small>
      )}
      {!brandName && !campusName && <span className="text-muted">-</span>}
    </div>
  );
};

/**
 * Doğrulama durumunu (email, telefon) render eder
 */
const renderVerification = (params: any) => {
  const user = params.row as UserDto;

  // Email doğrulama popover içeriği
  const emailVerificationContent = (
    <div style={{ minWidth: "180px" }}>
      <div className="d-flex align-items-center gap-2">
        <i
          className={`ph ${
            user.isEmailVerified
              ? "ph-envelope-simple text-success"
              : "ph-envelope-simple-slash text-danger"
          }`}
          style={{ fontSize: "16px" }}
        />
        <span
          className={
            user.isEmailVerified
              ? "text-success fw-medium"
              : "text-danger fw-medium"
          }
        >
          {user.isEmailVerified ? "E-posta Doğrulandı" : "E-posta Doğrulanmadı"}
        </span>
      </div>
      {user.email && (
        <small className="text-muted d-block mt-1">{user.email}</small>
      )}
    </div>
  );

  // Telefon doğrulama popover içeriği
  const phoneVerificationContent = (
    <div style={{ minWidth: "180px" }}>
      <div className="d-flex align-items-center gap-2">
        <i
          className={`ph ${
            user.isPhoneVerified
              ? "ph-phone text-success"
              : "ph-phone-slash text-danger"
          }`}
          style={{ fontSize: "16px" }}
        />
        <span
          className={
            user.isPhoneVerified
              ? "text-success fw-medium"
              : "text-danger fw-medium"
          }
        >
          {user.isPhoneVerified ? "Telefon Doğrulandı" : "Telefon Doğrulanmadı"}
        </span>
      </div>
      {user.phone && (
        <small className="text-muted d-block mt-1">{user.phone}</small>
      )}
    </div>
  );

  // Tam doğrulanmış popover içeriği
  const fullVerificationContent = (
    <div style={{ minWidth: "200px" }}>
      <div className="d-flex align-items-center gap-2 mb-2">
        <i
          className="ph-fill ph-shield-check text-success"
          style={{ fontSize: "16px" }}
        />
        <span className="text-success fw-medium">Tam Doğrulanmış Hesap</span>
      </div>
      <div className="text-muted small">
        E-posta ve telefon numarası doğrulanmış
      </div>
    </div>
  );

  return (
    <div className="d-flex justify-content-center align-items-center gap-3">
      {/* Email Doğrulama İkonu */}
      <Popover
        content={emailVerificationContent}
        placement="bottom"
        trigger="hover"
      >
        <div style={{ cursor: "pointer" }}>
          <i
            className={`ph ${
              user.isEmailVerified
                ? "ph-envelope-simple text-success"
                : "ph-envelope-simple-slash text-danger"
            }`}
            style={{ fontSize: "18px" }}
          />
        </div>
      </Popover>

      {/* Telefon Doğrulama İkonu */}
      <Popover
        content={phoneVerificationContent}
        placement="bottom"
        trigger="hover"
      >
        <div style={{ cursor: "pointer" }}>
          <i
            className={`ph ${
              user.isPhoneVerified
                ? "ph-phone text-success"
                : "ph-phone-slash text-danger"
            }`}
            style={{ fontSize: "18px" }}
          />
        </div>
      </Popover>

      {/* Tam Doğrulanmış İkonu */}
      {user.isEmailVerified && user.isPhoneVerified && (
        <Popover
          content={fullVerificationContent}
          placement="bottom"
          trigger="hover"
        >
          <div style={{ cursor: "pointer" }}>
            <i
              className="ph-fill ph-shield-check text-success"
              style={{ fontSize: "18px" }}
            />
          </div>
        </Popover>
      )}
    </div>
  );
};

/**
 * Son giriş tarihini render eder
 */
const renderLastLogin = (params: any) => {
  const user = params.row as UserDto;

  if (!user.lastLoginAt) {
    return <div className="text-muted text-center">Hiç giriş yapmamış</div>;
  }

  return (
    <div className="text-center">
      <div className="fw-medium">{formatDate(user.lastLoginAt)}</div>
      <small className="text-muted">{getTimeAgo(user.lastLoginAt)}</small>
    </div>
  );
};

/**
 * Aktivite seviyesini render eder
 */
const renderActivityLevel = (params: any) => {
  const user = params.row as UserDto;
  const activity = getActivityLevel(user.lastLoginAt);

  return (
    <div className="d-flex justify-content-center">
      <Badge variant={activity.variant} size="sm">
        {activity.label}
      </Badge>
    </div>
  );
};

/**
 * Kayıt tarihini render eder
 */
const renderCreatedAt = (params: any) => {
  const user = params.row as UserDto;

  if (!user.createdAt) {
    return <div className="text-muted text-center">-</div>;
  }

  return (
    <div className="text-center">
      <div className="fw-medium">{formatDate(user.createdAt)}</div>
      <small className="text-muted">{getTimeAgo(user.createdAt)}</small>
    </div>
  );
};

/**
 * Konum bilgilerini render eder
 */
const renderLocation = (params: any) => {
  const user = params.row as UserDto;
  const parts = [
    user.district?.name,
    user.province?.name,
    user.country?.name,
  ].filter(Boolean);

  if (parts.length === 0) {
    return <span className="text-muted">-</span>;
  }

  const location = parts.join(", ");
  return (
    <div className="text-truncate" title={location}>
      {location}
    </div>
  );
};

/**
 * Kurum erişim sayısını render eder
 */
const renderInstitutionAccess = (params: any) => {
  const user = params.row as UserDto;
  const accessCount = user.institutionAccess?.length || 0;

  if (accessCount === 0) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  return (
    <div className="text-center">
      <Badge variant="info">{accessCount} Kurum</Badge>
    </div>
  );
};

// ==================== COLUMN DEFINITIONS ====================

/**
 * UserDto'ya göre tablo kolonlarını oluşturur
 */
export const createUsersColumns = (): GridColDef<UserDto>[] => [
  // Profil Resmi
  {
    field: "profileImageUrl",
    headerName: "",
    width: 70,
    renderCell: renderProfileImage,
    sortable: false,
  },

  // Kullanıcı Adı
  {
    field: "fullName",
    headerName: "Ad Soyad",
    width: 200,
    renderCell: renderFullName,
    sortable: true,
  },

  // Email
  {
    field: "email",
    headerName: "E-posta",
    width: 220,
    renderCell: renderEmail,
    sortable: true,
  },

  // Telefon
  {
    field: "phone",
    headerName: "Telefon",
    width: 180,
    renderCell: renderPhone,
    sortable: true,
  },

  // Kullanıcı Tipi
  {
    field: "userType",
    headerName: "Kullanıcı Tipi",
    width: 180,
    renderCell: renderUserType,
    sortable: true,
  },

  // Durum
  {
    field: "isActive",
    headerName: "Durum",
    width: 110,
    renderCell: renderStatus,
    sortable: true,
  },

  // Roller
  {
    field: "roles",
    headerName: "Roller",
    width: 180,
    renderCell: renderRoles,
    sortable: false,
  },

  // Kurum Bilgileri
  {
    field: "brand",
    headerName: "Kurum",
    width: 250,
    renderCell: renderInstitution,
    sortable: false,
  },

  // Kurum Erişimleri
  {
    field: "institutionAccess",
    headerName: "Erişim",
    width: 100,
    renderCell: renderInstitutionAccess,
    sortable: false,
  },

  // Doğrulama Durumu
  {
    field: "isEmailVerified",
    headerName: "Doğrulama",
    width: 150,
    renderCell: renderVerification,
    sortable: false,
  },

  // Son Giriş
  {
    field: "lastLoginAt",
    headerName: "Son Giriş",
    width: 160,
    renderCell: renderLastLogin,
    sortable: true,
  },

  // Aktivite Seviyesi
  {
    field: "activity",
    headerName: "Aktivite",
    width: 150,
    renderCell: renderActivityLevel,
    sortable: false,
  },

  // Konum
  {
    field: "location",
    headerName: "Konum",
    width: 250,
    renderCell: renderLocation,
    sortable: false,
  },

  // Kayıt Tarihi
  {
    field: "createdAt",
    headerName: "Kayıt Tarihi",
    width: 150,
    renderCell: renderCreatedAt,
    sortable: true,
  },
];
