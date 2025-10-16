/**
 * Field labellarını Türkçe'ye çeviren utility
 */
export const getFieldLabel = (fieldKey: string): string => {
  const labelMap: Record<string, string> = {
    title: "Başlık",
    appointmentNumber: "Randevu No",
    schoolName: "Okul",
    campusName: "Kampüs",
    parentName: "Veli",
    studentName: "Öğrenci",
    appointmentType: "Tür",
    status: "Durum",
    appointmentDate: "Tarih",
    startTime: "Başlangıç",
    endTime: "Bitiş",
    location: "Konum",
    isOnline: "Online",
    staffUserName: "Personel",
    outcome: "Sonuç",
    followUpRequired: "Takip Gerekli",
    startDate: "Başlangıç Tarihi",
    endDate: "Bitiş Tarihi",
  };
  return labelMap[fieldKey] || fieldKey;
};

/**
 * Aktif filtre sayısına göre dinamik subtitle oluşturan utility
 */
export const getFilterSubtitle = (
  filters: Record<string, any> | null | undefined,
  totalCount: number,
  loadingText = "Yükleniyor..."
): string => {
  const filterCount = filters ? Object.keys(filters).length : 0;

  if (filterCount > 0) {
    return `${totalCount} randevu • ${filterCount} aktif filtre`;
  }
  return totalCount > 0
    ? `${totalCount} randevu içerisinde filtreleme yapabilirsiniz`
    : loadingText;
};
