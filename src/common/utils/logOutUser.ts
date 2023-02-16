import { ROUTE_PATHS } from "../../App";

export const logOutUser = () => {
  localStorage.clear();
  window.location.replace(ROUTE_PATHS.Login);
};
