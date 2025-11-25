import { UserRegisterFormData } from "../types";
import { UserType } from "@/enums/UserType";

/**
 * User register form initial values
 */
export const initialValues: UserRegisterFormData = {
  loginCredentials: {
    email: "",
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
  userType: UserType.PARENT,
};
