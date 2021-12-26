import { RegisterFormValues } from "./RegisterForm";
import { isEmail, isLength } from "../../../validation/inputValidation";

export interface RegisterFormErrors {
  email?: string | undefined;
  username?: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
}

const registerFormValidationFunction = (
  values: RegisterFormValues
): RegisterFormErrors => {
  const errors: RegisterFormErrors = {};

  if (!isEmail(values.email)) errors.email = "Please enter a valid email";
  if (!isLength(values.username, 2, 25)) {
    errors.username = "Username has to be between 5 and 15 characters long.";
  }
  if (!isLength(values.password, 2, 15)) {
    errors.password = "Password has to be between 5 and 15 characters long.";
  }

  if (!errors.password && values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords have to march.";
  }
  return errors;
};

export default registerFormValidationFunction;
