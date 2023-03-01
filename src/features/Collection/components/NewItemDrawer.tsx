import {
  Typography,
  List,
  TextField,
  Stack,
  IconButton,
  Drawer,
  Autocomplete,
  Chip,
} from "@mui/material";
import { FC, useEffect } from "react";
import { ChevronRight } from "@mui/icons-material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import {
  IItem,
  useCreateItemMutation,
  useGetTagsQuery,
  useLazyGetTagsQuery,
} from "../../Items/api/item.api";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import defaultImages from "../../../../public/defaulImg.jpg";
import { UploadImages } from "../../../common/components/UploadImages";
import { collectionApi, useGetCollectionQuery } from "../api/collections.api";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";

interface IProps {
  onClose: () => void;
}

// todo зарефачить код, добавление полей доработать

type NewItemForm = Pick<IItem, "name" | "imgSrc" | "tags" | "optionalFields">;

export const NewItemDrawer: FC<IProps> = ({ onClose }) => {
  const [createItem, { isSuccess, isLoading }] = useCreateItemMutation();
  const { data: tagsData } = useGetTagsQuery();
  const params = useParams();
  const { data: collectionData } = useGetCollectionQuery(params.id as string);
  const { register, handleSubmit, setValue, watch, control, getValues } =
    useForm<NewItemForm>({
      defaultValues: { optionalFields: collectionData?.optionalFields },
    });
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<NewItemForm> = (data) => {
    createItem({
      collectionId: params.id as string,
      newItem: {
        optionalFields: data.optionalFields,
        name: data.name,
        imgSrc: data.imgSrc || defaultImages,
        tags: data.tags,
      },
    });
  };

  //todo переделать везде вызов dispatch
  useEffect(() => {
    if (isSuccess) {
      onClose();
      dispatch(collectionApi.util.invalidateTags(["Collection"]));
    }
  }, [isSuccess]);

  return (
    <Drawer anchor="right" open onClose={onClose}>
      <List sx={{ width: "542px", padding: "12px 22px" }}>
        <IconButton onClick={onClose}>
          <ChevronRight />
        </IconButton>
        <Stack gap="18px">
          <Typography>
            {t("features.CollectionPage.NewItemDrawer.newItem")}
          </Typography>
          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
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
                  id="tags-filled"
                  options={tagsData?.map((tag) => tag.tag) || []}
                  freeSolo
                  renderTags={(value: readonly string[], getTagProps) =>
                    value?.map((option: string, index: number) => (
                      <Chip
                        key={option}
                        label={option}
                        {...getTagProps({ index })}
                      />
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
            {collectionData?.optionalFields.map((optionalField, index) => (
              <TextField
                key={index}
                fullWidth
                onChange={({ target: { value } }) =>
                  setValue("optionalFields", [
                    ...watch("optionalFields").map((optionField, newIndex) =>
                      index === newIndex
                        ? { ...optionField, value }
                        : optionField
                    ),
                  ])
                }
                size="small"
                label={optionalField.name}
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
              {t("features.CollectionPage.NewItemDrawer.buttons.create")}
            </LoadingButton>
          </Stack>
        </Stack>
      </List>
    </Drawer>
  );
};
