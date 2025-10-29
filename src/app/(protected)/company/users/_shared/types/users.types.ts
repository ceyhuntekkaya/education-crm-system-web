import { UserListDto, UserProfileDto } from "@/types";

// Badge variant type
export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

// Users column handlers
export interface UsersColumnHandlers {
  onViewDetails?: (user: UserListDto | UserProfileDto) => void;
  onEdit?: (user: UserListDto | UserProfileDto) => void;
  onToggleStatus?: (user: UserListDto | UserProfileDto) => void;
  onDelete?: (user: UserListDto | UserProfileDto) => void;
  onResetPassword?: (user: UserListDto | UserProfileDto) => void;
  onViewProfile?: (user: UserListDto | UserProfileDto) => void;
  onSendInvitation?: (user: UserListDto | UserProfileDto) => void;
  onManageRoles?: (user: UserListDto | UserProfileDto) => void;
}

// Users action buttons props
export interface UsersActionButtonsProps {
  user: UserListDto | UserProfileDto;
  onViewDetails?: (user: UserListDto | UserProfileDto) => void;
  onEdit?: (user: UserListDto | UserProfileDto) => void;
  onToggleStatus?: (user: UserListDto | UserProfileDto) => void;
  onDelete?: (user: UserListDto | UserProfileDto) => void;
  onResetPassword?: (user: UserListDto | UserProfileDto) => void;
  onViewProfile?: (user: UserListDto | UserProfileDto) => void;
  onSendInvitation?: (user: UserListDto | UserProfileDto) => void;
  onManageRoles?: (user: UserListDto | UserProfileDto) => void;
}

// Users table props
export interface UsersTableProps {
  users?: (UserListDto | UserProfileDto)[];
  loading?: boolean;
}

// Users context type
export interface UsersContextType {
  users: (UserListDto | UserProfileDto)[];
  loading: boolean;
  error: string | null;
  selectedUser: UserListDto | UserProfileDto | null;
  setSelectedUser: (user: UserListDto | UserProfileDto | null) => void;
  refetchUsers: () => void;
}

// Users stats type
export interface UsersStats {
  totalUsers: number;
  activeUsers: number;
  institutionUsers: number;
  parentUsers: number;
  verifiedEmailUsers: number;
  verifiedPhoneUsers: number;
  recentLogins: number;
}
