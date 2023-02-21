import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  Stack,
  TextField,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { FC } from "react";
import { useForm } from "react-hook-form";

export interface ICollectionFieldsForm {
  name: string;
  type: string;
  minLength?: number;
  maxLength?: number;
}

interface IProps {
  defaultValue: ICollectionFieldsForm;
  onChange: (values: ICollectionFieldsForm) => void;
}

export const CollectionFields: FC<IProps> = ({ defaultValue, onChange }) => {
  const { register, watch } = useForm<ICollectionFieldsForm>({
    defaultValues: defaultValue,
  });
  watch((data) => onChange(data as ICollectionFieldsForm));
  //todo задизейблить дефолтные поля имя и типа
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{watch("name")}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" flexWrap="wrap" gap="8px">
          <FormControl sx={{ minWidth: "213px" }}>
            <InputLabel>Type</InputLabel>
            <Select
              size="small"
              {...register("type")}
              label="Type"
              value={defaultValue.type}
            >
              <MenuItem value="string">String</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="boolean">Boolean</MenuItem>
              <MenuItem value="date">Data</MenuItem>
              <MenuItem value="text">Text</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ maxWidth: "213px" }}
            size="small"
            label="Name"
            {...register("name")}
          />
          {defaultValue.type === "string" && (
            <Stack gap="8px" direction="row">
              <TextField
                sx={{ maxWidth: "213px" }}
                size="small"
                label="Min length"
                {...register("minLength")}
              />
              <TextField
                sx={{ maxWidth: "213px" }}
                size="small"
                label="Max length"
                {...register("maxLength")}
              />
            </Stack>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
