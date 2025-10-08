"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { SubscriptionPlanDto } from "@/types/dto/subscription/SubscriptionPlanDto";
import { SubscriptionContextType } from "../types";
import { mockSubscriptions } from "../mock";

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export const useSubscriptionContext = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscriptionContext must be used within a SubscriptionProvider"
    );
  }
  return context;
};

interface SubscriptionProviderProps {
  children: React.ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  children,
}) => {
  const [subscriptions, setSubscriptions] =
    useState<SubscriptionPlanDto[]>(mockSubscriptions);
  const [loading, setLoading] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionPlanDto | null>(null);

  const refreshSubscriptions = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubscriptions(mockSubscriptions);
    } catch (error) {
      console.error("Error refreshing subscriptions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value: SubscriptionContextType = {
    subscriptions,
    loading,
    selectedSubscription,
    setSelectedSubscription,
    refreshSubscriptions,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
