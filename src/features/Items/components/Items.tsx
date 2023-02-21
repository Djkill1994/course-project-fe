import { Box, Grid, Breadcrumbs, Link, Typography, Stack } from "@mui/material";
import { FC } from "react";
import { ItemCard } from "./ItemCard";
import { ROUTE_PATHS } from "../../../App";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { useGetItemsQuery } from "../api/item.api";

export const Items: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const { data } = useGetItemsQuery(params.id as string);

  return (
    <Box p="0 22px">
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
        {data?.map(({ name, imgSrc, id, tags }) => (
          <Grid key={id} item xs={4}>
            <ItemCard name={name} imgSrc={imgSrc} id={id} tags={tags} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
