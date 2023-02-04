import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { LoginPage } from "./features/Auth/components/LoginPage";
import { RequireAuth } from "./common/components/RequireAuth";
import { UserListPage } from "./features/Admin/components/UserListPage";
import { Box } from "@mui/material";
import { RegistrationPage } from "./features/Auth/components/RegistrationPage";
import { Home } from "./features/Home";

export const ROUTE_PATHS = {
  Home: "/",
  Login: "login",
  Registration: "registration",
  Admin: "admin",
};

export const App: FC = () => {
  return (
    <Box height="100vh" bgcolor="#FAFAFA">
      <Toaster position="top-right" />
      <Routes>
        <Route path={ROUTE_PATHS.Home} element={<Home />} />
        <Route path={ROUTE_PATHS.Login} element={<LoginPage />} />
        <Route path={ROUTE_PATHS.Registration} element={<RegistrationPage />} />
        <Route
          path={ROUTE_PATHS.Admin}
          element={
            <RequireAuth>
              <UserListPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Box>
  );
};
