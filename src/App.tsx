import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { LoginPage } from "./features/Auth/components/LoginPage";
import { RequireAuth } from "./common/components/RequireAuth";
import { UserListPage } from "./features/Admin/components/UserListPage";
import { Box } from "@mui/material";
import { RegistrationPage } from "./features/Auth/components/RegistrationPage";
import { HomePage } from "./features/Home/components/HomePage";
import { MyCollectionsPage } from "./features/Collection/components/MyCollectionsPage";
import { CollectionPage } from "./features/Collection/components/CollectionPage";
import { Header } from "./common/components/Header";
import { ProfilePage } from "./features/Profile/components/ProfilePage";

export const ROUTE_PATHS = {
  Home: "/",
  Login: "/login",
  Registration: "/registration",
  Admin: "/admin",
  Collection: "/collections",
  CollectionId: "/collections/:id",
  MyProfile: "/me/:id",
};

export const App: FC = () => {
  return (
    <Box height="100vh">
      <Toaster position="top-right" />
      <Header />
      <Box m="22px 0">
        <Routes>
          <Route path={ROUTE_PATHS.Login} element={<LoginPage />} />
          <Route
            path={ROUTE_PATHS.Registration}
            element={<RegistrationPage />}
          />
          <Route path={ROUTE_PATHS.MyProfile} element={<ProfilePage />} />
          <Route path={ROUTE_PATHS.Home} element={<HomePage />} />
          <Route
            path={ROUTE_PATHS.Collection}
            element={<MyCollectionsPage />}
          />
          <Route path={ROUTE_PATHS.CollectionId} element={<CollectionPage />} />
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
    </Box>
  );
};
