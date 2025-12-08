import { InstitutionTypeListDto } from "@/types";

/**
 * Metni title case formatına çevirir
 * Her kelimenin ilk harfi büyük, bağlaçlar küçük (ve, veya, ile, vb.)
 */
const toTitleCase = (text: string): string => {
  const lowerCaseWords = [
    "ve",
    "veya",
    "ile",
    "için",
    "de",
    "da",
    "bir",
    "gibi",
  ];

  return text
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      // İlk kelime her zaman büyük harfle başlar
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      // Bağlaçlar küçük kalır
      if (lowerCaseWords.includes(word)) {
        return word;
      }
      // Diğer kelimeler ilk harfi büyük
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

/**
 * 🏫 TRANSFORM INSTITUTION TYPE DATA
 * Kurum türü verilerini select component için uygun formata dönüştürür
 */
export const transformInstitutionTypeData = (
  data: InstitutionTypeListDto[] | undefined,
  placeholder: string
): Array<{
  value: string;
  label: string;
  groupId?: number;
  groupName?: string;
}> => {
  const placeholderOption = { value: "", label: placeholder };

  if (!data) {
    return [placeholderOption];
  }

  const mappedData = data
    .filter(
      (type: InstitutionTypeListDto) =>
        type.institutionTypeDto?.id && type.institutionTypeDto?.displayName
    )
    .map((type: InstitutionTypeListDto) => {
      const dto = type.institutionTypeDto!;
      return {
        value: dto.id!.toString(),
        label: toTitleCase(dto.displayName!),
        groupId: dto.groupId,
        groupName: dto.groupName,
      };
    });

  return [placeholderOption, ...mappedData];
};

/**
 * 🏫 TRANSFORM INSTITUTION GROUPS
 * Kurum gruplarını unique olarak döndürür
 */
export const transformInstitutionGroups = (
  data: InstitutionTypeListDto[] | undefined,
  placeholder?: string
) => {
  if (!data || data.length === 0) {
    return placeholder ? [{ value: "", label: placeholder }] : [];
  }

  // Unique grupları topla
  const groupsMap = new Map<number, { groupId: number; groupName: string }>();

  data.forEach((type: InstitutionTypeListDto) => {
    const { groupId, groupName } = type.institutionTypeDto || {};

    if (groupId && groupName && !groupsMap.has(groupId)) {
      groupsMap.set(groupId, { groupId, groupName });
    }
  });

  // Grupları array'e çevir ve name'e göre sırala
  const groups = Array.from(groupsMap.values()).sort((a, b) =>
    a.groupName.localeCompare(b.groupName, "tr")
  );

  // Placeholder varsa başa ekle, yoksa sadece grupları döndür
  const placeholderOption = placeholder
    ? [{ value: "", label: placeholder }]
    : [];

  return [
    ...placeholderOption,
    ...groups.map((group) => ({
      value: group.groupId.toString(),
      label: toTitleCase(group.groupName),
    })),
  ];
};
