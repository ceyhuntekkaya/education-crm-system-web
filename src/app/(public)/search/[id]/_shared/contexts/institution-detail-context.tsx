"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { formatCurrency, renderStars } from "../utils";
import {
  useInstitutionDetailHook,
  useInstitutionPricingHook,
  useInstitutionCampaigns,
  useInstitutionGalleries,
  useInstitutionPosts,
  useInstitutionProperties,
  GroupedInstitutionProperty,
  useAppointmentData,
} from "../hooks";
import { AppointmentSlotDto } from "@/types";

// Context State Interface
interface InstitutionDetailState {
  institutionDetail: any;
  school: any;
  campus: any;
  brand: any;
  pricings: any;
  customFees: any[];
  campaigns: any[];
  galleries: any[];
  posts: any[];
  // Properties
  institutionProperties: GroupedInstitutionProperty[];
  isPropertiesLoading: boolean;
  propertiesError: string | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  // Utility functions
  renderStars: typeof renderStars;
  formatCurrency: typeof formatCurrency;
  // Appointment data
  appointmentSlots: AppointmentSlotDto[];
  appointmentSlotsLoading: boolean;
  appointmentSlotsError: string | null;
  currentAppointment: AppointmentSlotDto | null;
  currentAppointmentLoading: boolean;
  currentAppointmentError: string | null;
  hasCurrentAppointment: boolean;
  hasFutureAppointment: boolean;
  refetchAppointmentSlots: () => void;
  refetchCurrentAppointment: () => void;
}

// Context Props Interface
interface InstitutionDetailContextProps {
  id: string;
  children: ReactNode;
}

// Create Context
const InstitutionDetailContext = createContext<
  InstitutionDetailState | undefined
>(undefined);

// Provider Component
export function InstitutionDetailProvider({
  id,
  children,
}: InstitutionDetailContextProps) {
  // Institution detail hook'unu kullan
  const {
    institutionDetail,
    loading: institutionLoading,
    error: institutionError,
    refetch: refetchInstitution,
  } = useInstitutionDetailHook({ id });

  // Pricing hook'unu kullan (YORUM: Artık institutionDetail.pricings kullanılıyor)
  // const {
  //   pricings: pricingData,
  //   loading: pricingLoading,
  //   error: pricingError,
  //   refetch: refetchPricing,
  // } = useInstitutionPricingHook({ schoolId: id });

  // Campaigns hook'unu kullan
  const {
    campaigns: campaignsData,
    loading: campaignsLoading,
    error: campaignsError,
    refetch: refetchCampaigns,
  } = useInstitutionCampaigns({ schoolId: id });

  // Galleries hook'unu kullan
  const {
    galleries: galleriesData,
    loading: galleriesLoading,
    error: galleriesError,
    refetch: refetchGalleries,
  } = useInstitutionGalleries({ schoolId: id });

  // Posts hook'unu kullan
  const {
    posts: postsData,
    loading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useInstitutionPosts({ schoolId: id });

  // Properties hook'unu kullan
  const {
    groupedProperties: propertiesData,
    loading: propertiesLoading,
    error: propertiesError,
    refetch: refetchProperties,
  } = useInstitutionProperties({ schoolId: id });

  // Appointment data hook'unu kullan - TEK SEFERLIK
  const {
    slots: appointmentSlots,
    slotsLoading: appointmentSlotsLoading,
    slotsError: appointmentSlotsError,
    refetchSlots: refetchAppointmentSlots,
    currentAppointment,
    currentAppointmentLoading,
    currentAppointmentError,
    refetchCurrentAppointment,
    hasCurrentAppointment,
    hasFutureAppointment,
  } = useAppointmentData({
    schoolId: id,
    enabled: true,
  });

  // school = tüm institution detail datası
  // campus, brand, pricings, customFees = nested objeler
  const school = institutionDetail;
  const campus = institutionDetail?.campus || null;
  const brand = institutionDetail?.brand || null;
  const pricings = institutionDetail?.pricings || [];
  const customFees = institutionDetail?.customFees || [];

  const contextValue: InstitutionDetailState = {
    institutionDetail,
    school: school,
    campus: campus,
    brand: brand,
    pricings: pricings, // institutionDetail.pricings'den alınıyor
    customFees: customFees, // institutionDetail.customFees'den alınıyor
    campaigns: campaignsData || [],
    galleries: galleriesData || [],
    posts: postsData || [],
    institutionProperties: propertiesData || [],
    isPropertiesLoading: propertiesLoading,
    propertiesError: propertiesError,
    loading:
      institutionLoading ||
      // pricingLoading || // YORUM: Artık pricing ayrı hook'tan gelmiyor
      campaignsLoading ||
      galleriesLoading ||
      postsLoading ||
      propertiesLoading,
    error:
      institutionError ||
      // pricingError || // YORUM: Artık pricing ayrı hook'tan gelmiyor
      campaignsError ||
      galleriesError ||
      postsError ||
      propertiesError,
    refetch: () => {
      refetchInstitution();
      // refetchPricing(); // YORUM: Artık pricing ayrı hook'tan gelmiyor
      refetchCampaigns();
      refetchGalleries();
      refetchPosts();
      refetchProperties();
      refetchAppointmentSlots();
      refetchCurrentAppointment();
    },
    renderStars,
    formatCurrency,
    // Appointment data
    appointmentSlots,
    appointmentSlotsLoading,
    appointmentSlotsError,
    currentAppointment,
    currentAppointmentLoading,
    currentAppointmentError,
    hasCurrentAppointment,
    hasFutureAppointment,
    refetchAppointmentSlots,
    refetchCurrentAppointment,
  };

  return (
    <InstitutionDetailContext.Provider value={contextValue}>
      {children}
    </InstitutionDetailContext.Provider>
  );
}

// Custom Hook to use Context
export function useInstitutionDetail(): InstitutionDetailState {
  const context = useContext(InstitutionDetailContext);

  if (context === undefined) {
    throw new Error(
      "useInstitutionDetail must be used within an InstitutionDetailProvider"
    );
  }

  return context;
}

export default InstitutionDetailContext;
