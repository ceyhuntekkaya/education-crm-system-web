import type { EventDto } from "@/types";

/**
 * API'den gelen EventDto verisini form verilerine dönüştürür
 */
export const transformEventToFormData = (
  event: EventDto | null,
): Record<string, any> | null => {
  if (!event) return null;

  return {
    organizerId: event.organizerId ? String(event.organizerId) : "",
    title: event.title || "",
    description: event.description || "",
    eventType: event.eventType || "",
    deliveryFormat: event.deliveryFormat || "",
    startDateTime: event.startDateTime
      ? event.startDateTime.substring(0, 16)
      : "",
    endDateTime: event.endDateTime ? event.endDateTime.substring(0, 16) : "",
    maxCapacity: event.maxCapacity ?? "",
    location: event.location || "",
    onlineLink: event.onlineLink || "",
    targetAudience: event.targetAudience || "",
    speakerName: event.speakerName || "",
    speakerBio: event.speakerBio || "",
    coverImageUrl: event.coverImageUrl || "",
    registrationDeadline: event.registrationDeadline
      ? event.registrationDeadline.substring(0, 16)
      : "",
    categoryId: event.categoryId ?? "",
    autoApproveRegistration: event.autoApproveRegistration ?? true,
    certificateEnabled: event.certificateEnabled ?? false,
    certificateTemplateUrl: event.certificateTemplateUrl || "",
    status: event.status || "DRAFT",
  };
};
