import { UserListDto } from "@/types/dto/user/UserListDto";

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
  onViewDetails?: (user: UserListDto) => void;
  onEdit?: (user: UserListDto) => void;
  onToggleStatus?: (user: UserListDto) => void;
  onDelete?: (user: UserListDto) => void;
  onResetPassword?: (user: UserListDto) => void;
  onViewProfile?: (user: UserListDto) => void;
  onSendInvitation?: (user: UserListDto) => void;
  onManageRoles?: (user: UserListDto) => void;
}

// Users action buttons props
export interface UsersActionButtonsProps {
  user: UserListDto;
  onViewDetails?: (user: UserListDto) => void;
  onEdit?: (user: UserListDto) => void;
  onToggleStatus?: (user: UserListDto) => void;
  onDelete?: (user: UserListDto) => void;
  onResetPassword?: (user: UserListDto) => void;
  onViewProfile?: (user: UserListDto) => void;
  onSendInvitation?: (user: UserListDto) => void;
  onManageRoles?: (user: UserListDto) => void;
}

// Users table props
export interface UsersTableProps {
  users?: UserListDto[];
  loading?: boolean;
}

// Users context type
export interface UsersContextType {
  users: UserListDto[];
  loading: boolean;
  selectedUser: UserListDto | null;
  setSelectedUser: (user: UserListDto | null) => void;
  refreshUsers: () => void;
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
