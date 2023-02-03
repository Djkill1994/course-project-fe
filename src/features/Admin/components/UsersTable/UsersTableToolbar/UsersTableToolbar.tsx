import { Toolbar, Typography, Tooltip, alpha, IconButton } from "@mui/material";
import { Delete, Block, CheckCircleOutline } from "@mui/icons-material";
import { FC } from "react";
import {
  useBanUserMutation,
  useDeleteUserMutation,
  useUnBanUserMutation,
} from "../../../api/users.api";

interface IUsersTableToolbarProps {
  selectedIds: string[];
  onActionComplete: VoidFunction;
}

export const UsersTableToolbar: FC<IUsersTableToolbarProps> = ({
  selectedIds,
  onActionComplete,
}) => {
  const [deleteUser] = useDeleteUserMutation();
  const [banUser] = useBanUserMutation();
  const [unBanUser] = useUnBanUserMutation();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedIds.length > 0 && {
          background: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selectedIds.length > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedIds.length} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Users
        </Typography>
      )}
      <Tooltip title="Delete">
        <IconButton
          onClick={() => {
            onActionComplete();
            deleteUser(selectedIds);
          }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
      <Tooltip title="Ban">
        <IconButton
          onClick={() => {
            onActionComplete();
            banUser(selectedIds);
          }}
        >
          <Block color="error" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Unban">
        <IconButton
          onClick={() => {
            onActionComplete();
            unBanUser(selectedIds);
          }}
        >
          <CheckCircleOutline color="success" />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};
