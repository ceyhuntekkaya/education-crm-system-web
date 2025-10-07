import { AppointmentAvailabilityDto } from "@/types/dto/appointment/AppointmentAvailabilityDto";
import { mockAvailableSlots } from "./available-slots";

// Okul müsaitlik bilgisi mock data
export const mockSchoolAvailability: AppointmentAvailabilityDto[] = [
  {
    schoolId: 1,
    schoolName: "Bahçeşehir Koleji",
    date: "2024-12-20",
    availableSlots: mockAvailableSlots,
    totalSlots: 10,
    bookedSlots: 2,
    availableCount: 8,
    availability: "AVAILABLE",
  },
  {
    schoolId: 1,
    schoolName: "Bahçeşehir Koleji",
    date: "2024-12-21",
    availableSlots: mockAvailableSlots.slice(0, 3), // Daha az slot
    totalSlots: 8,
    bookedSlots: 5,
    availableCount: 3,
    availability: "LIMITED",
  },
  {
    schoolId: 1,
    schoolName: "Bahçeşehir Koleji",
    date: "2024-12-22",
    availableSlots: [],
    totalSlots: 6,
    bookedSlots: 6,
    availableCount: 0,
    availability: "FULLY_BOOKED",
  },
];
