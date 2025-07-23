import { ThemeProvider } from "@emotion/react";
import Routes from "../Routes/Routes";
import theme from "styles/theme";
import "./../../styles/index.css";
// import AuthContext from "context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { AuthContext } from "context";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "context/AuthContext";
// import { AuthContext } from "context";
// import { AuthUserContextProvider } from "context/AuthContext";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContext>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </AuthContext>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
