import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form"; // adjust path if needed
import { CustomTextfield } from "components";
import { ROUTES } from "constant";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "libs/firebase";

type LoginFormValues = {
  email: string;
  password: string;
  
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

   

console.log(user, 'this is the user in login form')

      navigate(ROUTES.HOME);
    } catch (error: any) {
      console.error("Signup failed:", error);
      alert(error.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} >

      
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ backgroundColor: "#f5f5f5" }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            width: "100%",
            maxWidth: 400,
            borderRadius: 2,
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={600}>
              Sign in to your account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome back! Please enter your details.
            </Typography>

            <CustomTextfield
              name="email"
              label="Email Address"
              placeholder="you@example.com"
              type="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              }}
              autoComplete="email"
            />

            <CustomTextfield
              name="password"
              label="Password"
              placeholder="••••••••"
              type="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
             
              disabled={isSubmitting}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                mt: 1,
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>

            <Typography variant="body2" color="text.secondary" align="center">
              Don't have an account?{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", cursor: "pointer" }}
                onClick={() => navigate(ROUTES.SINGUP)}
              >
                Sign up
              </Box>
            </Typography>
          </Stack>
        </Paper>
      </Box>
      </form>
    </FormProvider>
  );
};
export default LoginForm;
