import type { EventOrganizerDto } from "@/types";

/**
 * API'den gelen EventOrganizerDto verisini form verilerine dönüştürür
 */
export const transformOrganizerToFormData = (
  organizer: EventOrganizerDto | null,
): Record<string, any> | null => {
  if (!organizer) return null;

  return {
    name: organizer.name || "",
    type: organizer.type || "",
    description: organizer.description || "",
    logoUrl: organizer.logoUrl || "",
    website: organizer.website || "",
    email: organizer.email || "",
    phone: organizer.phone || "",
    address: organizer.address || "",
    city: organizer.city || "",
    socialMediaLinks: organizer.socialMediaLinks || "",
    isVerified: organizer.isVerified ?? false,
    isActive: organizer.isActive ?? true,
    slug: organizer.slug || "",
  };
};
