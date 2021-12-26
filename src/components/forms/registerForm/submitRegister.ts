import { RegisterFormErrors } from "./registerFormValidation";
import { RegisterFormValues } from "./RegisterForm";
import { BASE_API_URL } from "../../..";

interface RegisterResult {
  success: boolean;
  exceptionError?: any;
  errors?: RegisterFormErrors;
}

export const submitRegisterForm = async (values: RegisterFormValues) => {
  const requestBody = JSON.stringify(values);

  try {
    const response = await fetch(`${BASE_API_URL}/register`, {
      method: "POST",
      body: requestBody,
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response) throw new Error("An error has occured. Please try later");
    const parsedResponse = await response.json();
    if (parsedResponse.success) return { success: true } as RegisterResult;

    const errors: any = {};
    errors.errors = {};
    for (const path in parsedResponse.errors) {
      errors.errors[path] = parsedResponse.errors[path].message;
    }
    errors["success"] = false;
    return errors as RegisterResult;
  } catch (error) {
    const result: RegisterResult = { exceptionError: error, success: false };
    return result;
  }
};
