import { UserSectionConfig } from "../types";
import { userGeneralInfoConfig } from "./user-general-info-config";
import { userAddressInfoConfig } from "./user-address-info-config";
import { userRoleInfoConfig } from "./user-role-info-config";

/**
 * Tüm user section konfigürasyonlarını tanımlar
 */
export const USER_SECTIONS: UserSectionConfig[] = [
  // 1. GENEL BİLGİLER
  {
    title: "Genel Kullanıcı Bilgileri",
    titleColor: "text-main-600",
    titleIcon: "ph-bold ph-user",
    config: userGeneralInfoConfig,
  },

  // 2. ADRES BİLGİLERİ
  {
    title: "Adres Bilgileri",
    titleColor: "text-info-600",
    titleIcon: "ph-bold ph-map-pin",
    config: userAddressInfoConfig,
  },

  // 3. ROL VE KURUM BİLGİLERİ
  {
    title: "Rol ve Kurum Bilgileri",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-identification-badge",
    config: userRoleInfoConfig,
  },
];
