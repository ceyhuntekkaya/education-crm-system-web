/**
 * User Register Form Data Types
 * 3 adımlı basit kayıt formu (Giriş Bilgileri, Kişisel Bilgiler, Doğrulama, Success)
 */

import { UserType } from "@/enums/UserType";

/**
 * Step 1: Login Bilgileri
 */
export interface LoginCredentials {
  email: string;
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
 * Tüm form verilerini içeren ana tip
 */
export interface UserRegisterFormData {
  loginCredentials: LoginCredentials;
  personalInfo: PersonalInfo;
  verificationCode: VerificationCode;
  userType: UserType;
}

/**
 * Step configuration type
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
 * Step navigation type
 */
export interface StepNavigation {
  currentStep: number;
  totalSteps: number;
  canGoNext: boolean;
  canGoPrev: boolean;
}
