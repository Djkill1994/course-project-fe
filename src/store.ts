import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./features/Auth/api/auth.api";
import { usersApi } from "./features/Admin/api/users.api";
import { rtkQueryMessenger } from "./common/middleware/rtkQueryMessenger";
import { collectionApi } from "./features/Collection/api/collections.api";
import { userApi } from "./features/Profile/api/user.api";
import { itemApi } from "./features/Items/api/item.api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      rtkQueryMessenger,
      authApi.middleware,
      usersApi.middleware,
      userApi.middleware,
      collectionApi.middleware,
      itemApi.middleware
    ),
});

setupListeners(store.dispatch);
