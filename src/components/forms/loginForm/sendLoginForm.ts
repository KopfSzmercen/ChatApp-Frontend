import { LoginFormErrors } from "./loginValidation";
import { LoginFormValues } from "./LoginForm";
import { BASE_API_URL } from "../../..";

interface LoginResult {
  success: boolean;
  exceptionError?: any;
  errors?: LoginFormErrors;
  authToken?: string;
  userId?: string;
  username?: string;
  chatRoomId?: string;
}

const sendLoginForm = async (data: LoginFormValues) => {
  const requestBody = JSON.stringify(data);

  try {
    const response = await fetch(`${BASE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: requestBody
    });
    if (!response) throw new Error("An error has occured. Please try later");

    const parsedResponse = await response.json();
    if (parsedResponse.success) {
      return {
        success: true,
        authToken: parsedResponse.authToken,
        userId: parsedResponse.userId,
        username: parsedResponse.username
      } as LoginResult;
    }
    const errors: any = {};
    errors.errors = {};
    for (const path in parsedResponse.errors) {
      errors.errors[path] = parsedResponse.errors[path].message;
    }
    errors.success = false;
    return errors as LoginResult;
  } catch (error) {
    const result: LoginResult = { exceptionError: error, success: false };
    return result;
  }
};

export default sendLoginForm;
