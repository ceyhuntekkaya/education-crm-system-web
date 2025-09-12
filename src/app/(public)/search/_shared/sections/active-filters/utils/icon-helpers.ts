// Dinamik property grupları için ikon seçimi
export const getDynamicGroupIcon = (groupName: string): string => {
  const lowerGroupName = groupName?.toLowerCase() || "";

  if (
    lowerGroupName.includes("category") ||
    lowerGroupName.includes("kategori")
  ) {
    return "ph-squares-four";
  } else if (
    lowerGroupName.includes("facilities") ||
    lowerGroupName.includes("imkan")
  ) {
    return "ph-buildings";
  } else if (
    lowerGroupName.includes("education") ||
    lowerGroupName.includes("egitim")
  ) {
    return "ph-graduation-cap";
  } else if (
    lowerGroupName.includes("transport") ||
    lowerGroupName.includes("ulasim")
  ) {
    return "ph-car";
  } else if (
    lowerGroupName.includes("security") ||
    lowerGroupName.includes("guvenlik")
  ) {
    return "ph-shield-check";
  }

  return "ph-squares-four"; // Varsayılan ikon
};
