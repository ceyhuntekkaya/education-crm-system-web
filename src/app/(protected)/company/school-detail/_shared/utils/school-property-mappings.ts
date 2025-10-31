/**
 * School property group icon mapping
 * Maps group names to their corresponding Phosphor icons
 */
export const getSchoolPropertyGroupIcon = (groupName: string): string => {
  const iconMap: Record<string, string> = {
    "EĞİTİM SİSTEMİ": "ph-bold ph-graduation-cap",
    "KURUM KATEGORİ": "ph-bold ph-buildings",
    HİZMETLER: "ph-bold ph-gear",
    "EK ÖZELLİKLER": "ph-bold ph-star",
    AKTİVİTELER: "ph-bold ph-game-controller",
    SOSYAL: "ph-bold ph-users",
    SPOR: "ph-bold ph-basketball",
    SANAT: "ph-bold ph-palette",
    TEKNOLOJİ: "ph-bold ph-laptop",
    DİL: "ph-bold ph-translate",
    MÜZİK: "ph-bold ph-music-note",
    FEN: "ph-bold ph-flask",
    MATEMATİK: "ph-bold ph-calculator",
    SAĞLIK: "ph-bold ph-heart",
    GÜVENLIK: "ph-bold ph-shield-check",
    ULAŞIM: "ph-bold ph-bus",
    BESLENME: "ph-bold ph-fork-knife",
  };

  return iconMap[groupName.toUpperCase()] || "ph-bold ph-tag";
};

/**
 * School property group color mapping
 * Maps group names to their corresponding Tailwind color classes
 */
export const getSchoolPropertyGroupColor = (groupName: string): string => {
  const colorMap: Record<string, string> = {
    "EĞİTİM SİSTEMİ": "text-primary-600",
    "KURUM KATEGORİ": "text-success-600",
    HİZMETLER: "text-info-600",
    "EK ÖZELLİKLER": "text-warning-600",
    AKTİVİTELER: "text-purple-600",
    SOSYAL: "text-orange-600",
    SPOR: "text-blue-600",
    SANAT: "text-pink-600",
    TEKNOLOJİ: "text-indigo-600",
    DİL: "text-green-600",
    MÜZİK: "text-violet-600",
    FEN: "text-cyan-600",
    MATEMATİK: "text-teal-600",
    SAĞLIK: "text-red-600",
    GÜVENLIK: "text-slate-600",
    ULAŞIM: "text-amber-600",
    BESLENME: "text-lime-600",
  };

  return colorMap[groupName.toUpperCase()] || "text-neutral-600";
};

/**
 * Get both icon and color for a school property group
 * @param groupName - The name of the property group
 * @returns Object containing both icon and color
 */
export const getSchoolPropertyGroupStyle = (groupName: string) => {
  return {
    icon: getSchoolPropertyGroupIcon(groupName),
    color: getSchoolPropertyGroupColor(groupName),
  };
};
