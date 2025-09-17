export interface AppointmentCreateDto {
  /** Format: int64 */
  appointmentSlotId?: number;
  /** Format: int64 */
  schoolId?: number;
  /** Format: int64 */
  parentUserId?: number;
  /** Format: date */
  appointmentDate?: string;
  startTime?: string;
  endTime?: string;
  /** @enum {string} */
  appointmentType?:
    | "INFORMATION_MEETING"
    | "SCHOOL_TOUR"
    | "ENROLLMENT_INTERVIEW"
    | "PARENT_MEETING"
    | "CONSULTATION"
    | "ASSESSMENT"
    | "ORIENTATION"
    | "ONLINE_MEETING"
    | "PHONE_CALL"
    | "GROUP_MEETING"
    | "OTHER";
  title?: string;
  description?: string;
  location?: string;
  isOnline?: boolean;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  studentName?: string;
  /** Format: int32 */
  studentAge?: number;
  /** Format: date */
  studentBirthDate?: string;
  /** @enum {string} */
  studentGender?: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
  currentSchool?: string;
  gradeInterested?: string;
  specialRequests?: string;
  notes?: string;
  participants?: import("./AppointmentParticipantCreateDto").AppointmentParticipantCreateDto[];
}
