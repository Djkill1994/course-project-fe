import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { RequireAuth } from "./common/components/RequireAuth";
import { UserListPage } from "./features/Admin/components/UserListPage";
import { Box } from "@mui/material";
import { RegistrationPage } from "./features/Auth/components/RegistrationPage";
import { HomePage } from "./features/Home/components/HomePage";
import { MyCollectionsPage } from "./features/Collection/components/MyCollectionsPage";
import { CollectionPage } from "./features/Collection/components/CollectionPage";
import { Header } from "./common/components/Header";
import { ProfilePage } from "./features/Profile/components/ProfilePage";
import { Items } from "./features/Items/components/Items";
import { LoginPage } from "./features/Auth/components/LoginPage";
import { RequireAdmin } from "./common/components/RequireAdmin";
import { FoundTags } from "./features/Home/components/FoundTags";

export const ROUTE_PATHS = {
  Home: "/",
  Login: "/login",
  Registration: "/registration",
  Admin: "/admin",
  Collection: "/collections/:userId",
  CollectionId: "/collection/:userId/:id",
  MyProfile: "/me/:id",
  Items: "/collection/:collectionId/:collectionName/items",
  Item: "/item",
  FoundTags: "/tag/:id",
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
          <Route path={ROUTE_PATHS.Home} element={<HomePage />} />
          <Route
            path={ROUTE_PATHS.MyProfile}
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTE_PATHS.Collection}
            element={
              <RequireAuth>
                <MyCollectionsPage />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTE_PATHS.CollectionId}
            element={
              <RequireAuth>
                <CollectionPage />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTE_PATHS.Admin}
            element={
              <RequireAdmin>
                <UserListPage />
              </RequireAdmin>
            }
          />
          <Route path={ROUTE_PATHS.Items} element={<Items />} />
          <Route path={ROUTE_PATHS.FoundTags} element={<FoundTags />} />
        </Routes>
      </Box>
    </Box>
  );
};
