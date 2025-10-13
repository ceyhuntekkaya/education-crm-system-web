// School List shared exports
export * from "./context/school-list-context";
export * from "./config";
export * from "./mock";
export * from "./sections";
export * from "./types";

// Utils exports (avoiding conflicts with mock)
export {
  getStatusBadgeVariant,
  getInstitutionTypeDisplay,
  formatDistance,
  calculateSchoolStats,
} from "./utils/school-list-utils";
