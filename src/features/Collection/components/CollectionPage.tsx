import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { CollectionTable } from "./CollectionTable";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetCollectionQuery } from "../api/collections.api";

export const CollectionPage: FC = () => {
  const params = useParams();
  const { data } = useGetCollectionQuery(params.id as string);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Stack m="auto" maxWidth="1200px" gap="12px">
      <Breadcrumbs>
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
        <Typography color="text.primary">{data?.name}</Typography>
      </Breadcrumbs>
      <CollectionTable />
    </Stack>
  );
};
