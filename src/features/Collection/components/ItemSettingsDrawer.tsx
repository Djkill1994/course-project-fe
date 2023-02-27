import {
  Typography,
  List,
  TextField,
  Stack,
  Button,
  IconButton,
  Drawer,
  Autocomplete,
  Chip,
  CircularProgress,
} from "@mui/material";
import { FC, useEffect } from "react";
import { ChevronRight } from "@mui/icons-material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import {
  IItem,
  useGetItemQuery,
  useGetTagsQuery,
  useSettingsItemMutation,
} from "../../Items/api/item.api";
import { UploadImages } from "../../../common/components/UploadImages";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { collectionApi } from "../api/collections.api";
import { useDispatch } from "react-redux";

interface IProps {
  onClose: () => void;
  id: string;
}

// todo зарефачить код, добавление полей доработать

type NewItemForm = Pick<IItem, "name" | "imgSrc" | "tags">;

export const ItemSettingsDrawer: FC<IProps> = ({ onClose, id }) => {
  const {
    data: itemData,
    isLoading: getItemLoading,
    isSuccess: getItemSuccess,
  } = useGetItemQuery(id);
  const { data: tagsData } = useGetTagsQuery();
  // const [refetchTags] = useLazyGetTagsQuery();
  const [
    settingsItem,
    { isSuccess: settingItemSuccess, isLoading: settingItemLoading },
  ] = useSettingsItemMutation();
  const { register, handleSubmit, setValue, watch, control } =
    useForm<NewItemForm>();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<NewItemForm> = (data) => {
    settingsItem({
      itemId: id,
      settingsItem: {
        name: data.name,
        imgSrc: data.imgSrc,
        tags: data.tags,
      },
    });
  };

  useEffect(() => {
    if (getItemSuccess) {
      setValue("name", itemData?.name);
      setValue("imgSrc", itemData?.imgSrc);
      setValue("tags", itemData?.tags);
    }
  }, [getItemSuccess]);

  useEffect(() => {
    if (settingItemSuccess) {
      onClose();
      dispatch(collectionApi.util.invalidateTags(["Collection"]));
    }
  }, [settingItemSuccess]);

  return (
    <Drawer anchor="right" open onClose={onClose}>
      <List sx={{ width: "542px", padding: "12px 22px" }}>
        <IconButton onClick={onClose}>
          <ChevronRight />
        </IconButton>
        <Stack gap="18px">
          <Typography>
            {t("features.CollectionPage.ItemSettingsDrawer.itemSettings")}
          </Typography>
          {getItemLoading ? (
            <CircularProgress />
          ) : (
            <Stack
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              gap="18px"
            >
              <TextField
                fullWidth
                size="small"
                label={t(
                  "features.CollectionPage.ItemSettingsDrawer.labels.name"
                )}
                {...register("name", { required: true })}
              />
              <Controller
                render={({ field: { onChange, value, onBlur } }) => (
                  <Autocomplete
                    value={value?.map(({ tag }) => tag)}
                    onBlur={onBlur}
                    onChange={(event, item) => onChange(item)}
                    multiple
                    id="tags-filled"
                    options={tagsData?.map((tag) => tag.tag) || []}
                    freeSolo
                    renderTags={(value: readonly string[], getTagProps) =>
                      value?.map((option: string, index: number) => (
                        <Chip
                          key={option}
                          // variant="contained"
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
                          "features.CollectionPage.ItemSettingsDrawer.labels.tags"
                        )}
                      />
                    )}
                  />
                )}
                name="tags"
                control={control}
              />
              <UploadImages
                onChange={(imgSrc) => setValue("imgSrc", imgSrc)}
                imgSrc={watch("imgSrc")}
              />
              <LoadingButton
                variant="contained"
                loading={settingItemLoading}
                type="submit"
              >
                {t("features.CollectionPage.ItemSettingsDrawer.buttons.send")}
              </LoadingButton>
            </Stack>
          )}
        </Stack>
      </List>
    </Drawer>
  );
};
