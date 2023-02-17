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
import { FC, useState } from "react";
import { Add, ChevronRight, DeleteForever } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { CollectionFields, ICollectionFieldsForm } from "./CollectionFields";

interface IProps {
  onClose: () => void;
}

// {
//   collection: ""
//   name: {name: "", type: ""}
//   description: {name: "", type: ""}
//   optionalFields: []
// }

// todo перевести, зарефачить код, добавление полей доработать

interface ISettingsForm {
  collectionName: string; //todo разобраться
  name: ICollectionFieldsForm;
  description: ICollectionFieldsForm;
  optionalFields?: ICollectionFieldsForm[];
}

export const CollectionSettingsDrawer: FC<IProps> = ({ onClose }) => {
  const { register, handleSubmit, setValue, watch } = useForm<ISettingsForm>();

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
              <CollectionFields
                fieldName="name"
                onChange={(fieldName, values) => setValue(fieldName, values)}
              />
              <CollectionFields
                fieldName="description"
                onChange={(fieldName, values) => setValue(fieldName, values)}
              />
              {watch("optionalFields")?.map((optionalField) => (
                <CollectionFields
                  fieldName={optionalField.name}
                  onChange={(fieldName, values) =>
                    setValue(optionalField.name, values)
                  }
                />
              ))}
              {/*<CollectionFields*/}
              {/*  fieldName="Description"*/}
              {/*  onChange={}*/}
              {/*/>*/}
              {/*{newField && (*/}
              {/*  <CollectionFields*/}
              {/*    fieldName="New field"*/}
              {/*    onChange={}*/}
              {/*  />*/}
              {/*)}*/}
              {/*<CollectionFields fieldName="Theme" register={register} />*/}
              {/*<CollectionFields fieldName="Image" register={register} />*/}
            </Stack>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "none" }}
              fullWidth
              //todo добавлять разные цифры то бы не повторялись
              onClick={() => setValue("optionalFields", [{ name: "test1" }])}
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
