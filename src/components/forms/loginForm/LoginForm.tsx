import {
  Paper,
  TextField,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../contexts/AppStateProvider";
import { useSocket } from "../../../contexts/SocketProvider";
import validateLoginForm from "./loginValidation";
import sendLoginForm from "./sendLoginForm";

export interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const redirectToLogin = () => {
    navigate("/register");
  };

  const { setAppState } = useAppContext();

  const [isExceptionError, setIsExceptionError] = useState<null | string>(null);

  const loginFormInitialValues: LoginFormValues = {
    email: "",
    password: ""
  };

  const formik = useFormik({
    initialValues: { ...loginFormInitialValues },
    validate: validateLoginForm,
    onSubmit: async (values) => {
      formik.isSubmitting = true;
      setIsExceptionError(null);
      const sendingResult = await sendLoginForm(values);
      if (!sendingResult) return setIsExceptionError("Error. Please try later");
      formik.isSubmitting = false;

      if (sendingResult.success) {
        setAppState({
          authToken: sendingResult.authToken!,
          username: sendingResult.username!,
          userId: sendingResult.userId!,
          users: [],
          socketId: socket?.id || ""
        });
        navigate("/main", { replace: true });
      }
      if (sendingResult.errors) {
        formik.setErrors({ ...sendingResult.errors });
        if (sendingResult.errors!.otherError)
          setIsExceptionError(sendingResult.errors!.otherError);
      }
    }
  });

  const disableButton =
    formik.errors.email || formik.errors.password ? true : false;

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
          Login
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
          placeholder="Password"
          aria-label="password"
          fullWidth
          margin="normal"
          type="password"
          {...formik.getFieldProps("password")}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Box sx={{ marginTop: "25px", textAlign: "center" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography>You don't have an account?</Typography>
            <Button aria-label="log in" onClick={redirectToLogin}>
              Register
            </Button>
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
              Login
            </Button>
          )}
        </Box>
      </Paper>
    </form>
  );
};

export default LoginForm;
