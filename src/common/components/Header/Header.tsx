import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthRefreshQuery } from "../../../features/Admin/api/users.api";

export const Header: FC = () => {
  const navigate = useNavigate();
  const { data } = useAuthRefreshQuery();

  const logOut = (): void => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <Stack
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      height="50px"
      bgcolor="white"
      borderBottom="1px solid #dbdbdb"
      p="0 10px"
    >
      <Typography>Hello: {data?.username}</Typography>
      <Stack>
        <Button onClick={logOut}>
          <LogoutIcon />
        </Button>
      </Stack>
    </Stack>
  );
};
