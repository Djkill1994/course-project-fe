import { isFulfilled, isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const REFRESH_ERROR = "Refresh error";

export const rtkQueryMessenger: Middleware = () => (next) => (action) => {
  if (
    isRejectedWithValue(action) &&
    action.payload.data?.message &&
    action.payload.data?.message !== REFRESH_ERROR
  ) {
    toast.error(action.payload.data.message);
  }
  if (isFulfilled(action) && action.payload.message) {
    toast.success(action.payload.message);
  }
  return next(action);
};
