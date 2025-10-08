import { UserListDto } from "@/types/dto/user/UserListDto";
import { 
  getStatusBadgeVariant,
  getUserTypeDisplay,
  getRoleLevelDisplay,
  formatLastLogin,
  calculateUserStats
} from "../utils/users-utils";

// Mock Users Data - Based on UserListDto
export const mockUsers: UserListDto[] = [
  {
    id: 1,
    email: "admin@bahcesehir.edu.tr",
    phone: "+90 532 123 4567",
    fullName: "Ahmet Yılmaz",
    userType: "INSTITUTION_USER",
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    lastLoginAt: "2024-03-21T14:30:00Z",
    createdAt: "2024-01-15T09:00:00Z",
    profileImageUrl: "https://picsum.photos/100/100?random=1",
    primaryRole: "Sistem Yöneticisi",
    primaryRoleLevel: "SYSTEM",
    institutionAccessCount: 5,
    primaryInstitution: "Bahçeşehir Koleji Beşiktaş",
  },
  {
    id: 2,
    email: "director@itu.edu.tr",
    phone: "+90 533 234 5678",
    fullName: "Fatma Özkan",
    userType: "INSTITUTION_USER",
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: false,
    lastLoginAt: "2024-03-21T10:15:00Z",
    createdAt: "2024-01-20T11:30:00Z",
    profileImageUrl: "https://picsum.photos/100/100?random=2",
    primaryRole: "Okul Müdürü",
    primaryRoleLevel: "SCHOOL",
    institutionAccessCount: 1,
    primaryInstitution: "İstanbul Teknik Üniversitesi",
  },
  {
    id: 3,
    email: "mehmet.kaya@parent.com",
    phone: "+90 534 345 6789",
    fullName: "Mehmet Kaya",
    userType: "PARENT",
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    lastLoginAt: "2024-03-20T16:45:00Z",
    createdAt: "2024-02-10T14:20:00Z",
    profileImageUrl: "https://picsum.photos/100/100?random=3",
    primaryRole: "Veli",
    primaryRoleLevel: "SCHOOL",
    institutionAccessCount: 2,
    primaryInstitution: "Boğaziçi Üniversitesi",
  },
  {
    id: 4,
    email: "coordinator@gazi.edu.tr",
    phone: "+90 535 456 7890",
    fullName: "Ayşe Demir",
    userType: "INSTITUTION_USER",
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    lastLoginAt: "2024-03-21T08:20:00Z",
    createdAt: "2024-01-25T10:15:00Z",
    profileImageUrl: "https://picsum.photos/100/100?random=4",
    primaryRole: "Eğitim Koordinatörü",
    primaryRoleLevel: "CAMPUS",
    institutionAccessCount: 3,
    primaryInstitution: "Gazi Üniversitesi",
  },
  {
    id: 5,
    email: "ali.veli@parent.com",
    phone: "+90 536 567 8901",
    fullName: "Ali Veli",
    userType: "PARENT",
    isActive: false,
    isEmailVerified: false,
    isPhoneVerified: false,
    lastLoginAt: "2024-03-15T12:30:00Z",
    createdAt: "2024-03-01T16:45:00Z",
    profileImageUrl: null,
    primaryRole: "Veli",
    primaryRoleLevel: "SCHOOL",
    institutionAccessCount: 1,
    primaryInstitution: "ODTÜ",
  },
  {
    id: 6,
    email: "secretary@bilkent.edu.tr",
    phone: "+90 537 678 9012",
    fullName: "Zeynep Aktaş",
    userType: "INSTITUTION_USER",
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    lastLoginAt: "2024-03-21T13:10:00Z",
    createdAt: "2024-02-05T09:30:00Z",
    profileImageUrl: "https://picsum.photos/100/100?random=6",
    primaryRole: "Sekreter",
    primaryRoleLevel: "SCHOOL",
    institutionAccessCount: 1,
    primaryInstitution: "Bilkent Üniversitesi",
  },
  {
    id: 7,
    email: "brand.manager@mef.edu.tr",
    phone: "+90 538 789 0123",
    fullName: "Can Özgür",
    userType: "INSTITUTION_USER",
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    lastLoginAt: "2024-03-20T17:25:00Z",
    createdAt: "2024-01-10T08:45:00Z",
    profileImageUrl: "https://picsum.photos/100/100?random=7",
    primaryRole: "Marka Yöneticisi",
    primaryRoleLevel: "BRAND",
    institutionAccessCount: 8,
    primaryInstitution: "MEF Okulları",
  },
  {
    id: 8,
    email: "parent.selin@gmail.com",
    phone: "+90 539 890 1234",
    fullName: "Selin Yıldız",
    userType: "PARENT",
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: false,
    lastLoginAt: "2024-03-19T20:15:00Z",
    createdAt: "2024-02-20T15:10:00Z",
    profileImageUrl: "https://picsum.photos/100/100?random=8",
    primaryRole: "Veli",
    primaryRoleLevel: "SCHOOL",
    institutionAccessCount: 1,
    primaryInstitution: "Koç Üniversitesi",
  },
  {
    id: 9,
    email: "teacher@sabanci.edu.tr",
    phone: "+90 540 901 2345",
    fullName: "Emre Çelik",
    userType: "INSTITUTION_USER",
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    lastLoginAt: "2024-03-21T11:40:00Z",
    createdAt: "2024-01-30T13:20:00Z",
    profileImageUrl: "https://picsum.photos/100/100?random=9",
    primaryRole: "Öğretmen",
    primaryRoleLevel: "SCHOOL",
    institutionAccessCount: 1,
    primaryInstitution: "Sabancı Üniversitesi",
  },
  {
    id: 10,
    email: "campus.admin@hacettepe.edu.tr",
    phone: "+90 541 012 3456",
    fullName: "Deniz Kara",
    userType: "INSTITUTION_USER",
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    lastLoginAt: "2024-03-21T09:55:00Z",
    createdAt: "2024-01-18T12:00:00Z",
    profileImageUrl: "https://picsum.photos/100/100?random=10",
    primaryRole: "Kampüs Yöneticisi",
    primaryRoleLevel: "CAMPUS",
    institutionAccessCount: 2,
    primaryInstitution: "Hacettepe Üniversitesi",
  },
  {
    id: 11,
    email: "parent.burak@hotmail.com",
    phone: "+90 542 123 4567",
    fullName: "Burak Şahin",
    userType: "PARENT",
    isActive: true,
    isEmailVerified: false,
    isPhoneVerified: true,
    lastLoginAt: "2024-03-18T14:20:00Z",
    createdAt: "2024-02-28T10:30:00Z",
    profileImageUrl: null,
    primaryRole: "Veli",
    primaryRoleLevel: "SCHOOL",
    institutionAccessCount: 1,
    primaryInstitution: "İTÜ",
  },
  {
    id: 12,
    email: "hr@bilfen.edu.tr",
    phone: "+90 543 234 5678",
    fullName: "Gül Arslan",
    userType: "INSTITUTION_USER",
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    lastLoginAt: "2024-03-21T15:30:00Z",
    createdAt: "2024-01-12T14:45:00Z",
    profileImageUrl: "https://picsum.photos/100/100?random=12",
    primaryRole: "İnsan Kaynakları",
    primaryRoleLevel: "SCHOOL",
    institutionAccessCount: 1,
    primaryInstitution: "Bilfen Koleji",
  },
  {
    id: 13,
    email: "inactive.user@test.com",
    phone: "+90 544 345 6789",
    fullName: "Pasif Kullanıcı",
    userType: "INSTITUTION_USER",
    isActive: false,
    isEmailVerified: false,
    isPhoneVerified: false,
    lastLoginAt: "2024-02-15T10:00:00Z",
    createdAt: "2024-01-05T09:00:00Z",
    profileImageUrl: null,
    primaryRole: "Test Kullanıcısı",
    primaryRoleLevel: "SCHOOL",
    institutionAccessCount: 0,
    primaryInstitution: "Test Okulu",
  },
  {
    id: 14,
    email: "finance@ankara.edu.tr",
    phone: "+90 545 456 7890",
    fullName: "Murat Güneş",
    userType: "INSTITUTION_USER",
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    lastLoginAt: "2024-03-20T12:45:00Z",
    createdAt: "2024-02-01T11:15:00Z",
    profileImageUrl: "https://picsum.photos/100/100?random=14",
    primaryRole: "Mali İşler",
    primaryRoleLevel: "SCHOOL",
    institutionAccessCount: 1,
    primaryInstitution: "Ankara Üniversitesi",
  },
  {
    id: 15,
    email: "parent.aylin@yahoo.com",
    phone: "+90 546 567 8901",
    fullName: "Aylin Doğan",
    userType: "PARENT",
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    lastLoginAt: "2024-03-21T18:20:00Z",
    createdAt: "2024-03-05T16:30:00Z",
    profileImageUrl: "https://picsum.photos/100/100?random=15",
    primaryRole: "Veli",
    primaryRoleLevel: "SCHOOL",
    institutionAccessCount: 1,
    primaryInstitution: "Yıldız Teknik Üniversitesi",
  },
];

