import {
  Typography,
  List,
  TextField,
  Stack,
  Button,
  IconButton,
  Drawer,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
  Add,
  ChevronRight,
  DeleteForever,
  ExpandMore,
} from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ICollection,
  useDeleteCollectionMutation,
  useGetCollectionQuery,
  useSettingsCollectionMutation,
} from "../api/collections.api";
import { useParams, useNavigate } from "react-router-dom";
import { UploadImages } from "../../../common/components/UploadImages";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { incrementString } from "../../../common/utils/incrementString";
import { ROUTE_PATHS } from "../../../App";
import { AddedNewField } from "./AddedNewField";
import ReactMde from "react-mde";
import * as Showdown from "showdown";

interface IProps {
  onClose: () => void;
}

// todo перевести поля????, зарефачить код,

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
  const { data } = useGetCollectionQuery(params.id as string);
  const [deleteCollection, { isSuccess: deleteIsSuccess }] =
    useDeleteCollectionMutation();
  const [settingsCollection, { isLoading, isSuccess: settingsIsSuccess }] =
    useSettingsCollectionMutation();
  const { register, handleSubmit, setValue, watch, getValues } =
    useForm<SettingsForm>({
      defaultValues: data,
    });
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
      navigate(ROUTE_PATHS.Collection, { replace: true });
    }
  }, [deleteIsSuccess]);

  return (
    <Drawer anchor="right" open onClose={onClose}>
      <List sx={{ width: "542px", padding: "12px 22px" }}>
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
          <TextField
            fullWidth
            size="small"
            label={t(
              "features.CollectionPage.CollectionSettingsDrawer.labels.theme"
            )}
            {...register("theme", { required: true })}
          />

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
