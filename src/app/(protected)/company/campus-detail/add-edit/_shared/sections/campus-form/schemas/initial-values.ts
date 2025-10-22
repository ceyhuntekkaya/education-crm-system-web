import { CampusFormData } from "../types/form-data";

export const initialValues: CampusFormData = {
  brandId: "",
  name: "",
  description: "",
  logoUrl: "",
  coverImageUrl: "",
  email: "",
  phone: "",
  fax: "",
  websiteUrl: "",

  // Address
  addressLine1: "",
  addressLine2: "",
  postalCode: "",
  latitude: undefined,
  longitude: undefined,

  // Location - Form için ID'ler
  countryId: "",
  provinceId: "",
  districtId: "",
  neighborhoodId: "",

  // Social Media
  facebookUrl: "",
  twitterUrl: "",
  instagramUrl: "",
  linkedinUrl: "",
  youtubeUrl: "",

  // SEO
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",

  establishedYear: undefined,
};
