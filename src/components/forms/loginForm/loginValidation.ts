import { isLength, isEmail } from "../../../validation/inputValidation";
import { LoginFormValues } from "./LoginForm";

export interface LoginFormErrors {
  email?: string | undefined;
  password?: string | undefined;
  otherError?: string | undefined;
}

const validateLoginForm = (values: LoginFormValues) => {
  const loginFormErrors: LoginFormErrors = {};

  if (!isEmail(values.email)) {
    loginFormErrors.email = "Please enter a valid email";
  }

  if (!isLength(values.password, 5, 15)) {
    loginFormErrors.password = "Invalid password";
  }
  return loginFormErrors;
};

export default validateLoginForm;
