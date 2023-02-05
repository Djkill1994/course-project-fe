import { Button, Modal, Stack, TextField } from "@mui/material";
import { FC } from "react";
import {
  ICollection,
  useCreateCollectionMutation,
} from "../api/collections.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IProps {
  onClose: () => void;
}

export const CreateCollectionModal: FC<IProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICollection>();
  const [createCollection] = useCreateCollectionMutation();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<ICollection> = (data) => {
    createCollection(data);
  };

  return (
    <Modal open onClose={onClose} sx={{ display: "flex" }}>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        m="auto"
        gap="12px"
        color="default"
        p="18px"
      >
        <TextField
          {...register("name", { required: true })}
          error={!!errors.name}
          helperText={
            !!errors.name &&
            t("features.MyCollectionsPage.CreateCollectionModal.errors.name")
          }
          size="small"
          autoComplete="name"
          label={t(
            "features.MyCollectionsPage.CreateCollectionModal.labels.name"
          )}
          fullWidth
        />
        <TextField
          {...register("theme", { required: true })}
          error={!!errors.theme}
          helperText={
            !!errors.name &&
            t("features.MyCollectionsPage.CreateCollectionModal.errors.theme")
          }
          size="small"
          autoComplete="theme"
          label={t(
            "features.MyCollectionsPage.CreateCollectionModal.labels.theme"
          )}
          fullWidth
        />
        <TextField
          {...register("description", { required: true })}
          error={!!errors.name}
          helperText={
            !!errors.name &&
            t(
              "features.MyCollectionsPage.CreateCollectionModal.errors.description"
            )
          }
          size="small"
          autoComplete="description"
          label={t(
            "features.MyCollectionsPage.CreateCollectionModal.labels.description"
          )}
          fullWidth
        />
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={onClose}>Close</Button>
          <Button type="submit">Send</Button>
        </Stack>
      </Stack>
    </Modal>
  );
};
