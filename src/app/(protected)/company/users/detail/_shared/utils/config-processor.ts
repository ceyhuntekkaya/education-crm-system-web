import type {
  UserSectionConfig,
  UserProcessedSection,
  UserProcessedItem,
} from "../types";
import type { UserDto } from "@/types/dto/user/UserDto";

/**
 * User section config'lerini işleyerek CustomCard için uygun formata dönüştürür
 * Brand'deki createBrandSections ile aynı yapı
 */
export function createUserSections(
  sectionConfigs: UserSectionConfig[],
  user: UserDto | null
): UserProcessedSection[] {
  if (!user) return [];

  return sectionConfigs
    .map((sectionConfig) => {
      // Her section'ın config item'larını işle
      const processedItems: UserProcessedItem[] = sectionConfig.config
        .filter((configItem) => configItem.isShowing(user))
        .map((configItem) => ({
          label: configItem.label,
          value: configItem.value(user),
          // CustomCard expects an `isShowing` prop on each item when rendering;
          // include the evaluated boolean so the card can filter/render correctly.
          isShowing: !!configItem.isShowing(user),
        }));

      // Eğer bu section'da gösterilecek item yoksa, section'ı dahil etme
      if (processedItems.length === 0) return null;

      return {
        title: sectionConfig.title,
        titleColor: sectionConfig.titleColor,
        titleIcon: sectionConfig.titleIcon,
        items: processedItems,
      } as UserProcessedSection;
    })
    .filter((section): section is UserProcessedSection => section !== null);
}
