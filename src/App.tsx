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
import { Item } from "./features/Items/components/Item";
import { Items } from "./features/Items/components/Items";
import { LoginPage } from "./features/Auth/components/LoginPage";

export const ROUTE_PATHS = {
  Home: "/",
  Login: "/login",
  Registration: "/registration",
  Admin: "/admin",
  Collection: "/collections",
  CollectionId: "/collection/:id",
  MyProfile: "/me/:id",
  Items: "/collection/:id/items",
  Item: "/item",
};

// todo добавить Collapse на карточки коллекции и айтема, защитить роут Admin

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
              <RequireAuth>
                <UserListPage />
              </RequireAuth>
            }
          />
          <Route path={ROUTE_PATHS.Items} element={<Items />} />
          <Route path={ROUTE_PATHS.Item} element={<Item />} />
        </Routes>
      </Box>
    </Box>
  );
};
