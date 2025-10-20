"use client";

import { createContext, useContext, ReactNode } from "react";
import { MembershipContextType, MembershipPlan } from "../types";
import { useMembershipBilling } from "../hooks";

const membershipPlans: MembershipPlan[] = [
  {
    id: "basic",
    name: "Temel Plan",
    icon: "ph ph-house",
    price: {
      monthly: 299,
      yearly: 2520, // %30 indirim ile
    },
    features: [
      { id: "students", text: "Aylık 25 öğrenciye kadar", included: true },
      { id: "reporting", text: "Temel raporlama sistemi", included: true },
      { id: "email_support", text: "E-posta desteği", included: true },
      { id: "basic_features", text: "Temel CRM özellikleri", included: true },
      { id: "messaging", text: "Mesajlaşma sistemi", included: false },
      { id: "advanced_analytics", text: "Gelişmiş analitik", included: false },
    ],
    buttonText: "Başlayın",
    buttonLink: "/auth/register?plan=basic",
  },
  {
    id: "standard",
    name: "Standart Plan",
    icon: "ph-bold ph-tag",
    price: {
      monthly: 499,
      yearly: 4190, // %30 indirim ile
    },
    isPopular: true,
    features: [
      { id: "students", text: "Aylık 100 öğrenciye kadar", included: true },
      { id: "reporting", text: "Gelişmiş raporlama sistemi", included: true },
      {
        id: "priority_support",
        text: "Öncelikli e-posta desteği",
        included: true,
      },
      { id: "all_basic", text: "Tüm temel özellikler", included: true },
      { id: "messaging", text: "Mesajlaşma sistemi", included: true },
      { id: "integrations", text: "Temel entegrasyonlar", included: true },
    ],
    buttonText: "En Popüler",
    buttonLink: "/auth/register?plan=standard",
  },
  {
    id: "premium",
    name: "Premium Plan",
    icon: "ph-bold ph-piggy-bank",
    price: {
      monthly: 799,
      yearly: 6710, // %30 indirim ile
    },
    features: [
      {
        id: "unlimited_students",
        text: "Sınırsız öğrenci kapasitesi",
        included: true,
        highlight: true,
      },
      {
        id: "advanced_analytics",
        text: "Gelişmiş analitik ve raporlama",
        included: true,
      },
      {
        id: "custom_integrations",
        text: "Özel entegrasyonlar",
        included: true,
      },
      { id: "all_features", text: "Tüm premium özellikler", included: true },
      {
        id: "priority_support",
        text: "7/24 öncelikli destek",
        included: true,
        highlight: true,
      },
      { id: "custom_branding", text: "Özel marka ayarları", included: true },
    ],
    buttonText: "Premium Başlat",
    buttonLink: "/auth/register?plan=premium",
  },
];

const MembershipContext = createContext<MembershipContextType | undefined>(
  undefined
);

interface MembershipProviderProps {
  children: ReactNode;
}

export const MembershipProvider = ({ children }: MembershipProviderProps) => {
  const billing = useMembershipBilling();

  const value: MembershipContextType = {
    plans: membershipPlans,
    ...billing,
  };

  return (
    <MembershipContext.Provider value={value}>
      {children}
    </MembershipContext.Provider>
  );
};

export const useMembership = () => {
  const context = useContext(MembershipContext);

  if (context === undefined) {
    throw new Error(
      "useMembership hook'u MembershipProvider içinde kullanılmalıdır"
    );
  }

  return context;
};
