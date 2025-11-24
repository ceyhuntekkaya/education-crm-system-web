import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, InstitutionTypeListDto } from "@/types";

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
 * API'den gelen kurum türü verilerini select component'i için uygun formata dönüştürür
 */
const transformInstitutionTypeData = (
  data: InstitutionTypeListDto[] | undefined
): Array<{
  value: string;
  label: string;
  groupId?: number;
  groupName?: string;
}> => {
  if (!data) return [];

  return data
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
};

/**
 * Kurum gruplarını unique olarak döndürür
 */
const transformInstitutionGroups = (
  data: InstitutionTypeListDto[] | undefined
): Array<{ value: string; label: string }> => {
  if (!data || data.length === 0) return [];

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

  return groups.map((group) => ({
    value: group.groupId.toString(),
    label: toTitleCase(group.groupName),
  }));
};

/**
 * Filter form için kurum türlerini yönetir
 */
export function useInstitutionTypes() {
  // Kurum türlerini getir
  const {
    data: institutionTypesResponse,
    loading: institutionTypesLoading,
    error: institutionTypesError,
  } = useGet<ApiResponseDto<InstitutionTypeListDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.INSTITUTION_TYPES
  );

  return {
    institutionTypes: {
      data: transformInstitutionTypeData(institutionTypesResponse?.data || []),
      loading: institutionTypesLoading,
      error: institutionTypesError,
    },
    institutionGroups: {
      data: transformInstitutionGroups(institutionTypesResponse?.data || []),
      loading: institutionTypesLoading,
      error: institutionTypesError,
    },
    // Ham veri de dönüyoruz (ihtiyaç olursa)
    rawInstitutionTypes: institutionTypesResponse?.data || [],
  };
}
