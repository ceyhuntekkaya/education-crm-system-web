import { Button } from "@/components";
import { useInstitutionCardContext } from "../_context";

export const ExpandTrigger = () => {
  const { onCardClick } = useInstitutionCardContext();

  return (
    <div className="border-top pt-16">
      <div className="d-flex gap-8">
        <Button
          variant="outline"
          onClick={onCardClick}
          size="sm"
          rightIcon="ph-caret-down"
          className="flex-grow-1"
        >
          Detayları gör
        </Button>
      </div>
    </div>
  );
};
