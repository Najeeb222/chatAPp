import React, { useContext } from "react";
import { ROUTES } from "constant";
import { Outlet, Navigate } from "react-router-dom";
// import { useAuthContext } from 'context/AuthContext';
import { Box, CircularProgress } from "@mui/material";
import { AuthContextData } from "context";
// import { AuthContextData } from "context/AuthContext";

// import { AuthUserContext } from "context";

const NormalRoutes: React.FC = () => {
  const { firebaseUser, authLoading } = useContext(AuthContextData);

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
  return !firebaseUser ? <Outlet /> : <Navigate to={ROUTES.HOME} />;
};

export default NormalRoutes;
