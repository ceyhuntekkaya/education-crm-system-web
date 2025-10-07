import { useInstitutionCardContext } from "../context";

export const Properties = () => {
  const { visibleCardProperties, showAllProperties, toggleAllProperties } =
    useInstitutionCardContext();

  const maxVisible = 3;
  const properties = visibleCardProperties;
  const showAll = showAllProperties;
  const onToggle = toggleAllProperties;

  if (properties.length === 0) return null;

  const visiblePropertiesFiltered = showAll
    ? properties
    : properties.slice(0, maxVisible);
  const hasMore = properties.length > maxVisible;

  return (
    <div className="mb-32">
      <div className="d-flex align-items-center justify-content-between mb-16">
        <div className="d-flex align-items-center gap-12">
          <div className="w-8 h-8 rounded-circle bg-warning-600"></div>
          <h4 className="h6 mb-0 text-heading fw-bold">Teknik Detaylar</h4>
        </div>
        {hasMore && onToggle && (
          <button
            className="btn btn-sm btn-outline-main rounded-pill px-12 py-4"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            <span className="text-xs">
              {showAll ? "Daha az" : `+${properties.length - maxVisible} daha`}
            </span>
          </button>
        )}
      </div>
      <div className="ps-20 pt-12">
        <div className="row g-8">
          {visiblePropertiesFiltered.map((property: any) => (
            <div key={property.id} className="col-6">
              <div className="p-12 bg-main-25 border border-main-100 rounded-12">
                <p className="text-xs text-main-600 fw-medium mb-4">
                  {property.propertyDisplayName}
                </p>
                <p className="text-sm text-main-800 fw-semibold mb-0">
                  {property.formattedValue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
