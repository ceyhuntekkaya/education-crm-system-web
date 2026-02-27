import { TeacherProfileDto } from "@/types";

/**
 * API'den gelen Teacher Profile verisini form verilerine dönüştürür
 * @param profile API'den gelen profil verisi
 * @returns Form için hazırlanmış veri
 */
export const transformProfileToFormData = (
  profile: TeacherProfileDto | null,
): any => {
  if (!profile) return null;

  const result = {
    fullName: profile.fullName || "",
    email: profile.email || "",
    phone: profile.phone || "",
    city: profile.city || "",
    branch: profile.branch || "",
    // educationLevel ve experienceYears backend'de TeacherProfileDto'da YOK
    // Eğitim bilgileri 'educations' array'inden, deneyim 'experiences' array'inden gelir
    bio: profile.bio || "",
    profilePhotoUrl: profile.profilePhotoUrl || "",
    videoUrl: profile.videoUrl || "",
    cvUrl: profile.cvUrl || "",
    isActive: profile.isActive ?? true,
    provinceIds: profile.provinces?.map((p) => String(p.id)) || [],
  };

  return result;
};
