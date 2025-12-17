import { useInstitutionCardContext } from "../context";

export const Description = () => {
  const { institution } = useInstitutionCardContext();

  if (!institution.description) {
    return null;
  }

  return (
    <div className="mb-24">
      <div className="d-flex align-items-center gap-12 mb-8">
        <div className="w-8 h-8 rounded-circle bg-main-600"></div>
        <h4 className="h6 mb-0 text-heading fw-bold">Kurumumuz Hakkında</h4>
      </div>
      <div className="ps-20">
        <p className="text-neutral-700 line-height-relaxed mb-0">
          {institution.description}
        </p>
      </div>
    </div>
  );
};
