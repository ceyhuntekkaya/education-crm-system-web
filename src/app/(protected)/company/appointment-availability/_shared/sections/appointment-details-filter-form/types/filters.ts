/**
 * Appointment details filter parameters
 * Frontend tabanlı filtreleme için kullanılır
 * Columns'taki gösterilen bilgilere göre optimize edilmiş
 */
export interface AppointmentDetailsFilters {
  // Randevu temel bilgileri (columns: title, appointmentNumber)
  title?: string;
  appointmentNumber?: string;

  // Kişi bilgileri (columns: parentName, studentName, staffUserName)
  parentName?: string;
  studentName?: string;
  staffUserName?: string;

  // Durum filtreleri (columns: appointmentType, status, outcome)
  appointmentType?: string;
  status?: string;
  outcome?: string;

  // Tarih ve zaman (columns: appointmentDate, startTime, endTime)
  appointmentDate?: string;
  startTime?: string;
  endTime?: string;

  // Konum bilgileri (columns: location, isOnline)
  location?: string;
  isOnline?: boolean;

  // Takip durumu (columns: followUpRequired)
  followUpRequired?: boolean;
}

/**
 * Filter dropdown options
 */
export interface FilterOptions {
  statuses: Array<{ value: string; label: string }>;
  appointmentTypes: Array<{ value: string; label: string }>;
  outcomes: Array<{ value: string; label: string }>;
}
