import { GridColDef } from "@/components/ui/data-grid";
import { UserListDto } from "@/types/dto/user/UserListDto";
import { formatDate } from "@/utils";
import Image from "next/image";
import {
  getStatusBadgeVariant,
  getUserTypeDisplay,
  getRoleLevelDisplay,
  formatLastLogin,
  getUserActivityLevel,
  getUserProfileImage,
  isUserFullyVerified,
  hasMultipleInstitutionAccess,
  getTimeAgo,
} from "../utils";
import { Badge } from "@/components";

// Column render helper functions
const renderUserInfo = (params: any) => (
  <div className="d-flex align-items-center">
    <div className="me-3">
      <Image
        src={getUserProfileImage(params.row)}
        alt={params.row.fullName}
        className="rounded-circle"
        width={40}
        height={40}
        style={{
          objectFit: "cover",
        }}
      />
    </div>
    <div className="overflow-hidden">
      <div className="fw-medium text-truncate" title={params.row.fullName}>
        {params.row.fullName || "-"}
      </div>
      <small
        className="text-muted d-block text-truncate"
        title={params.row.email}
      >
        {params.row.email || "-"}
      </small>
    </div>
  </div>
);

const renderContactInfo = (params: any) => (
  <div>
    <div className="fw-medium text-truncate" title={params.row.phone}>
      {params.row.phone || "-"}
    </div>
    <small
      className="text-muted d-block text-truncate"
      title={params.row.email}
    >
      {params.row.email || "-"}
    </small>
  </div>
);

const renderUserType = (params: any) => (
  <div className="text-truncate">{getUserTypeDisplay(params.row.userType)}</div>
);

const renderStatus = (params: any) => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <Badge variant={getStatusBadgeVariant(params.row.isActive)}>
      {params.row.isActive ? "Aktif" : "Pasif"}
    </Badge>
  </div>
);

const renderRoleInfo = (params: any) => (
  <div>
    <div className="fw-medium text-truncate" title={params.row.primaryRole}>
      {params.row.primaryRole || "-"}
    </div>
    {params.row.primaryRoleLevel && (
      <small className="text-muted d-block">
        {getRoleLevelDisplay(params.row.primaryRoleLevel)}
      </small>
    )}
  </div>
);

const renderInstitution = (params: any) => (
  <div>
    <div
      className="fw-medium text-truncate"
      title={params.row.primaryInstitution}
    >
      {params.row.primaryInstitution || "-"}
    </div>
    {hasMultipleInstitutionAccess(params.row) && (
      <small className="text-info d-block">
        +{(params.row.institutionAccessCount || 1) - 1} kurum daha
      </small>
    )}
  </div>
);

const renderVerificationStatus = (params: any) => (
  <div className="d-flex justify-content-center gap-1">
    <div
      title={
        params.row.isEmailVerified
          ? "E-posta Doğrulandı"
          : "E-posta Doğrulanmadı"
      }
    >
      <i
        className={`ph ${
          params.row.isEmailVerified
            ? "ph-envelope-simple text-success"
            : "ph-envelope-simple-slash text-danger"
        }`}
        style={{ fontSize: "14px" }}
      />
    </div>
    <div
      title={
        params.row.isPhoneVerified
          ? "Telefon Doğrulandı"
          : "Telefon Doğrulanmadı"
      }
    >
      <i
        className={`ph ${
          params.row.isPhoneVerified
            ? "ph-phone text-success"
            : "ph-phone-slash text-danger"
        }`}
        style={{ fontSize: "14px" }}
      />
    </div>
    {isUserFullyVerified(params.row) && (
      <div title="Tam Doğrulanmış">
        <i
          className="ph-fill ph-shield-check text-success"
          style={{ fontSize: "14px" }}
        />
      </div>
    )}
  </div>
);

const renderLastLogin = (params: any) => (
  <div className="text-center">
    {params.row.lastLoginAt ? (
      <>
        <div className="fw-medium">{formatDate(params.row.lastLoginAt)}</div>
        <small className="text-muted">
          {formatLastLogin(params.row.lastLoginAt)}
        </small>
      </>
    ) : (
      <div className="text-muted">Hiç giriş yapmamış</div>
    )}
  </div>
);

const renderActivityLevel = (params: any) => {
  const activity = getUserActivityLevel(params.row.lastLoginAt);
  return (
    <div className="d-flex justify-content-center">
      <Badge variant={activity.variant} size="sm">
        {activity.level}
      </Badge>
    </div>
  );
};

const renderCreatedAt = (params: any) => (
  <div className="text-center">
    {params.row.createdAt ? (
      <>
        <div className="fw-medium">{formatDate(params.row.createdAt)}</div>
        <small className="text-muted">{getTimeAgo(params.row.createdAt)}</small>
      </>
    ) : (
      <div className="text-muted">-</div>
    )}
  </div>
);

// Main column definitions
export const createUsersColumns = (): GridColDef<UserListDto>[] => [
  // Basic Information Columns
  {
    field: "fullName",
    headerName: "Kullanıcı Bilgileri",
    width: 250,
    renderCell: renderUserInfo,
  },
  {
    field: "userType",
    headerName: "Tür",
    width: 140,
    renderCell: renderUserType,
  },
  {
    field: "isActive",
    headerName: "Durum",
    width: 100,
    renderCell: renderStatus,
  },
  {
    field: "primaryRole",
    headerName: "Rol",
    width: 180,
    renderCell: renderRoleInfo,
  },
  {
    field: "primaryInstitution",
    headerName: "Kurum",
    width: 200,
    renderCell: renderInstitution,
  },

  // Verification & Activity Columns
  {
    field: "verification",
    headerName: "Doğrulama",
    width: 100,
    renderCell: renderVerificationStatus,
  },
  {
    field: "lastLoginAt",
    headerName: "Son Giriş",
    width: 140,
    renderCell: renderLastLogin,
  },
  {
    field: "activity",
    headerName: "Aktivite",
    width: 120,
    renderCell: renderActivityLevel,
  },
  {
    field: "createdAt",
    headerName: "Kayıt Tarihi",
    width: 130,
    renderCell: renderCreatedAt,
  },
  //   {
  //     field: "actions",
  //     headerName: "",
  //     width: 120,
  //     sortable: false,
  //     renderCell: (params) => renderActionButtons(params, handlers),
  //   },
];
