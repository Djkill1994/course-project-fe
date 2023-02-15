import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import {
  ICollection,
  useCreateCollectionMutation,
} from "../api/collections.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import defaultImages from "../../../../public/defaulImg.jpg";

interface IProps {
  onClose: () => void;
}

interface ICreateCollectionForm
  extends Pick<ICollection, "name" | "theme" | "description" | "imgSrc"> {
  file: File[];
}

export const CreateCollectionModal: FC<IProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCollectionForm>();
  const [createCollection, { isLoading, isSuccess }] =
    useCreateCollectionMutation();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<ICreateCollectionForm> = async (data) => {
    const img = new FormData();
    img.append("file", data.file[0]);
    img.append("upload_preset", "course-prt");
    img.append("cloud_name", "djkill");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/djkill/image/upload",
      {
        method: "post",
        body: img,
      }
    ).then((resp) => resp.json());
    const uploadImg = res.url ? res.url : defaultImages;
    createCollection({
      name: data.name,
      imgSrc: uploadImg,
      description: data.description,
      theme: data.theme,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <Modal open onClose={onClose} sx={{ display: "flex" }}>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        m="auto"
        gap="12px"
        bgcolor="#fafafa"
        p="18px"
        borderRadius="5px"
        // todo зарефачить видс
        width="350px"
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
          label={t("features.CollectionPage.CreateCollectionModal.labels.name")}
          fullWidth
        />
        <TextField
          {...register("theme", { required: true })}
          error={!!errors.theme}
          helperText={
            !!errors.name &&
            t("features.CollectionPage.CreateCollectionModal.errors.theme")
          }
          size="small"
          autoComplete="theme"
          label={t(
            "features.CollectionPage.CreateCollectionModal.labels.theme"
          )}
          fullWidth
        />
        <TextField
          {...register("description", { required: true })}
          error={!!errors.name}
          helperText={
            !!errors.name &&
            t(
              "features.CollectionPage.CreateCollectionModal.errors.description"
            )
          }
          size="small"
          autoComplete="description"
          label={t(
            "features.CollectionPage.CreateCollectionModal.labels.description"
          )}
          fullWidth
        />
        <Button variant="contained" component="label">
          {t("features.CollectionPage.CreateCollectionModal.button.uploadImg")}
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            {...register("file")}
          />
        </Button>
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
    </Modal>
  );
};
