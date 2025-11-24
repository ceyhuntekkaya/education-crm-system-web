import { InstitutionTypeListDto } from "@/types";

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
    .map((type: InstitutionTypeListDto) => {
      // Güvenli veri kontrolü
      if (
        !type.institutionTypeDto?.id ||
        !type.institutionTypeDto?.displayName
      ) {
        return null;
      }
      return {
        value: type.institutionTypeDto.id.toString(),
        label: type.institutionTypeDto.displayName,
        groupId: type.institutionTypeDto.groupId,
        groupName: type.institutionTypeDto.groupName,
      };
    })
    .filter(
      (
        option
      ): option is {
        value: string;
        label: string;
        groupId?: number;
        groupName?: string;
      } => option !== null
    );

  return [placeholderOption, ...mappedData];
};

/**
 * 🏫 TRANSFORM INSTITUTION GROUPS
 * Kurum gruplarını unique olarak döndürür
 */
export const transformInstitutionGroups = (
  data: InstitutionTypeListDto[] | undefined,
  placeholder: string
) => {
  if (!data || data.length === 0) {
    return [{ value: "", label: placeholder }];
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

  return [
    { value: "", label: placeholder },
    ...groups.map((group) => ({
      value: group.groupId.toString(),
      label: group.groupName,
    })),
  ];
};
