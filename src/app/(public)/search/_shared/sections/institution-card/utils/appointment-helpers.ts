import { SchoolSearchResultDto } from "@/types/dto/institution/InstitutionSearch.types";

/**
 * Randevu tarihini formatlar
 * @param appointmentDate - ISO string formatında tarih
 * @returns Formatlanmış tarih string'i (ör: "15 Oca")
 */
export const formatAppointmentDate = (appointmentDate: string): string => {
  try {
    const date = new Date(appointmentDate);
    const day = date.getDate();
    const monthNames = [
      "Oca",
      "Şub",
      "Mar",
      "Nis",
      "May",
      "Haz",
      "Tem",
      "Ağu",
      "Eyl",
      "Eki",
      "Kas",
      "Ara",
    ];
    const month = monthNames[date.getMonth()];

    return `${day} ${month}`;
  } catch (error) {
    return "Tarih";
  }
};

/**
 * Randevu saatini formatlar
 * @param appointmentDate - ISO string formatında tarih
 * @returns Formatlanmış saat string'i (ör: "14:30")
 */
export const formatAppointmentTime = (appointmentDate: string): string => {
  try {
    const date = new Date(appointmentDate);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  } catch (error) {
    return "00:00";
  }
};

/**
 * Randevu bilgilerini kontrol eder ve formatlar
 * @param institution - Kurum bilgileri
 * @returns Randevu varsa formatlanmış bilgiler, yoksa null
 */
export const getAppointmentInfo = (institution: SchoolSearchResultDto) => {
  if (
    !institution.appointment?.isActiveAppointment ||
    !institution.appointment.appointmentDate
  ) {
    return null;
  }

  const date = formatAppointmentDate(institution.appointment.appointmentDate);
  const time = formatAppointmentTime(institution.appointment.appointmentDate);

  return {
    date,
    time,
    fullDateTime: institution.appointment.appointmentDate,
  };
};
