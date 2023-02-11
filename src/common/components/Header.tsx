import { AppBar, Avatar, Button, Stack, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { Logout } from "@mui/icons-material";
import { useAuthRefreshQuery } from "../../features/Admin/api/users.api";
import { HeaderSelectLeague } from "./HeaderSelectLeague";
import { HeaderThemeSwitcher } from "./HeaderThemeSwitcher";
import { ROUTE_PATHS } from "../../App";
import { HeaderSearchApp } from "./HeaderSearchApp";
import { AUTH_TOKEN_KEY } from "../constans/localStorage";
import { useTranslation } from "react-i18next";

export const Header: FC = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const navigate = useNavigate();
  const { data } = useAuthRefreshQuery(undefined, { skip: !token });
  const { t } = useTranslation();

  const logOut = (): void => {
    localStorage.clear();
    window.location.replace(ROUTE_PATHS.Login);
  };

  return (
    <AppBar color="default" position="sticky">
      <Stack
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        height="50px"
        borderBottom="1px solid #dbdbdb"
        p="0 10px"
      >
        {data && (
          <IconButton
            onClick={() => navigate(ROUTE_PATHS.Collection, { replace: true })}
          >
            <Avatar src={data?.avatarSrc} />
          </IconButton>
        )}
        <HeaderSearchApp />
        <Stack direction="row" alignItems="center" gap="10px">
          <HeaderSelectLeague />
          <HeaderThemeSwitcher />
          <Stack>
            {data ? (
              <IconButton onClick={logOut}>
                <Logout />
              </IconButton>
            ) : (
              <Button
                size="small"
                onClick={() => navigate(ROUTE_PATHS.Login, { replace: true })}
                variant="contained"
              >
                {t("general.logIn")}
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </AppBar>
  );
};
