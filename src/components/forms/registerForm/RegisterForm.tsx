import {
  Paper,
  TextField,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  AlertTitle
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerFormValidationFunction from "./registerFormValidation";
import { submitRegisterForm } from "./submitRegister";

export interface RegisterFormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/");
  };

  const [successfulRegister, setSuccessfullRegister] = useState(false);
  const [isExceptionError, setIsExceptionError] = useState<boolean | string>(
    false
  );

  const registerFormInitialValues: RegisterFormValues = {
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  };

  const formik = useFormik({
    initialValues: { ...registerFormInitialValues },
    validate: registerFormValidationFunction,
    onSubmit: async (values) => {
      formik.isSubmitting = true;
      setSuccessfullRegister(false);
      setIsExceptionError(false);
      const sendingResult = await submitRegisterForm(values);
      formik.isSubmitting = false;
      if (sendingResult.success) {
        setSuccessfullRegister(true);
        formik.resetForm({ values: registerFormInitialValues });
      }
      if (sendingResult.errors) formik.setErrors({ ...sendingResult.errors });
      else if (sendingResult.exceptionError) {
        console.log(sendingResult.exceptionError);
        setIsExceptionError(sendingResult.exceptionError.message);
      }
    }
  });

  const disableButton =
    formik.errors.email ||
    formik.errors.username ||
    formik.errors.password ||
    formik.errors.confirmPassword
      ? true
      : false;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper
        sx={{
          width: "80%",
          maxWidth: "420px",
          margin: "50px auto",
          padding: "15px 25px"
        }}
      >
        <Typography variant="h4" align="center">
          Register
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Email"
          type="email"
          aria-label="email"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          variant="outlined"
          placeholder="Username"
          aria-label="username"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("username")}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />

        <TextField
          variant="outlined"
          placeholder="Password"
          aria-label="password"
          fullWidth
          margin="normal"
          type="password"
          {...formik.getFieldProps("password")}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          variant="outlined"
          placeholder="Confirm password"
          aria-label="confirm password"
          fullWidth
          margin="normal"
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />

        <Box sx={{ marginTop: "25px", textAlign: "center" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography>Do you already have an account?</Typography>
            <Button aria-label="log in" onClick={redirectToLogin}>
              Log in
            </Button>
            {successfulRegister && (
              <Alert
                severity="success"
                sx={{
                  marginY: "10px 10px",
                  display: "grid",
                  placeItems: "center"
                }}
              >
                <AlertTitle>Success!</AlertTitle>
                Registering successfull
              </Alert>
            )}

            {isExceptionError && (
              <Alert
                severity="error"
                sx={{
                  marginY: "10px 10px",
                  display: "grid",
                  placeItems: "center"
                }}
              >
                {isExceptionError}
              </Alert>
            )}
          </Box>
          {formik.isSubmitting ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              sx={{ marginTop: "15px" }}
              disabled={disableButton}
              type="submit"
            >
              Register
            </Button>
          )}
        </Box>
      </Paper>
    </form>
  );
};

export default RegisterForm;
