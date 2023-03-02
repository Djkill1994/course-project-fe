import {
  AppBar,
  Button,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { Logout } from "@mui/icons-material";
import { useAuthRefreshQuery } from "../../features/Profile/api/user.api";
import { HeaderSelectLeague } from "./HeaderSelectLeague";
import { HeaderThemeSwitcher } from "./HeaderThemeSwitcher";
import { ROUTE_PATHS } from "../../App";
import { HeaderSearchApp } from "./HeaderSearchApp";
import { AUTH_TOKEN_KEY } from "../constans/localStorage";
import { useTranslation } from "react-i18next";
import { logOutUser } from "../utils/logOutUser";
import { MobileHeaderNavigation } from "./MobileHeaderNavigation";
import { HeaderNavigation } from "./HeaderNavigation";

export const Header: FC = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const navigate = useNavigate();
  const { data } = useAuthRefreshQuery(undefined, { skip: !token });
  const deviceMediaQuery = useMediaQuery("(min-width:600px)");
  const { t } = useTranslation();

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
        {deviceMediaQuery ? (
          <HeaderNavigation
            id={data?.id}
            role={data?.role}
            avatarSrc={data?.avatarSrc}
          />
        ) : (
          <MobileHeaderNavigation
            id={data?.id}
            role={data?.role}
            avatarSrc={data?.avatarSrc}
          />
        )}
        <HeaderSearchApp />
        <Stack direction="row" alignItems="center" gap="8px">
          <HeaderSelectLeague />
          <HeaderThemeSwitcher />
          {data ? (
            <IconButton onClick={logOutUser}>
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
    </AppBar>
  );
};
