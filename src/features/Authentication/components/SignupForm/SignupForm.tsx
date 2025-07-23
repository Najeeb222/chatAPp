import React from "react";
import {
  Box,
  Paper,
  Stack,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { CustomRadioGroup, CustomTextfield } from "components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constant";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firebaseDb } from "libs/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  online: boolean;
};

console.log(auth, "this is auth");
const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      online: true,
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const password = watch("password");

  const handleData = async (data: SignupFormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      await updateProfile(user, { displayName: data.name });

      // ✅ Save role to Firestore
      await setDoc(doc(firebaseDb, "users", user.uid), {
        name: data.name,
        email: data.email,
        createdAt: Timestamp.now(),
        online: true,
      });

      navigate(ROUTES.HOME);
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleData)}>
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
                Create a new account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign up with your details below.
              </Typography>

              <CustomTextfield
                name="name"
                label="Full Name"
                placeholder="John Doe"
                type="text"
                rules={{
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                }}
                autoComplete="name"
              />

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
                autoComplete="new-password"
              />

              <CustomTextfield
                name="confirmPassword"
                label="Confirm Password"
                placeholder="••••••••"
                type="password"
                rules={{
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }}
                autoComplete="new-password"
              />
              {/* <CustomRadioGroup
                name="role"
                label="Select Role"
                options={[
                  { label: "User", value: "user" },
                  { label: "Admin", value: "admin" },
                ]}
                rules={{ required: "Role is required" }}
              /> */}

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{ textTransform: "none", fontWeight: 600, mt: 1 }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign Up"
                )}
              </Button>

              <Typography variant="body2" color="text.secondary" align="center">
                Already have an account?{" "}
                <Box
                  component="span"
                  sx={{ color: "primary.main", cursor: "pointer" }}
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  Sign in
                </Box>
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </form>
    </FormProvider>
  );
};

export default SignupForm;
