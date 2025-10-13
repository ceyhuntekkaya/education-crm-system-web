import { UserListDto } from "@/types/dto/user/UserListDto";
import { BadgeVariant, UsersStats } from "../types";

// Status badge variant mapping
export const getStatusBadgeVariant = (isActive: boolean): BadgeVariant => {
  return isActive ? "success" : "secondary";
};

// User type display mapping
export const getUserTypeDisplay = (userType: string): string => {
  const typeMap: Record<string, string> = {
    INSTITUTION_USER: "Kurum Kullanıcısı",
    PARENT: "Veli",
  };
  return typeMap[userType] || userType;
};

// Role level display mapping
export const getRoleLevelDisplay = (roleLevel: string): string => {
  const levelMap: Record<string, string> = {
    SYSTEM: "Sistem",
    BRAND: "Marka",
    CAMPUS: "Kampüs",
    SCHOOL: "Okul",
  };
  return levelMap[roleLevel] || roleLevel;
};

// Format last login time
export const formatLastLogin = (lastLoginAt: string | undefined): string => {
  if (!lastLoginAt) return "Hiç giriş yapmamış";
  
  const now = new Date();
  const loginDate = new Date(lastLoginAt);
  const diffInSeconds = Math.floor((now.getTime() - loginDate.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "Az önce";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} gün önce`;
  
  return loginDate.toLocaleDateString("tr-TR");
};

// Format numbers with thousand separators
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("tr-TR").format(num);
};

// Calculate user statistics
export const calculateUserStats = (users: UserListDto[]): UsersStats => {
  const stats: UsersStats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    institutionUsers: users.filter(u => u.userType === "INSTITUTION_USER").length,
    parentUsers: users.filter(u => u.userType === "PARENT").length,
    verifiedEmailUsers: users.filter(u => u.isEmailVerified).length,
    verifiedPhoneUsers: users.filter(u => u.isPhoneVerified).length,
    recentLogins: users.filter(u => {
      if (!u.lastLoginAt) return false;
      const loginDate = new Date(u.lastLoginAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return loginDate > weekAgo;
    }).length,
  };
  
  return stats;
};

// Get user status display
export const getUserStatusDisplay = (isActive: boolean): string => {
  return isActive ? "Aktif" : "Pasif";
};

// Get verification status display
export const getVerificationStatusDisplay = (user: UserListDto): string => {
  const emailVerified = user.isEmailVerified ? "E-posta ✓" : "E-posta ✗";
  const phoneVerified = user.isPhoneVerified ? "Telefon ✓" : "Telefon ✗";
  return `${emailVerified}, ${phoneVerified}`;
};

// Check if user is fully verified
export const isUserFullyVerified = (user: UserListDto): boolean => {
  return user.isEmailVerified === true && user.isPhoneVerified === true;
};

// Get user activity level based on last login
export const getUserActivityLevel = (lastLoginAt: string | undefined): { level: string; variant: BadgeVariant } => {
  if (!lastLoginAt) return { level: "Hiç Giriş Yapmamış", variant: "danger" };
  
  const now = new Date();
  const loginDate = new Date(lastLoginAt);
  const diffInDays = Math.floor((now.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return { level: "Bugün Aktif", variant: "success" };
  if (diffInDays <= 3) return { level: "Son 3 Gün", variant: "info" };
  if (diffInDays <= 7) return { level: "Son Hafta", variant: "warning" };
  if (diffInDays <= 30) return { level: "Son Ay", variant: "secondary" };
  
  return { level: "Uzun Süredir Pasif", variant: "danger" };
};

// Get user role display with level
export const getUserRoleWithLevel = (user: UserListDto): string => {
  const role = user.primaryRole || "Belirtilmemiş";
  const level = getRoleLevelDisplay(user.primaryRoleLevel || "");
  return level ? `${role} (${level})` : role;
};

// Check if user has multiple institution access
export const hasMultipleInstitutionAccess = (user: UserListDto): boolean => {
  return (user.institutionAccessCount || 0) > 1;
};

// Get user profile image or default
export const getUserProfileImage = (user: UserListDto): string => {
  return user.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'User')}&background=random`;
};

// Sort users by different criteria
export const sortUsers = (
  users: UserListDto[],
  sortBy: "fullName" | "email" | "createdAt" | "lastLoginAt" | "primaryRole",
  order: "asc" | "desc" = "desc"
): UserListDto[] => {
  return [...users].sort((a, b) => {
    let aValue: any;
    let bValue: any;
    
    switch (sortBy) {
      case "fullName":
        aValue = a.fullName?.toLowerCase() || "";
        bValue = b.fullName?.toLowerCase() || "";
        break;
      case "email":
        aValue = a.email?.toLowerCase() || "";
        bValue = b.email?.toLowerCase() || "";
        break;
      case "createdAt":
        aValue = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        bValue = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        break;
      case "lastLoginAt":
        aValue = a.lastLoginAt ? new Date(a.lastLoginAt).getTime() : 0;
        bValue = b.lastLoginAt ? new Date(b.lastLoginAt).getTime() : 0;
        break;
      case "primaryRole":
        aValue = a.primaryRole?.toLowerCase() || "";
        bValue = b.primaryRole?.toLowerCase() || "";
        break;
      default:
        return 0;
    }
    
    if (order === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });
};

// Get time ago display
export const getTimeAgo = (date: string): string => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "Az önce";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} gün önce`;
  
  return targetDate.toLocaleDateString("tr-TR");
};
