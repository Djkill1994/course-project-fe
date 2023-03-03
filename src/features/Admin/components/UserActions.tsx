import { Box, IconButton, Menu, MenuItem } from "@mui/material";
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
  banned: boolean;
}

export const UserActions: FC<IUserActions> = ({ userId, role, banned }) => {
  const [isOpened, setIsOpened] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const [deleteUser] = useDeleteUserMutation();
  const [banUser] = useBanUserMutation();
  const [unBanUser] = useUnBanUserMutation();
  const [appointAdmin] = useAppointAdminMutation();
  const [removeAdmin] = useRemoveAdminMutation();

  return (
    <Box>
      <IconButton onClick={({ currentTarget }) => setIsOpened(currentTarget)}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={isOpened}
        open={Boolean(isOpened)}
        onClose={() => setIsOpened(null)}
      >
        <MenuItem onClick={() => deleteUser(userId)}>
          {t("features.Admin.UsersActions.buttons.delete")}
        </MenuItem>
        {banned ? (
          <MenuItem onClick={() => unBanUser(userId)}>
            {t("features.Admin.UsersActions.buttons.unBan")}
          </MenuItem>
        ) : (
          <MenuItem onClick={() => banUser(userId)}>
            {t("features.Admin.UsersActions.buttons.ban")}
          </MenuItem>
        )}
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
