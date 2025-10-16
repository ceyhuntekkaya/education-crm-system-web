import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { BadgeVariant, AppointmentStats } from "../types";

/**
 * Get badge variant based on appointment status
 */
export const getStatusBadgeVariant = (status?: string): BadgeVariant => {
  switch (status) {
    case "COMPLETED":
      return "success";
    case "CONFIRMED":
    case "APPROVED":
      return "info";
    case "PENDING":
      return "warning";
    case "CANCELLED":
    case "REJECTED":
    case "NO_SHOW":
      return "danger";
    case "IN_PROGRESS":
      return "success";
    case "RESCHEDULED":
      return "secondary";
    default:
      return "secondary";
  }
};

/**
 * Get display text for appointment status
 */
export const getStatusDisplay = (status?: string): string => {
  switch (status) {
    case "PENDING":
      return "Beklemede";
    case "CONFIRMED":
      return "Onaylandı";
    case "APPROVED":
      return "Onaylandı";
    case "REJECTED":
      return "Reddedildi";
    case "CANCELLED":
      return "İptal Edildi";
    case "COMPLETED":
      return "Tamamlandı";
    case "NO_SHOW":
      return "Gelmedi";
    case "RESCHEDULED":
      return "Ertelendi";
    case "IN_PROGRESS":
      return "Devam Ediyor";
    default:
      return status || "Bilinmiyor";
  }
};

/**
 * Get display text for appointment type
 */
export const getAppointmentTypeDisplay = (appointmentType?: string): string => {
  switch (appointmentType) {
    case "INFORMATION_MEETING":
      return "Bilgi Toplantısı";
    case "SCHOOL_TOUR":
      return "Okul Gezisi";
    case "ENROLLMENT_INTERVIEW":
      return "Kayıt Görüşmesi";
    case "PARENT_MEETING":
      return "Veli Görüşmesi";
    case "CONSULTATION":
      return "Danışmanlık";
    case "ASSESSMENT":
      return "Değerlendirme";
    case "ORIENTATION":
      return "Oryantasyon";
    case "ONLINE_MEETING":
      return "Online Görüşme";
    case "GROUP_MEETING":
      return "Grup Toplantısı";
    case "PHONE_CALL":
      return "Telefon Görüşmesi";
    case "OTHER":
      return "Diğer";
    default:
      return appointmentType || "Bilinmiyor";
  }
};

/**
 * Format appointment time display
 */
export const formatAppointmentTime = (
  appointmentDate?: string,
  startTime?: string,
  endTime?: string
): string => {
  if (!appointmentDate || !startTime || !endTime) return "-";

  const date = new Date(appointmentDate);
  const formattedDate = date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return `${formattedDate} ${startTime} - ${endTime}`;
};

/**
 * Get outcome display text
 */
export const getOutcomeDisplay = (outcome?: string): string => {
  switch (outcome) {
    case "ENROLLED":
      return "Kayıt Oldu";
    case "INTERESTED":
      return "İlgili";
    case "NOT_INTERESTED":
      return "İlgili Değil";
    case "NEEDS_MORE_INFO":
      return "Daha Fazla Bilgi Gerekiyor";
    case "PRICE_CONCERN":
      return "Fiyat Endişesi";
    case "TIMING_ISSUE":
      return "Zamanlama Sorunu";
    case "CONSIDERING_OPTIONS":
      return "Seçenekleri Değerlendiriyor";
    case "WILL_CALL_BACK":
      return "Geri Arayacak";
    case "OTHER":
      return "Diğer";
    default:
      return outcome || "-";
  }
};

/**
 * Filter confirmed appointments
 */
export const getConfirmedAppointments = (
  appointments: AppointmentDto[]
): AppointmentDto[] => {
  return appointments.filter(
    (appointment) => appointment.status === "CONFIRMED"
  );
};

/**
 * Filter completed appointments
 */
export const getCompletedAppointments = (
  appointments: AppointmentDto[]
): AppointmentDto[] => {
  return appointments.filter(
    (appointment) => appointment.status === "COMPLETED"
  );
};

/**
 * Filter cancelled appointments
 */
export const getCancelledAppointments = (
  appointments: AppointmentDto[]
): AppointmentDto[] => {
  return appointments.filter(
    (appointment) => appointment.status === "CANCELLED"
  );
};

/**
 * Filter pending appointments
 */
export const getPendingAppointments = (
  appointments: AppointmentDto[]
): AppointmentDto[] => {
  return appointments.filter((appointment) => appointment.status === "PENDING");
};

/**
 * Filter in-progress appointments
 */
export const getInProgressAppointments = (
  appointments: AppointmentDto[]
): AppointmentDto[] => {
  return appointments.filter(
    (appointment) => appointment.status === "IN_PROGRESS"
  );
};

/**
 * Filter appointments by type
 */
export const getAppointmentsByType = (
  appointments: AppointmentDto[],
  appointmentType: string
): AppointmentDto[] => {
  return appointments.filter(
    (appointment) => appointment.appointmentType === appointmentType
  );
};

/**
 * Get appointment by ID
 */
export const getAppointmentById = (
  appointments: AppointmentDto[],
  id: number
): AppointmentDto | undefined => {
  return appointments.find((appointment) => appointment.id === id);
};

/**
 * Calculate appointment statistics
 */
export const calculateAppointmentStats = (
  appointments: AppointmentDto[]
): AppointmentStats => {
  const total = appointments.length;
  const confirmed = appointments.filter((a) => a.status === "CONFIRMED").length;
  const completed = appointments.filter((a) => a.status === "COMPLETED").length;
  const cancelled = appointments.filter((a) => a.status === "CANCELLED").length;
  const pending = appointments.filter((a) => a.status === "PENDING").length;
  const inProgress = appointments.filter(
    (a) => a.status === "IN_PROGRESS"
  ).length;
  const noShow = appointments.filter((a) => a.status === "NO_SHOW").length;

  // Calculate average enrollment likelihood
  const appointmentsWithLikelihood = appointments.filter(
    (a) => a.enrollmentLikelihood !== undefined
  );
  const totalLikelihood = appointmentsWithLikelihood.reduce(
    (sum, a) => sum + (a.enrollmentLikelihood || 0),
    0
  );
  const averageEnrollmentLikelihood =
    appointmentsWithLikelihood.length > 0
      ? totalLikelihood / appointmentsWithLikelihood.length
      : 0;

  // Count unique schools
  const uniqueSchools = new Set(appointments.map((a) => a.schoolId)).size;

  // Appointment types count
  const appointmentTypes: { [key: string]: number } = {};
  appointments.forEach((appointment) => {
    const type = getAppointmentTypeDisplay(appointment.appointmentType);
    appointmentTypes[type] = (appointmentTypes[type] || 0) + 1;
  });

  return {
    total,
    confirmed,
    completed,
    cancelled,
    pending,
    inProgress,
    noShow,
    averageEnrollmentLikelihood,
    totalSchools: uniqueSchools,
    appointmentTypes,
  };
};
