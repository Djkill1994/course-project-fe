import {
  Box,
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
import { FC } from "react";
import {
  Add,
  ChevronRight,
  DeleteForever,
  ExpandMore,
} from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { CollectionFields } from "./CollectionFields";
import { ICollection, useGetCollectionQuery } from "../api/collections.api";
import { useParams } from "react-router-dom";
import { UploadImages } from "../../../common/components/UploadImages";

interface IProps {
  onClose: () => void;
}

// todo перевести, зарефачить код,

type SettingsForm = Pick<
  ICollection,
  "name" | "fields" | "optionFields" | "theme" | "description" | "imgSrc"
>;

export const CollectionSettingsDrawer: FC<IProps> = ({ onClose }) => {
  const params = useParams();
  const { data } = useGetCollectionQuery(params.id as string);
  const { register, handleSubmit, setValue, watch } = useForm<SettingsForm>({
    defaultValues: {
      name: data?.name,
      theme: data?.theme,
      description: data?.description,
      imgSrc: data?.imgSrc,
      fields: data?.fields,
      optionFields: data?.optionFields,
    },
  });

  const onSubmit: SubmitHandler<SettingsForm> = (data) => {
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
        <Typography pb="22px">Edit collection</Typography>
        <Stack
          gap="18px"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            fullWidth
            size="small"
            label="Name"
            {...register("name", { required: true })}
          />
          <TextField
            fullWidth
            size="small"
            label="Theme"
            {...register("theme", { required: true })}
          />
          <TextField
            fullWidth
            size="small"
            label="Description"
            {...register("description", { required: true })}
          />
          <UploadImages setValue={setValue} watch={watch} />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Fields</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack gap="8px">
                {watch("fields")?.map((field) => (
                  <CollectionFields
                    key={field.name}
                    defaultValue={field}
                    onChange={(value) => setValue("fields", [value])}
                  />
                ))}
                {watch("optionFields")?.map((optionField) => (
                  <CollectionFields
                    key={optionField.name}
                    defaultValue={optionField}
                    onChange={(value) => setValue("optionFields", [value])}
                  />
                ))}
                <Button
                  variant="contained"
                  size="small"
                  sx={{ textTransform: "none" }}
                  fullWidth
                  //todo добавлять разные цифры то бы не повторялись
                  onClick={() =>
                    setValue("optionFields", [
                      { name: "new field 1", type: "string" },
                    ])
                  }
                >
                  <Add sx={{ width: "14px" }} /> New field
                </Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Button type="submit">Save</Button>
        </Stack>
      </List>
    </Drawer>
  );
};
