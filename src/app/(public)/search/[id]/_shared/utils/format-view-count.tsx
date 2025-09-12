/**
 * Görüntülenme sayısını formatlar (1000+ için K suffix ekler)
 * @param viewCount - Formatlanacak görüntülenme sayısı
 * @returns Formatlanmış string veya number
 */
export const formatViewCount = (viewCount?: number): string | number => {
  const count = viewCount ?? 0;
  return count > 1000 ? `${(count / 1000).toFixed(1)}K` : count;
};
