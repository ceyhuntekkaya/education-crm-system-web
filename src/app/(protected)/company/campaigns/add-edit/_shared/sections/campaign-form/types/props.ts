import { CampaignDto } from "@/types";

export interface CampaignFormProps {
  className?: string;
  isEditing?: boolean;
  initialData?: CampaignDto | null;
}
