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
import { useTranslation } from "react-i18next";
import { ICollection } from "../api/collections.api";

interface IProps {
  collectionName: string | undefined;
}

export const CollectionTableToolbar: FC<IProps> = ({ collectionName }) => {
  const navigate = useNavigate();
  const { isOpened, open, close } = useModal();
  const { t } = useTranslation();

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
            {t(
              "features.CollectionPage.CollectionTableToolbar.collectionsLink"
            )}
          </Link>
          <Typography color="text.primary">{collectionName}</Typography>
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
        <Add sx={{ width: "14px" }} />
        {t("features.CollectionPage.CollectionTableToolbar.newItem")}
      </Button>
    </Toolbar>
  );
};
