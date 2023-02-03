import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { FC, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IProps {
  inputProps: OutlinedInputProps;
  error?: string;
  label: string;
  id: string;
}

export const FormInputPassword: FC<IProps> = ({
  inputProps,
  error,
  label,
  id,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel htmlFor={id} error={!!error}>
        {label}
      </InputLabel>
      <OutlinedInput
        {...inputProps}
        id={id}
        type={showPassword ? "text" : "password"}
        error={!!error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {!!error && (
        <FormHelperText id={id} error>
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
