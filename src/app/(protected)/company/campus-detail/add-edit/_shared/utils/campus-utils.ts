import { CampusFormData } from "../sections/campus-form/types/form-data";

/**
 * Campus DTO'dan form data'ya dönüşüm yapar
 * API'den gelen location objeleri hem ID olarak hem de obje olarak set edilir
 * @param campus Campus DTO objesi
 * @returns Form data objesi
 */
export const campusDtoToFormData = (campus: any): Partial<CampusFormData> => {
  return {
    brandId: campus?.brand?.id?.toString() || campus?.brandId?.toString() || "",
    name: campus?.name || "",
    description: campus?.description || "",
    logoUrl: campus?.logoUrl || "",
    coverImageUrl: campus?.coverImageUrl || "",
    email: campus?.email || "",
    phone: campus?.phone || "",
    fax: campus?.fax || "",
    websiteUrl: campus?.websiteUrl || "",

    // Address
    addressLine1: campus?.addressLine1 || "",
    addressLine2: campus?.addressLine2 || "",
    postalCode: campus?.postalCode || "",
    latitude: campus?.latitude,
    longitude: campus?.longitude,

    // Location - Sadece ID'leri set et
    countryId: campus?.country?.id?.toString() || "",
    provinceId: campus?.province?.id?.toString() || "",
    districtId: campus?.district?.id?.toString() || "",

    // Social Media
    facebookUrl: campus?.facebookUrl || "",
    twitterUrl: campus?.twitterUrl || "",
    instagramUrl: campus?.instagramUrl || "",
    linkedinUrl: campus?.linkedinUrl || "",
    youtubeUrl: campus?.youtubeUrl || "",

    // SEO
    metaTitle: campus?.metaTitle || "",
    metaDescription: campus?.metaDescription || "",
    metaKeywords: campus?.metaKeywords || "",

    establishedYear: campus?.establishedYear,
  };
};
