import { Button } from "@/components";
import { useInstitutionCardContext } from "../context";

export const ExpandTrigger = () => {
  const { onCardClick } = useInstitutionCardContext();

  return (
    <div className="border-top pt-12">
      <div className="d-flex gap-8">
        <Button
          variant="outline"
          onClick={onCardClick}
          size="xs"
          rightIcon="ph-caret-down"
          className="flex-grow-1"
        >
          Detayları gör
        </Button>
      </div>
    </div>
  );
};
