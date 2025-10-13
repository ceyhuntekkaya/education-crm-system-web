import { SubscriptionPlanDto } from "@/types/dto/subscription/SubscriptionPlanDto";

// Badge variant type
export type BadgeVariant = 
  | "primary" 
  | "secondary" 
  | "success" 
  | "danger" 
  | "warning" 
  | "info" 
  | "light" 
  | "dark";

// Subscription column handlers
export interface SubscriptionColumnHandlers {
  onViewDetails?: (subscription: SubscriptionPlanDto) => void;
  onEdit?: (subscription: SubscriptionPlanDto) => void;
  onToggleStatus?: (subscription: SubscriptionPlanDto) => void;
  onDelete?: (subscription: SubscriptionPlanDto) => void;
  onDuplicate?: (subscription: SubscriptionPlanDto) => void;
  onViewPlan?: (subscription: SubscriptionPlanDto) => void;
  onToggleVisibility?: (subscription: SubscriptionPlanDto) => void;
  onTogglePopular?: (subscription: SubscriptionPlanDto) => void;
}

// Subscription action buttons props
export interface SubscriptionActionButtonsProps {
  subscription: SubscriptionPlanDto;
  onViewDetails?: (subscription: SubscriptionPlanDto) => void;
  onEdit?: (subscription: SubscriptionPlanDto) => void;
  onToggleStatus?: (subscription: SubscriptionPlanDto) => void;
  onDelete?: (subscription: SubscriptionPlanDto) => void;
  onDuplicate?: (subscription: SubscriptionPlanDto) => void;
  onViewPlan?: (subscription: SubscriptionPlanDto) => void;
  onToggleVisibility?: (subscription: SubscriptionPlanDto) => void;
  onTogglePopular?: (subscription: SubscriptionPlanDto) => void;
}

// Subscription table props
export interface SubscriptionTableProps {
  subscriptions?: SubscriptionPlanDto[];
  loading?: boolean;
}

// Subscription context type
export interface SubscriptionContextType {
  subscriptions: SubscriptionPlanDto[];
  loading: boolean;
  selectedSubscription: SubscriptionPlanDto | null;
  setSelectedSubscription: (subscription: SubscriptionPlanDto | null) => void;
  refreshSubscriptions: () => void;
}

// Subscription stats type
export interface SubscriptionStats {
  totalPlans: number;
  activePlans: number;
  visiblePlans: number;
  popularPlans: number;
  monthlyPlans: number;
  yearlyPlans: number;
  averagePrice: number;
}
