import type { TeacherProfileDto } from "@/types";
import type { BadgeProps } from "@/components";

/**
 * Profil durumuna göre badge variant döndürür
 */
export const getProfileStatusBadgeVariant = (
  isActive: boolean,
): BadgeProps["variant"] => {
  return isActive ? "success" : "secondary";
};

/**
 * Profil durumu görüntüleme metni
 */
export const getProfileStatusDisplay = (isActive: boolean): string => {
  return isActive ? "Aktif" : "Pasif";
};

/**
 * Eğitim seviyesi görüntüleme
 */
export const getEducationLevelDisplay = (level?: string): string => {
  if (!level) return "-";

  const levels: Record<string, string> = {
    HIGH_SCHOOL: "Lise",
    ASSOCIATE: "Ön Lisans",
    BACHELORS: "Lisans",
    MASTERS: "Yüksek Lisans",
    DOCTORATE: "Doktora",
  };

  return levels[level] || level;
};

/**
 * Profil foto URL'i kontrolü
 */
export const getProfilePhotoUrl = (profile: TeacherProfileDto): string => {
  return profile.profilePhotoUrl || "/assets/images/default-avatar.png";
};

/**
 * Tam isim formatla
 */
export const formatFullName = (profile: TeacherProfileDto): string => {
  return profile.fullName || "İsimsiz Profil";
};

/**
 * Tecrübe yılı formatla
 */
export const formatExperienceYears = (years?: number): string => {
  if (!years) return "Belirtilmemiş";
  return `${years} yıl`;
};
