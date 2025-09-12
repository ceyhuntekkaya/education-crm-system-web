import Link from "next/link";
import { Button } from "@/components";
import { useInstitutionCardContext } from "../_context";

export const ActionSection = () => {
  const { institution, onCardClick } = useInstitutionCardContext();

  return (
    <>
      {/* Spacer to push button to bottom */}
      <div className="flex-grow-1"></div>

      {/* Action Button - Bottom */}
      <Link href={`/search/${institution.id}`}>
        <Button rightIcon="ph-eye" className="mt-12 w-100">
          Kuruma Git
        </Button>
      </Link>

      {/* Alt Çubuk - Collapse */}
      <div className="mt-24 pt-24 border-top">
        <Button
          variant="outline"
          onClick={onCardClick}
          size="sm"
          rightIcon="ph-caret-up"
          className="px-20 d-flex align-items-center gap-8 mx-auto"
        >
          Daha Az Göster
        </Button>
      </div>
    </>
  );
};
