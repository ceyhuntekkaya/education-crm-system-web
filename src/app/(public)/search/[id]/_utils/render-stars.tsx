/**
 * Yıldız rating'i render eden fonksiyon
 * @param rating - 0-5 arası rating değeri
 * @returns JSX element
 */
export const renderStars = (rating: number): JSX.Element => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex-align gap-4">
      {[...Array(fullStars)].map((_, i) => (
        <span
          key={`full-${i}`}
          className="text-lg fw-medium text-warning-600 d-flex"
        >
          <i className="ph-fill ph-star" />
        </span>
      ))}
      {hasHalfStar && (
        <span className="text-lg fw-medium text-warning-600 d-flex">
          <i className="ph-fill ph-star-half" />
        </span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span
          key={`empty-${i}`}
          className="text-lg fw-medium text-neutral-300 d-flex"
        >
          <i className="ph-fill ph-star" />
        </span>
      ))}
    </div>
  );
};
