import { AppointmentAvailabilityDto } from "@/types/dto/appointment/AppointmentAvailabilityDto";
import { AvailableSlotDto } from "@/types/dto/appointment/AvailableSlotDto";

// Available slots mock data
const generateAvailableSlots = (
  count: number,
  startHour: number = 9
): AvailableSlotDto[] => {
  const slots: AvailableSlotDto[] = [];

  for (let i = 0; i < count; i++) {
    const hour = startHour + i;
    const endHour = hour + 1;

    slots.push({
      slotId: 1000 + i,
      startTime: `${hour.toString().padStart(2, "0")}:00`,
      endTime: `${endHour.toString().padStart(2, "0")}:00`,
      durationMinutes: 60,
      appointmentType:
        i % 3 === 0
          ? "INFORMATION_MEETING"
          : i % 3 === 1
          ? "SCHOOL_TOUR"
          : "ENROLLMENT_INTERVIEW",
    });
  }

  return slots;
};

// Appointment Availability mock data
export const mockAppointmentAvailabilities: AppointmentAvailabilityDto[] = [
  {
    schoolId: 1,
    schoolName: "Bahçeşehir Koleji Merkez Kampüs",
    date: "2024-12-20",
    availableSlots: generateAvailableSlots(5, 9),
    totalSlots: 8,
    bookedSlots: 3,
    availableCount: 5,
    availability: "Yüksek Müsaitlik",
  },
  {
    schoolId: 2,
    schoolName: "Özel Doğa Koleji",
    date: "2024-12-21",
    availableSlots: generateAvailableSlots(2, 14),
    totalSlots: 6,
    bookedSlots: 4,
    availableCount: 2,
    availability: "Düşük Müsaitlik",
  },
  {
    schoolId: 3,
    schoolName: "Işık Kurumları Acıbadem Kampüsü",
    date: "2024-12-22",
    availableSlots: generateAvailableSlots(3, 10),
    totalSlots: 7,
    bookedSlots: 4,
    availableCount: 3,
    availability: "Orta Müsaitlik",
  },
  {
    schoolId: 4,
    schoolName: "MEF Kurumları",
    date: "2024-12-23",
    availableSlots: generateAvailableSlots(6, 9),
    totalSlots: 10,
    bookedSlots: 4,
    availableCount: 6,
    availability: "Yüksek Müsaitlik",
  },
  {
    schoolId: 5,
    schoolName: "Bilfen Kolej",
    date: "2024-12-24",
    availableSlots: [], // No available slots
    totalSlots: 8,
    bookedSlots: 8,
    availableCount: 0,
    availability: "Müsaitlik Yok",
  },
  {
    schoolId: 6,
    schoolName: "Hisar Kurumları",
    date: "2024-12-25",
    availableSlots: generateAvailableSlots(4, 13),
    totalSlots: 6,
    bookedSlots: 2,
    availableCount: 4,
    availability: "Yüksek Müsaitlik",
  },
  {
    schoolId: 7,
    schoolName: "TED Ankara Koleji",
    date: "2024-12-26",
    availableSlots: generateAvailableSlots(1, 16),
    totalSlots: 5,
    bookedSlots: 4,
    availableCount: 1,
    availability: "Düşük Müsaitlik",
  },
  {
    schoolId: 8,
    schoolName: "Özel Atatürk İlköğretim Kurumu",
    date: "2024-12-27",
    availableSlots: generateAvailableSlots(3, 11),
    totalSlots: 8,
    bookedSlots: 5,
    availableCount: 3,
    availability: "Orta Müsaitlik",
  },
  {
    schoolId: 9,
    schoolName: "Üsküdar Amerikan Akademisi",
    date: "2024-12-28",
    availableSlots: generateAvailableSlots(7, 9),
    totalSlots: 12,
    bookedSlots: 5,
    availableCount: 7,
    availability: "Yüksek Müsaitlik",
  },
  {
    schoolId: 10,
    schoolName: "Koç Özel Lisesi",
    date: "2024-12-29",
    availableSlots: generateAvailableSlots(2, 15),
    totalSlots: 4,
    bookedSlots: 2,
    availableCount: 2,
    availability: "Orta Müsaitlik",
  },
];

// Helper function to get specific school availability
export const getSchoolAvailability = (
  schoolId: number,
  date?: string
): AppointmentAvailabilityDto | null => {
  return (
    mockAppointmentAvailabilities.find(
      (availability) =>
        availability.schoolId === schoolId &&
        (!date || availability.date === date)
    ) || null
  );
};

// Helper function to get availabilities by date
export const getAvailabilitiesByDate = (
  date: string
): AppointmentAvailabilityDto[] => {
  return mockAppointmentAvailabilities.filter(
    (availability) => availability.date === date
  );
};

// Legacy export for backward compatibility
export const mockAppointments = mockAppointmentAvailabilities;
