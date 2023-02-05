import { IconButton, Box, MenuItem, Menu } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { FC, useState } from "react";
import {
  useAppointAdminMutation,
  useBanUserMutation,
  useDeleteUserMutation,
  useRemoveAdminMutation,
  useUnBanUserMutation,
} from "../api/users.api";
import { useTranslation } from "react-i18next";

interface IUserActions {
  userId: string;
  role: string;
}

export const UserActions: FC<IUserActions> = ({ userId, role }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [deleteUser] = useDeleteUserMutation();
  const [banUser] = useBanUserMutation();
  const [unBanUser] = useUnBanUserMutation();
  const [appointAdmin] = useAppointAdminMutation();
  const [removeAdmin] = useRemoveAdminMutation();

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => deleteUser(userId)}>
          {t("features.Admin.UsersActions.buttons.delete")}
        </MenuItem>
        <MenuItem onClick={() => banUser(userId)}>
          {t("features.Admin.UsersActions.buttons.ban")}
        </MenuItem>
        <MenuItem onClick={() => unBanUser(userId)}>
          {t("features.Admin.UsersActions.buttons.unBan")}
        </MenuItem>
        {role === "user" ? (
          <MenuItem onClick={() => appointAdmin(userId)}>
            {t("features.Admin.UsersActions.buttons.appointAdmin")}
          </MenuItem>
        ) : (
          <MenuItem onClick={() => removeAdmin(userId)}>
            {t("features.Admin.UsersActions.buttons.removeAdmin")}
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};
