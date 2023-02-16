import {
  Box,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  Stack,
  Modal,
} from "@mui/material";
import { FC } from "react";
import { ItemCard } from "./ItemCard";
import { ROUTE_PATHS } from "../../../App";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Item } from "./Item";
import { useModal } from "../../../common/hooks/useModal";

export const Items: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isOpened, open, close } = useModal();

  return (
    <Box p="0 22px">
      {isOpened && (
        <Modal open onClose={close} sx={{ display: "flex" }}>
          <Item />
        </Modal>
      )}
      <Breadcrumbs sx={{ pb: "12px" }}>
        <Link
          onClick={() => navigate(ROUTE_PATHS.Collection, { replace: true })}
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
        >
          <Stack direction="row">
            <KeyboardArrowLeft />
            {t(
              "features.CollectionPage.CollectionTableToolbar.collectionsLink"
            )}
          </Stack>
        </Link>
        <Typography color="text.primary">collectionName</Typography>
      </Breadcrumbs>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ItemCard open={open} />
        </Grid>
        <Grid item xs={4}>
          <ItemCard open={open} />
        </Grid>
        <Grid item xs={4}>
          <ItemCard open={open} />
        </Grid>
        <Grid item xs={4}>
          <ItemCard open={open} />
        </Grid>
      </Grid>
    </Box>
  );
};
