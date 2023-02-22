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
import { useParams } from "react-router-dom";
import defaultImages from "../../../../public/defaulImg.jpg";
import { UploadImages } from "../../../common/components/UploadImages";
import { useGetCollectionQuery } from "../api/collections.api";

interface IProps {
  onClose: () => void;
}

// todo перевести, зарефачить код, добавление полей доработать

type NewItemForm = Pick<IItem, "name" | "imgSrc" | "tags">;

export const NewItemDrawer: FC<IProps> = ({ onClose }) => {
  const { register, handleSubmit, setValue, watch, control } =
    useForm<NewItemForm>();
  // todo доработать компонент , на загрузку и успешное создание реализовать логику
  const [createItem, { isSuccess, isLoading }] = useCreateItemMutation();
  const params = useParams();
  // const { data } = useGetCollectionQuery(params.id as string);
  const { data: tagsData } = useGetTagsQuery();
  const [refetchTags] = useLazyGetTagsQuery();

  const onSubmit: SubmitHandler<NewItemForm> = (data) => {
    createItem({
      collectionId: params.id as string,
      newItem: {
        name: data.name,
        imgSrc: data.imgSrc || defaultImages,
        tags: data.tags,
      },
    });
  };
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <Drawer anchor="right" open onClose={onClose}>
      <List sx={{ width: "542px", padding: "12px 22px" }}>
        <IconButton onClick={onClose}>
          <ChevronRight />
        </IconButton>
        <Stack gap="18px">
          <Typography>New item</Typography>
          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            gap="18px"
          >
            <TextField
              fullWidth
              size="small"
              label="Name"
              {...register("name", { required: true })}
            />

            {/*<TextField*/}
            {/*  fullWidth*/}
            {/*  size="small"*/}
            {/*  label="Tags"*/}
            {/*  {...register("tags", { required: true })}*/}
            {/*/>*/}

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
                    <TextField {...params} variant="filled" label="Tags" />
                  )}
                />
              )}
              name="tags"
              control={control}
            />
            {/*//todo зарефачить везде так!!!*/}
            <UploadImages
              onChange={(imgSrc) => setValue("imgSrc", imgSrc)}
              imgSrc={watch("imgSrc")}
            />
            <Button type="submit">Save</Button>
          </Stack>
        </Stack>
      </List>
    </Drawer>
  );
};
