import { GridColDef } from "@/components/ui/data-grid";
import { UserDto } from "@/types";
import CustomImage from "@/components/ui/custom-image";
import { Badge } from "@/components";

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

// ==================== RENDER FUNCTIONS ====================

/**
 * Profil resmini render eder
 */
const renderProfileImage = (params: any) => {
  const user = params.row as UserDto;
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <CustomImage
        src={user.profileImageUrl}
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

// ==================== COLUMN DEFINITIONS ====================

/**
 * UserDto'ya göre tablo kolonlarını oluşturur
 * Backend'den dönen basitleştirilmiş veri yapısına göre düzenlenmiştir
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
];
