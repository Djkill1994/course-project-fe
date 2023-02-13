import {
  Toolbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Link,
  Button,
  Stack,
} from "@mui/material";
import { Add, Settings } from "@mui/icons-material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../App";
import { CollectionSettingsDrawer } from "./CollectionSettingsDrawer";
import { useModal } from "../../../common/hooks/useModal";

export const CollectionTableToolbar: FC = () => {
  const navigate = useNavigate();
  const { isOpened, open, close } = useModal();

  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <Stack direction="row" alignItems="center" gap="8px">
        <Breadcrumbs>
          <Link
            onClick={() => navigate(ROUTE_PATHS.Collection, { replace: true })}
            underline="hover"
            color="inherit"
            sx={{ cursor: "pointer" }}
          >
            Collections
          </Link>
          <Typography color="text.primary">NAME COLLECTION</Typography>
        </Breadcrumbs>
        <IconButton onClick={() => open()}>
          <Settings />
        </IconButton>
        {isOpened && <CollectionSettingsDrawer onClose={close} />}
      </Stack>
      <Button
        onClick={() => open()}
        variant="contained"
        size="small"
        sx={{ textTransform: "none" }}
      >
        <Add sx={{ width: "14px" }} /> New item
      </Button>
    </Toolbar>
  );
};
