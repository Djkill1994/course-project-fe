import {
  Toolbar,
  Typography,
  Tooltip,
  alpha,
  IconButton,
  TextField,
  Breadcrumbs,
  Link,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { Add, Settings } from "@mui/icons-material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../App";
import { CollectionSettingsDrawer } from "./CollectionSettingsDrawer";
import { useModalWindows } from "../../../common/hooks/useModalWindows";

export const CollectionTableToolbar: FC = () => {
  const navigate = useNavigate();
  const { isOpened, open, close } = useModalWindows();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          onClick={() => navigate(ROUTE_PATHS.Collection, { replace: true })}
          underline="hover"
          color="inherit"
        >
          Collections
        </Link>
        <Typography color="text.primary">NAME COLLECTION</Typography>
      </Breadcrumbs>
      <IconButton onClick={() => open()}>
        <Settings />
      </IconButton>
      {isOpened && <CollectionSettingsDrawer onClose={close} />}
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
