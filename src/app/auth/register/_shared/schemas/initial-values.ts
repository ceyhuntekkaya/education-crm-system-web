import { RegisterFormData } from "../types";
import { UserType } from "@/enums/UserType";

/**
 * Register form initial values
 */
export const initialValues: RegisterFormData = {
  loginCredentials: {
    username: "",
    password: "",
    confirmPassword: "",
  },
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  verificationCode: {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
  },
  campusInfo: {
    brandId: null,
    campusName: "",
    countryId: null,
    provinceId: null,
    districtId: null,
    neighborhoodId: null,
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
  },
  packageSelection: {
    selectedPlanId: null,
    billingPeriod: "monthly",
  },
  paymentInfo: {
    cardHolderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    acceptTerms: false,
    acceptPrivacy: false,
    acceptMarketing: false,
  },
  userType: UserType.INSTITUTION_USER,
};
