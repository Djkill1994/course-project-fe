import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "./features/Auth/api/login.api";
import { usersApi } from "./features/Admin/api/users.api";
import { rtkQueryMessenger } from "./common/middleware/rtkQueryMessenger";
import { registrationApi } from "./features/Auth/api/registration.api";
import { collectionApi } from "./features/Collection/api/collections.api";

export const store = configureStore({
  reducer: {
    [registrationApi.reducerPath]: registrationApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      rtkQueryMessenger,
      registrationApi.middleware,
      loginApi.middleware,
      usersApi.middleware,
      collectionApi.middleware
    ),
});

setupListeners(store.dispatch);
