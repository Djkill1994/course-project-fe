import { isRejectedWithValue, Middleware, isFulfilled } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const rtkQueryMessenger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.error(`${action.payload.data.message}`);
  }
  if (isFulfilled(action) && action.payload.message) {
    toast.success(`${action.payload.message}`);
  }
  return next(action);
};
