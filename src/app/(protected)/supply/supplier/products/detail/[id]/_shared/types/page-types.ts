export type TabType = "details" | "specs" | "supplier";

export interface PageStateProps {
  selectedImage?: string;
  activeTab: TabType;
}