// Utility functions for working with mock data
export const getUsersByType = (userType: string): UserListDto[] => {
  return mockUsers.filter(user => user.userType === userType);
};

export const getUsersByRoleLevel = (roleLevel: string): UserListDto[] => {
  return mockUsers.filter(user => user.primaryRoleLevel === roleLevel);
};

export const getActiveUsers = (): UserListDto[] => {
  return mockUsers.filter(user => user.isActive);
};

export const getVerifiedUsers = (): UserListDto[] => {
  return mockUsers.filter(user => user.isEmailVerified && user.isPhoneVerified);
};

export const getRecentlyActiveUsers = (days: number = 7): UserListDto[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return mockUsers.filter(user => {
    if (!user.lastLoginAt) return false;
    return new Date(user.lastLoginAt) > cutoffDate;
  });
};

export const getUsersByInstitution = (institution: string): UserListDto[] => {
  return mockUsers.filter(user => 
    user.primaryInstitution?.toLowerCase().includes(institution.toLowerCase())
  );
};

export const getUserById = (id: number): UserListDto | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getInstitutionUsers = (): UserListDto[] => {
  return mockUsers.filter(user => user.userType === "INSTITUTION_USER");
};

export const getParentUsers = (): UserListDto[] => {
  return mockUsers.filter(user => user.userType === "PARENT");
};

export const getUsersWithMultipleAccess = (): UserListDto[] => {
  return mockUsers.filter(user => (user.institutionAccessCount || 0) > 1);
};

// Re-export utility functions that work with mock data
export {
  getStatusBadgeVariant,
  getUserTypeDisplay,
  getRoleLevelDisplay,
  formatLastLogin,
  calculateUserStats
};
