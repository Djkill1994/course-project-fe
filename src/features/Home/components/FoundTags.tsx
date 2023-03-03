import { ChevronLeft } from "@mui/icons-material";
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
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFoundTagsQuery } from "../../Items/api/item.api";
import { ItemCard } from "../../Items/components/ItemCard";
import { ReactComponent as NoData } from "../../../../public/no-data.svg";

export const FoundTags: FC = () => {
  const params = useParams();
  const { data, isLoading, isSuccess } = useGetFoundTagsQuery(
    params.id as string
  );
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box p="0 22px 22px 22px">
      <Breadcrumbs sx={{ pb: "12px" }}>
        <Stack direction="row" alignItems="center" gap="8px">
          <IconButton onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
          <Typography>{t("features.FoundTags.resultsByTag")}</Typography>
        </Stack>
        <Typography color="text.primary" fontSize="22px">
          {params.tagName}
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
