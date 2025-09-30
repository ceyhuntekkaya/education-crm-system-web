import { listOptions, ListType } from "../mock/list-options";

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
