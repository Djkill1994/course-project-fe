import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { IOptionalFields } from "../api/collections.api";

interface IProps {
  defaultValue: IOptionalFields;
  onChange: (values: IOptionalFields) => void;
}

export const CollectionFields: FC<IProps> = ({ defaultValue, onChange }) => {
  const { register, watch } = useForm<IOptionalFields>({
    defaultValues: defaultValue,
  });

  watch((data) => onChange(data as IOptionalFields));

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
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
