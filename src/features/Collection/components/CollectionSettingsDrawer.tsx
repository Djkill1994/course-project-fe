import {
  Box,
  Typography,
  List,
  TextField,
  Stack,
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import { FC } from "react";
import { Add, ChevronRight, DeleteForever } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { CollectionFields, ICollectionFieldsForm } from "./CollectionFields";
import { useGetCollectionQuery } from "../api/collections.api";
import { useParams } from "react-router-dom";

interface IProps {
  onClose: () => void;
}

// todo перевести, зарефачить код,

interface ISettingsForm {
  collectionName: string;
  fields: ICollectionFieldsForm[];
  optionalFields?: ICollectionFieldsForm[];
}

export const CollectionSettingsDrawer: FC<IProps> = ({ onClose }) => {
  const params = useParams();
  const { data } = useGetCollectionQuery(params.id as string);
  const { register, handleSubmit, setValue, watch } = useForm<ISettingsForm>({
    defaultValues: {
      collectionName: data?.name,
      fields: data?.fields,
      optionalFields: data?.optionalFields,
    },
  });

  const onSubmit: SubmitHandler<ISettingsForm> = (data) => {
    console.log(data);
  };

  return (
    <Drawer anchor="right" open onClose={onClose}>
      <List sx={{ width: "542px", padding: "12px 22px" }}>
        <Stack direction="row" justifyContent="space-between">
          <IconButton onClick={onClose}>
            <ChevronRight />
          </IconButton>
          <IconButton size="small" sx={{ textTransform: "none" }}>
            <DeleteForever color="error" />
            <Typography fontSize="14px" color="error">
              Delete
            </Typography>
          </IconButton>
        </Stack>
        <Stack gap="18px">
          <Typography>Edit collection</Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Name"
              {...register("collectionName", { required: true })}
            />
            <Typography>Fields</Typography>
            <Stack gap="4px">
              {watch("fields")?.map((field) => (
                <CollectionFields
                  key={field.name}
                  defaultValue={field}
                  onChange={(value) => setValue("fields", [value])}
                />
              ))}
              {watch("optionalFields")?.map((optionalField) => (
                <CollectionFields
                  key={optionalField.name}
                  defaultValue={optionalField}
                  onChange={(value) => setValue("optionalFields", [value])}
                />
              ))}
            </Stack>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "none" }}
              fullWidth
              //todo добавлять разные цифры то бы не повторялись
              onClick={() =>
                setValue("optionalFields", [
                  { name: "new field 1", type: "string" },
                ])
              }
            >
              <Add sx={{ width: "14px" }} /> New field
            </Button>
            <Button type="submit">Save</Button>
          </Box>
        </Stack>
      </List>
    </Drawer>
  );
};
