/**
 * Register Form Data Types
 * 6 adımlı kayıt formu için tip tanımlamaları
 */

import { UserType } from "@/enums/UserType";

/**
 * Step 1: Login Bilgileri
 */
export interface LoginCredentials {
  username: string;
  password: string;
  confirmPassword: string;
}

/**
 * Step 2: Kişisel Bilgiler
 */
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/**
 * Step 3: Doğrulama Kodu
 */
export interface VerificationCode {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
}

/**
 * Step 4: Kampüs Bilgileri
 */
export interface CampusInfo {
  brandId: number | null;
  campusName: string;
  countryId: number | null;
  provinceId: number | null;
  districtId: number | null;
  neighborhoodId: number | null;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
}

/**
 * Step 5: Paket Seçimi
 */
export interface PackageSelection {
  selectedPlanId: string | null;
  billingPeriod: "monthly" | "quarterly" | "yearly";
}

/**
 * Step 6: Ödeme Bilgileri
 */
export interface PaymentInfo {
  cardHolderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  acceptMarketing: boolean;
}

/**
 * Tüm form verilerini içeren ana tip
 */
export interface RegisterFormData {
  // Step 1
  loginCredentials: LoginCredentials;

  // Step 2
  personalInfo: PersonalInfo;

  // Step 3
  verificationCode: VerificationCode;

  // Step 4
  campusInfo: CampusInfo;

  // Step 5
  packageSelection: PackageSelection;

  // Step 6
  paymentInfo: PaymentInfo;

  // Ek alanlar
  userType: UserType;
}

/**
 * Stepper adım tipi
 */
export interface StepConfig {
  step: number;
  title: string;
  description: string;
  icon: string;
  isCompleted: boolean;
  isActive: boolean;
}

/**
 * Plan özelliği
 */
export interface PlanFeature {
  id: string;
  text: string;
  included: boolean;
}

/**
 * Plan fiyat bilgisi
 */
export interface PlanPrice {
  monthly: number;
  quarterly?: number;
  yearly: number;
}

/**
 * Subscription Plan
 * Paket seçimi için plan bilgileri
 */
export interface Plan {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  price: PlanPrice;
  features: PlanFeature[];
  isPopular?: boolean;
}

/**
 * API Response Types
 */
export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    userId: number;
    email: string;
    token?: string;
  };
}

export interface VerificationCodeResponse {
  success: boolean;
  message: string;
  codeSent: boolean;
}

export interface VerificationCheckResponse {
  success: boolean;
  message: string;
  verified: boolean;
}
