/**
 * Teacher & Instructor Register Form Data Types
 * 2 adımlı basit kayıt formu (Giriş Bilgileri, Kişisel Bilgiler, Success)
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
  phone: string;
}

/**
 * Tüm form verilerini içeren ana tip
 */
export interface TeacherRegisterFormData {
  loginCredentials: LoginCredentials;
  personalInfo: PersonalInfo;
  registrationType: UserType.TEACHER | UserType.INSTRUCTOR;
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
