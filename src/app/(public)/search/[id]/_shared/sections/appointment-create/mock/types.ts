// Müsaitlik durumu seçenekleri (AppointmentAvailabilityDto.availability için)
export const availabilityStatuses = [
  "FULLY_BOOKED",
  "LIMITED",
  "AVAILABLE",
  "ABUNDANT",
] as const;

export type AvailabilityStatus = (typeof availabilityStatuses)[number];
