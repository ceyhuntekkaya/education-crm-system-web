import { UserDto } from "@/types";

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
  onViewDetails?: (user: UserDto) => void;
  onEdit?: (user: UserDto) => void;
  onToggleStatus?: (user: UserDto) => void;
  onDelete?: (user: UserDto) => void;
  onResetPassword?: (user: UserDto) => void;
  onViewProfile?: (user: UserDto) => void;
  onSendInvitation?: (user: UserDto) => void;
  onManageRoles?: (user: UserDto) => void;
}

// Users action buttons props
export interface UsersActionButtonsProps {
  user: UserDto;
  onViewDetails?: (user: UserDto) => void;
  onEdit?: (user: UserDto) => void;
  onToggleStatus?: (user: UserDto) => void;
  onDelete?: (user: UserDto) => void;
  onResetPassword?: (user: UserDto) => void;
  onViewProfile?: (user: UserDto) => void;
  onSendInvitation?: (user: UserDto) => void;
  onManageRoles?: (user: UserDto) => void;
}

// Users table props
export interface UsersTableProps {
  users?: UserDto[];
  loading?: boolean;
}

// Users context type
export interface UsersContextType {
  users: UserDto[];
  loading: boolean;
  error: string | null;
  selectedUser: UserDto | null;
  setSelectedUser: (user: UserDto | null) => void;
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
