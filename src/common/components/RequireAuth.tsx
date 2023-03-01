import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuthRefreshQuery } from "../../features/Profile/api/user.api";
import { Box, CircularProgress } from "@mui/material";

interface IRequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth: FC<IRequireAuthProps> = ({ children }) => {
  const { data, isLoading } = useAuthRefreshQuery();
  const params = useParams();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="space-evenly">
        <CircularProgress />
      </Box>
    );
  }

  if (data?.id !== params.userId && data?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};
