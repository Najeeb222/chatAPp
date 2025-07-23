import React, { useContext } from "react";
import { ROUTES } from "constant";
import { Outlet, Navigate, useLocation } from "react-router-dom";
// import { useAuthContext } from 'context/AuthContext';
import { Box, CircularProgress } from "@mui/material";
import { AuthContextData } from "context";
// import { AuthUserContext } from "context";

const SecureRoutes: React.FC = () => {
  const { firebaseUser, authLoading } = useContext(AuthContextData);

  // console.log("authLoading:", authLoading, "firebaseUser:", firebaseUser);
  const location = useLocation();

  console.log(location.pathname, "location.pathname");

  const publicPaths = [ROUTES.LOGIN, ROUTES.SINGUP];
  const isPublicPath = publicPaths.includes(location.pathname);

  if (authLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  //
  //   if (!firebaseUser) {
  //   return <Navigate to={ROUTES.LOGIN} />;
  // }

  // return <Outlet />;
  //   // if (!firebaseUser) {
  //   //   <Navigate to={ROUTES.LOGIN} />;
  // if (firebaseUser) {
  //   return <Outlet />;
  // } else {
  //   return <Navigate to={ROUTES.LOGIN} replace />;
  // }
  if (firebaseUser && isPublicPath) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  if (!firebaseUser && !isPublicPath) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};
// };

export default SecureRoutes;
