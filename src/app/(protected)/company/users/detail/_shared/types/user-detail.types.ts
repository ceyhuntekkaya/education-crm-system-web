import { UserDto } from "@/types";
import { ReactNode } from "react";

/**
 * User detail context type
 */
export interface UserDetailContextType {
  currentUser: UserDto | null;
  isLoading: boolean;
  error: string | null;
  refetchUser: () => void;
  allSections: UserProcessedSection[];
}

/**
 * User config item - Brand config item'a benzer yapı
 */
export type UserConfigItem = {
  label: string;
  value: (user: UserDto | null) => ReactNode;
  isShowing: (user: UserDto | null) => boolean;
};

/**
 * User section config - Bir section'ın config yapısı
 */
export type UserSectionConfig = {
  title: string;
  titleColor?: string;
  titleIcon?: string;
  config: UserConfigItem[];
};

/**
 * Processed user item - CustomCard'a gönderilecek işlenmiş item
 */
export type UserProcessedItem = {
  label: string;
  value: ReactNode;
  isShowing: boolean;
};

/**
 * Processed user section - CustomCard'ın multiItems prop'u için
 */
export type UserProcessedSection = {
  title: string;
  titleColor?: string;
  titleIcon?: string;
  items: UserProcessedItem[];
};
