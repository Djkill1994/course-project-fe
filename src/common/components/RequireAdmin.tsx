import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuthRefreshQuery } from "../../features/Profile/api/user.api";
import { Box, CircularProgress } from "@mui/material";

interface IRequireAuthProps {
  children: JSX.Element;
}

export const RequireAdmin: FC<IRequireAuthProps> = ({ children }) => {
  const { data, isError } = useAuthRefreshQuery();

  if (data?.role === "user" || isError) {
    return <Navigate to="/" replace />;
  }

  if (data?.role === "admin") {
    return children;
  }

  return (
    <Box display="flex" justifyContent="space-evenly">
      <CircularProgress />
    </Box>
  );
};
