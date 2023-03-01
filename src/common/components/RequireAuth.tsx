import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuthRefreshQuery } from "../../features/Profile/api/user.api";
import { Box, CircularProgress } from "@mui/material";

interface IRequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth: FC<IRequireAuthProps> = ({ children }) => {
  const { data } = useAuthRefreshQuery();
  const params = useParams();

  if (data?.id === params.userId || data?.role === "admin") {
    return children;
  }

  console.log(data?.id !== params.userId || data?.role !== "admin");
  if (data?.id !== params.userId) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box display="flex" justifyContent="space-evenly">
      <CircularProgress />
    </Box>
  );
};
