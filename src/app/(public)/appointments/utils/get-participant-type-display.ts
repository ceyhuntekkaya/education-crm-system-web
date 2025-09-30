/**
 * Get the Turkish display name for participant type
 * @param type - Participant type enum value
 * @returns Turkish display name for the participant type
 */
export const getParticipantTypeDisplay = (type?: string): string => {
  switch (type) {
    case "STUDENT":
      return "Öğrenci";
    case "PARENT":
      return "Veli";
    case "GUARDIAN":
      return "Vasi";
    case "FAMILY_MEMBER":
      return "Aile Üyesi";
    case "OTHER":
      return "Diğer";
    default:
      return type || "-";
  }
};
