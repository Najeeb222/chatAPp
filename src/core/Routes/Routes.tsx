import { ROUTES } from "constant";
import { PublicRoutes, SecureRoutes } from "hocs";
import { ChatAppLayout } from "layout";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import { ChatWindow, Login, SignUp } from "screens";

const Routes = () => {
  return (
    <ReactRoutes>
      {/* Public routes that don't have the main app layout */}
      <Route element={<PublicRoutes />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SINGUP} element={<SignUp />} />
      </Route>

      {/* Secure routes that are wrapped in the main app layout */}
      <Route element={<SecureRoutes />}>
        <Route element={<ChatAppLayout />}>
          <Route path={ROUTES.HOME} element={<ChatWindow />} />
          <Route path={`${ROUTES.CHAT}/:chatId`} element={<ChatWindow />} />
        </Route>
      </Route>
    </ReactRoutes>
  );
};

export default Routes;
