import {
  IconButton,
  Button,
  Stack,
  Grid,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { FC } from "react";
import { CreateCollectionModal } from "./CreateCollectionModal";
import { useModal } from "../../../common/hooks/useModal";
import { useGetCollectionsQuery } from "../api/collections.api";
import { CollectionCard } from "./CollectionCard";
import { Add, AddBox } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export const MyCollectionsPage: FC = () => {
  const { isOpened, open, close } = useModal();
  const { data, isLoading } = useGetCollectionsQuery();
  const { t } = useTranslation();

  return (
    <>
      {isOpened && <CreateCollectionModal onClose={close} />}
      {data?.length ? (
        <Stack direction="column" alignItems="flex-end" p="0 22px">
          <Button
            onClick={() => open()}
            variant="contained"
            size="small"
            sx={{ textTransform: "none", mb: "12px" }}
          >
            <Add sx={{ width: "14px" }} />
            {t(
              "features.CollectionPage.MyCollectionsPage.button.newCollection"
            )}
          </Button>
          <Grid container spacing={2}>
            {data?.map(({ name, id, theme, description, imgSrc, date }) => (
              <Grid key={id} item xs={4}>
                <CollectionCard
                  id={id}
                  name={name}
                  theme={theme}
                  description={description}
                  imgSrc={imgSrc}
                  date={date}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      ) : isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Stack alignItems="center" gap="40px" pt="70px">
          <IconButton onClick={() => open()}>
            <AddBox sx={{ width: "50px", height: "50px" }} color="primary" />
          </IconButton>
          <Typography variant="h4">
            {t(
              "features.CollectionPage.MyCollectionsPage.titleFirstCollection"
            )}
          </Typography>
        </Stack>
      )}
    </>
  );
};
