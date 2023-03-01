import { Box, Grid, Breadcrumbs, Link, Typography, Stack } from "@mui/material";
import { FC } from "react";
import { ItemCard } from "./ItemCard";
import { ROUTE_PATHS } from "../../../App";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { useGetCollectionItemsQuery } from "../api/item.api";

export const Items: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const { data } = useGetCollectionItemsQuery(params.id as string);

  return (
    <Box p="0 22px 22px 22px">
      <Breadcrumbs sx={{ pb: "12px" }}>
        <Link
          onClick={() => navigate(-1)}
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
        {data?.map(({ name, imgSrc, id, likes, date }) => (
          <Grid key={id} item xs={4}>
            <ItemCard
              id={id}
              name={name}
              imgSrc={imgSrc}
              likes={likes}
              date={date}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
