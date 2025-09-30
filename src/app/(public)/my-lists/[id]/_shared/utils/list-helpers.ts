import {
  listOptions,
  ListType,
  getMockListDataWithSpecificDistribution,
  MockListInstitution,
} from "../mock";

// Yardımcı fonksiyonlar
export const getListById = (id: number) => {
  return listOptions.find((option) => option.id === id);
};

export const getListByValue = (value: ListType) => {
  return listOptions.find((option) => option.value === value);
};

export const getListByIndex = (index: number) => {
  return listOptions[index];
};

export const getAllListIds = () => {
  return listOptions.map((option) => option.id);
};

export const getAllListValues = () => {
  return listOptions.map((option) => option.value);
};

// Liste filtreleme fonksiyonu
export const getInstitutionsByListId = (
  listId: number
): MockListInstitution[] => {
  const mockData = getMockListDataWithSpecificDistribution();
  return mockData.filter((institution) => institution.listTypeId === listId);
};

// URL'den ID'yi parse etme fonksiyonu
export const parseListIdFromUrl = (id: string): number => {
  const numId = parseInt(id, 10);
  return isNaN(numId) ? 1 : numId; // Geçersiz ID durumunda default olarak 1 döner
};

// Liste var mı kontrol etme
export const isValidListId = (id: number): boolean => {
  return listOptions.some((option) => option.id === id);
};
