import * as yup from "yup";

export const postFilterValidationSchema = yup.object().shape({
  query: yup.string().max(100, "Arama terimi en fazla 100 karakter olabilir"),
  postType: yup
    .string()
    .oneOf([
      "TEXT",
      "IMAGE",
      "VIDEO",
      "GALLERY",
      "LINK",
      "EVENT",
      "ANNOUNCEMENT",
      "NEWS",
      "ACHIEVEMENT",
      "CELEBRATION",
      "POLL",
      "QUOTE",
      "TESTIMONIAL",
      "BEHIND_SCENES",
      "LIVE_STREAM",
    ]),
  status: yup
    .string()
    .oneOf([
      "DRAFT",
      "SCHEDULED",
      "PUBLISHED",
      "ARCHIVED",
      "DELETED",
      "MODERATION",
      "REJECTED",
      "EXPIRED",
    ]),
  authorName: yup.string().max(50, "Yazar adı en fazla 50 karakter olabilir"),
  schoolName: yup.string().max(100, "Okul adı en fazla 100 karakter olabilir"),
  isFeatured: yup.boolean(),
  isPinned: yup.boolean(),
  publishedAfter: yup.date(),
  publishedBefore: yup.date(),
  tags: yup.array().of(yup.string()),
  hashtags: yup.array().of(yup.string()),
  sortBy: yup
    .string()
    .oneOf([
      "publishedAt",
      "likeCount",
      "viewCount",
      "commentCount",
      "shareCount",
      "engagementScore",
    ]),
  sortOrder: yup.string().oneOf(["asc", "desc"]),
  page: yup.number().min(1),
  size: yup.number().min(1).max(100),
});
