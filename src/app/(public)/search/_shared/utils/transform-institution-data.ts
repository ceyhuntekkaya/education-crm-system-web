import { InstitutionTypeListDto } from "@/types";

/**
 * 🏫 TRANSFORM INSTITUTION TYPE DATA
 * Kurum türü verilerini select component için uygun formata dönüştürür
 */
export const transformInstitutionTypeData = (
  data: InstitutionTypeListDto[] | undefined,
  placeholder: string
) => [
  { value: "", label: placeholder },
  ...(data
    ?.map((type: InstitutionTypeListDto) => {
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
      };
    })
    .filter(
      (
        option: { value: string; label: string } | null
      ): option is { value: string; label: string } => option !== null
    ) || []),
];
