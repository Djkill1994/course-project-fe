import {
  Autocomplete,
  Chip,
  Drawer,
  IconButton,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { ChevronRight } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { IItem, useGetTagsQuery } from "../../Items/api/item.api";
import { useDispatch } from "react-redux";
import { UploadImages } from "../../../common/components/UploadImages";
import { collectionApi } from "../api/collections.api";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { OptionalField } from "./OptionalField";

interface IProps {
  onClose: () => void;
  onSubmit: (data: NewItemForm) => Promise<void>;
  isLoading?: boolean;
  defaultValues?: NewItemForm;
  isEditMode?: boolean;
}

type NewItemForm = Pick<IItem, "name" | "imgSrc" | "tags" | "optionalFields">;

export const ItemDrawer: FC<IProps> = ({
  onClose,
  onSubmit,
  isLoading,
  defaultValues,
  isEditMode,
}) => {
  const { data: tagsData } = useGetTagsQuery();
  const { register, handleSubmit, setValue, watch, control } =
    useForm<NewItemForm>({
      defaultValues,
    });
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Drawer anchor="right" open onClose={onClose}>
      <List sx={{ width: "542px", padding: "12px 22px" }}>
        <IconButton onClick={onClose}>
          <ChevronRight />
        </IconButton>
        <Stack gap="18px">
          <Typography>
            {isEditMode
              ? t("features.CollectionPage.ItemSettingsDrawer.itemSettings")
              : t("features.CollectionPage.NewItemDrawer.newItem")}
          </Typography>
          <Stack
            component="form"
            onSubmit={handleSubmit(async (data) => {
              await onSubmit(data);
              dispatch(collectionApi.util.invalidateTags(["Collection"]));
              onClose();
            })}
            noValidate
            gap="18px"
          >
            <TextField
              fullWidth
              size="small"
              label={t("features.CollectionPage.NewItemDrawer.labels.name")}
              {...register("name", { required: true })}
            />
            <Controller
              render={({ field: { onChange, value, onBlur } }) => (
                <Autocomplete
                  multiple
                  value={value?.map(({ tag }) => tag)}
                  onBlur={onBlur}
                  onChange={(event, item) => onChange(item)}
                  options={tagsData?.map((tag) => tag.tag) || []}
                  renderTags={(value: readonly string[], getTagProps) =>
                    value?.map((option: string, index: number) => (
                      <Chip {...getTagProps({ index })} label={option} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      label={t(
                        "features.CollectionPage.NewItemDrawer.labels.tags"
                      )}
                    />
                  )}
                />
              )}
              name="tags"
              control={control}
            />
            {watch("optionalFields")?.map((optionalField, index) => (
              <OptionalField
                key={index}
                optionalField={optionalField}
                index={index}
                optionalFields={watch("optionalFields")}
                onChange={(newOptionalFields) =>
                  setValue("optionalFields", newOptionalFields)
                }
              />
            ))}
            <UploadImages
              onChange={(imgSrc) => setValue("imgSrc", imgSrc)}
              imgSrc={watch("imgSrc")}
            />
            <LoadingButton
              loading={isLoading}
              type="submit"
              variant="contained"
            >
              {isEditMode
                ? t("features.CollectionPage.ItemSettingsDrawer.buttons.send")
                : t("features.CollectionPage.NewItemDrawer.buttons.create")}
            </LoadingButton>
          </Stack>
        </Stack>
      </List>
    </Drawer>
  );
};
