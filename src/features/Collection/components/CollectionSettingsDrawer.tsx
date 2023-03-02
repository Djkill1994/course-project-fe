import {
  Drawer,
  IconButton,
  List,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { ChevronRight, DeleteForever } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  ICollection,
  useDeleteCollectionMutation,
  useGetCollectionQuery,
  useGetThemesQuery,
  useSettingsCollectionMutation,
} from "../api/collections.api";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { UploadImages } from "../../../common/components/UploadImages";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { ROUTE_PATHS } from "../../../App";
import { AddedNewField } from "./AddedNewField";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { useAuthRefreshQuery } from "../../Profile/api/user.api";
import { THEME_TRANSLATIONS_KEYS } from "../constants/theme";

interface IProps {
  onClose: () => void;
}

type SettingsForm = Pick<
  ICollection,
  "name" | "optionalFields" | "theme" | "description" | "imgSrc"
>;

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export const CollectionSettingsDrawer: FC<IProps> = ({ onClose }) => {
  const [selectedTab, setSelectedTab] = useState("write");
  const params = useParams();
  const { data: themesData } = useGetThemesQuery();
  const { data } = useGetCollectionQuery(params.id as string);
  const [deleteCollection, { isSuccess: deleteIsSuccess }] =
    useDeleteCollectionMutation();
  const [settingsCollection, { isLoading, isSuccess: settingsIsSuccess }] =
    useSettingsCollectionMutation();
  const { register, handleSubmit, setValue, watch } = useForm<SettingsForm>({
    defaultValues: data,
  });
  const { data: authData } = useAuthRefreshQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SettingsForm> = (data) => {
    settingsCollection({
      collectionId: params.id as string,
      settingsCollectionForm: data,
    });
  };

  useEffect(() => {
    if (settingsIsSuccess) {
      onClose();
    }
  }, [settingsIsSuccess]);

  useEffect(() => {
    if (deleteIsSuccess) {
      navigate(generatePath(ROUTE_PATHS.Collection, { userId: authData?.id }), {
        replace: true,
      });
    }
  }, [deleteIsSuccess]);

  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": { width: { xs: "100%", sm: "540px" } },
      }}
      anchor="right"
      open
      onClose={onClose}
    >
      <List
        sx={{
          padding: "12px 22px",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <IconButton onClick={onClose}>
            <ChevronRight />
          </IconButton>
          <IconButton
            onClick={() => deleteCollection(data?.id)}
            size="small"
            sx={{ textTransform: "none" }}
          >
            <DeleteForever color="error" />
            <Typography fontSize="14px" color="error">
              {t(
                "features.CollectionPage.CollectionSettingsDrawer.buttons.delete"
              )}
            </Typography>
          </IconButton>
        </Stack>
        <Typography pb="22px">
          {t("features.CollectionPage.CollectionSettingsDrawer.editCollection")}
        </Typography>
        <Stack
          gap="18px"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            fullWidth
            size="small"
            label={t(
              "features.CollectionPage.CollectionSettingsDrawer.labels.name"
            )}
            {...register("name", { required: true })}
          />
          <Select
            {...register("theme")}
            defaultValue={watch("theme")}
            label={t(
              "features.CollectionPage.CreateCollectionModal.labels.theme"
            )}
          >
            {themesData?.map(({ theme }) => (
              <MenuItem key={theme} value={theme}>
                {t(`general.themes.${theme}`)}
              </MenuItem>
            ))}
          </Select>
          <ReactMde
            value={watch("description")}
            onChange={(value) => setValue("description", value)}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
          <UploadImages
            onChange={(imgSrc) => setValue("imgSrc", imgSrc)}
            imgSrc={watch("imgSrc")}
          />
          <AddedNewField
            onChange={(optionalFields) =>
              setValue("optionalFields", optionalFields)
            }
            optionalFields={watch("optionalFields")}
          />
          <LoadingButton variant="contained" loading={isLoading} type="submit">
            {t("features.CollectionPage.CollectionSettingsDrawer.buttons.send")}
          </LoadingButton>
        </Stack>
      </List>
    </Drawer>
  );
};
