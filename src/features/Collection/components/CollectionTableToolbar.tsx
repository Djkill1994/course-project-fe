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

export const CollectionTableToolbar: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
          href="/"
        >
          Collections
        </Link>
        <Typography color="text.primary">NAME COLLECTION</Typography>
      </Breadcrumbs>
      <IconButton onClick={() => setOpen(true)}>
        <Settings />
      </IconButton>
      <CollectionSettingsDrawer open={open} />
      <Button variant="contained" size="small" sx={{ textTransform: "none" }}>
        <Add sx={{ width: "14px" }} /> New item
      </Button>
    </Toolbar>
  );
};
