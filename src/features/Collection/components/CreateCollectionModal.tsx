import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
  ICollection,
  useCreateCollectionMutation,
  useGetThemesQuery,
} from "../api/collections.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { UploadImages } from "../../../common/components/UploadImages";
import { AddedNewField } from "./AddedNewField";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { useDispatch } from "react-redux";
import { userApi } from "../../Profile/api/user.api";

interface IProps {
  onClose: () => void;
}

interface ICreateCollectionForm
  extends Pick<
    ICollection,
    "name" | "theme" | "description" | "imgSrc" | "optionalFields"
  > {
  file: File[];
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export const CreateCollectionModal: FC<IProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("write");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ICreateCollectionForm>({
    defaultValues: {
      optionalFields: [],
    },
  });
  const [createCollection, { isLoading, isSuccess }] =
    useCreateCollectionMutation();
  const { data: themesData } = useGetThemesQuery();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<ICreateCollectionForm> = async (data) => {
    await createCollection({
      name: data.name,
      optionalFields: data.optionalFields,
      imgSrc:
        data.imgSrc ||
        "https://res.cloudinary.com/djkill/image/upload/v1677759112/default-collection-logo_tt9c8r.png",
      description: data.description,
      theme: data.theme,
    });
    dispatch(userApi.util.invalidateTags(["User"]));
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <Modal
      open
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Paper sx={{ overflow: "auto", maxHeight: "100%" }}>
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          m="auto"
          gap="12px"
          p="22px"
          borderRadius="5px"
        >
          <Typography variant="h6" fontWeight="600">
            {t("features.CollectionPage.CreateCollectionModal.title")}
          </Typography>
          <TextField
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={
              !!errors.name &&
              t("features.CollectionPage.CreateCollectionModal.errors.name")
            }
            size="small"
            autoComplete="name"
            label={t(
              "features.CollectionPage.CreateCollectionModal.labels.name"
            )}
            fullWidth
          />
          <FormControl>
            <InputLabel>
              {t("features.CollectionPage.CreateCollectionModal.labels.theme")}
            </InputLabel>
            <Select
              {...register("theme")}
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
          </FormControl>
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
          <Stack direction="row" justifyContent="space-between">
            <Button onClick={onClose}>
              {t("features.CollectionPage.CreateCollectionModal.button.close")}
            </Button>
            <LoadingButton
              loadingPosition="center"
              variant="contained"
              type="submit"
              loading={isLoading}
            >
              {t("features.CollectionPage.CreateCollectionModal.button.send")}
            </LoadingButton>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
};
