import { KeyboardArrowLeft } from "@mui/icons-material";
import { Box, Breadcrumbs, Grid, Stack, Typography, Link } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFoundTagsQuery } from "../../Items/api/item.api";
import { ItemCard } from "../../Items/components/ItemCard";

export const FoundTags: FC = () => {
  const params = useParams();
  const { data } = useGetFoundTagsQuery(params.id as string);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box p="0 22px 22px 22px">
      <Breadcrumbs sx={{ pb: "12px" }}>
        <Link
          // todo протестить navigate
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
