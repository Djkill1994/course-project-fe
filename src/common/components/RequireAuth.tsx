import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuthRefreshQuery } from "../../features/Profile/api/user.api";
import { Box, CircularProgress } from "@mui/material";

interface IRequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth: FC<IRequireAuthProps> = ({ children }) => {
  const { isError, isSuccess } = useAuthRefreshQuery();

  if (isError) {
    return <Navigate to="/" replace />;
  }

  if (isSuccess) {
    return children;
  }

  return (
    <Box display="flex" justifyContent="space-evenly">
      <CircularProgress />
    </Box>
  );
};
