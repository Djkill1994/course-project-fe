import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { ItemCard } from "./ItemCard";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import { useGetCollectionItemsQuery } from "../api/item.api";
import { ReactComponent as NoData } from "../../../../public/no-data.svg";

export const Items: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const { data, isLoading, isSuccess } = useGetCollectionItemsQuery(
    params.collectionId as string
  );

  return (
    <Box p="0 22px 22px 22px" mb="10px">
      <Breadcrumbs sx={{ pb: "12px" }}>
        <Stack direction="row" alignItems="center" gap="8px">
          <IconButton onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
          <Typography>{t("features.Items.collection")}</Typography>
        </Stack>
        <Typography color="text.primary" fontSize="22px">
          {params.collectionName}
        </Typography>
      </Breadcrumbs>
      <Grid container spacing={2} justifyContent="center">
        {isLoading ? (
          <CircularProgress />
        ) : isSuccess && data?.length ? (
          data?.map(({ name, imgSrc, id, likes, date }) => (
            <Grid key={id} item xs={9} md={4}>
              <ItemCard
                id={id}
                name={name}
                imgSrc={imgSrc}
                likes={likes}
                date={date}
              />
            </Grid>
          ))
        ) : (
          <NoData width="520px" />
        )}
      </Grid>
    </Box>
  );
};
