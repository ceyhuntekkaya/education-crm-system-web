import { TeacherRegisterFormData } from "../types";
import { UserType } from "@/enums/UserType";

/**
 * Teacher/Instructor register form initial values
 */
export const getInitialValues = (
  registrationType: UserType.TEACHER | UserType.INSTRUCTOR,
): TeacherRegisterFormData => ({
  loginCredentials: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  personalInfo: {
    firstName: "",
    lastName: "",
    phone: "",
  },
  registrationType,
});
