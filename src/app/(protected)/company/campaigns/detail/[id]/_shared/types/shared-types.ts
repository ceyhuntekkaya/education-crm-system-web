import { CampaignDto } from "@/types";

/**
 * Campaign detay sayfası için temel türler
 */

export interface CampaignDetailSection {
  id: string;
  title: string;
  items: CampaignDetailItem[];
}

export interface CampaignDetailItem {
  label: string;
  value: string | number | boolean | null | undefined;
  type?:
    | "text"
    | "currency"
    | "percentage"
    | "date"
    | "status"
    | "badge"
    | "boolean";
  render?: () => React.ReactNode;
  format?: (value: any) => string;
}

export interface CampaignDetailConfig {
  sections: CampaignDetailSection[];
}
