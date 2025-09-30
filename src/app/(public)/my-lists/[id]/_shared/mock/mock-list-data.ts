import { SchoolSearchResultDto } from "@/types";
import { mockInstitutions } from "../../../../search/_shared";

// Mock data için listType ID'si eklenmiş versiyonu
export interface MockListInstitution extends SchoolSearchResultDto {
  listTypeId: number;
}

export const mockListData: MockListInstitution[] = mockInstitutions.map(
  (institution: SchoolSearchResultDto, index: number) => ({
    ...institution,
    // Her kuruma rastgele bir listType ID'si atayalım (1-8 arası)
    listTypeId: (index % 8) + 1,
  })
);

// Her liste tipinde GARANTILI olarak kurum olması için basit ve etkili dağılım
export const getMockListDataWithSpecificDistribution =
  (): MockListInstitution[] => {
    const result: MockListInstitution[] = [];

    // Her liste tipi için garantili minimum kurum sayısı (basit round-robin)
    mockInstitutions.forEach(
      (institution: SchoolSearchResultDto, index: number) => {
        // Her kurumu en az 3 farklı listede göster
        const listId1 = (index % 8) + 1;
        const listId2 = ((index + 3) % 8) + 1;
        const listId3 = ((index + 6) % 8) + 1;

        result.push({ ...institution, listTypeId: listId1 });
        result.push({ ...institution, listTypeId: listId2 });
        result.push({ ...institution, listTypeId: listId3 });
      }
    );

    // Her liste tipine ek kurumlar ekle (daha zengin içerik için)
    for (let listTypeId = 1; listTypeId <= 8; listTypeId++) {
      // Her listeye rastgele 2-3 ek kurum ekle
      const startIndex = (listTypeId - 1) * 2;
      for (let i = 0; i < 3; i++) {
        const institutionIndex = (startIndex + i) % mockInstitutions.length;
        const institution = mockInstitutions[institutionIndex];

        // Aynı kurum zaten bu listede yoksa ekle
        const alreadyExists = result.some(
          (item) => item.id === institution.id && item.listTypeId === listTypeId
        );

        if (!alreadyExists) {
          result.push({ ...institution, listTypeId: listTypeId });
        }
      }
    }

    return result;
  };
