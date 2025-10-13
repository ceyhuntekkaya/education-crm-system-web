import { SchoolDto } from "@/types";
import { ReactNode } from "react";

/**
 * School Detail Provider Props
 */
export interface SchoolDetailProviderProps {
  children: ReactNode;
}

/**
 * School Information Form Props
 */
export interface SchoolInfoFormProps {
  school: SchoolDto;
  onSave: (school: SchoolDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

/**
 * School Info Display Props
 */
export interface SchoolInfoDisplayProps {
  school: SchoolDto;
  onEdit: () => void;
}

/**
 * School Detail Tab Types
 */
export type SchoolDetailTab =
  | "info"
  | "contact"
  | "settings"
  | "statistics"
  | "documents";

/**
 * School Detail Tab Item
 */
export interface SchoolDetailTabItem {
  id: SchoolDetailTab;
  label: string;
  icon: string;
  component: React.ComponentType<any>;
}
