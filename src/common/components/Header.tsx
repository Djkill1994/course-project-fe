import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FC, useState } from "react";
import { Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
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
  const [isOpened, setIsOpened] = useState<null | HTMLElement>(null);
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
        gap="20px"
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
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          gap="14px"
        >
          {deviceMediaQuery ? (
            <>
              <HeaderSelectLeague />
              <HeaderThemeSwitcher />
            </>
          ) : (
            <>
              <IconButton
                onClick={({ currentTarget }) => setIsOpened(currentTarget)}
                sx={{ p: 0 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={isOpened}
                open={!!isOpened}
                onClose={() => setIsOpened(null)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem>
                  <HeaderSelectLeague />
                </MenuItem>
                <MenuItem sx={{ justifyContent: "center" }}>
                  <HeaderThemeSwitcher />
                </MenuItem>
              </Menu>
            </>
          )}
          {data ? (
            <IconButton onClick={logOutUser}>
              <Logout />
            </IconButton>
          ) : (
            <Button
              size="small"
              sx={{ whiteSpace: "nowrap" }}
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
