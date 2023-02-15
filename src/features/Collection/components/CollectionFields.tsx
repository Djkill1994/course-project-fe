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
import { useState, FC } from "react";

interface IProps {
  fieldName: string;
  registerType: any;
  registerName: any;
  registerMaxLength: any;
  registerMinLength: any;
}

export const CollectionFields: FC<IProps> = ({
  fieldName,
  registerType,
  registerName,
  registerMinLength,
  registerMaxLength,
}) => {
  const [select, setSelect] = useState("string");

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{fieldName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" flexWrap="wrap" gap="10px">
          <FormControl sx={{ minWidth: "222px" }}>
            <InputLabel>Type</InputLabel>
            <Select
              {...registerType}
              value={select}
              label="Type"
              onChange={({ target: { value } }) => setSelect(value)}
            >
              <MenuItem value="string">String</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="boolean">Boolean</MenuItem>
              <MenuItem value="date">Data</MenuItem>
              <MenuItem value="text">Text</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Name" {...registerName} />
          {select === "string" && (
            <Stack gap="10px" direction="row">
              <TextField label="Min length" {...registerMinLength} />
              <TextField label="Max length" {...registerMaxLength} />
            </Stack>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
