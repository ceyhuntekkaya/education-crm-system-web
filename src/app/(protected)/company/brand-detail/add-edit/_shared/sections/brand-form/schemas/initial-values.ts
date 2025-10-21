import { BrandFormData } from "../types/form-data";

export const initialValues: BrandFormData = {
  name: "",
  description: "",
  logoUrl: "",
  coverImageUrl: "",
  websiteUrl: "",
  email: "",
  phone: "",
  foundedYear: undefined,

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
};
