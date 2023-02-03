import { FC, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../../../api/login.api";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from "../../../../../../common/constans/regex";
import { usersApi } from "../../../../../Admin/api/users.api";
import { ROUTE_PATHS } from "../../../../../../App";

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, { data, isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    login(data);
  };

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem("token", data.token ?? "");
      usersApi.util.invalidateTags(["User"]);
      navigate(ROUTE_PATHS.Home, { replace: true });
    }
  }, [data?.token]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={1.8}>
        <Grid item sm={12} width="100%">
          <TextField
            {...register("email", { required: true, pattern: EMAIL_REGEX })}
            error={!!errors.email}
            helperText={!!errors.email && "Enter email"}
            size="small"
            autoComplete="email"
            fullWidth
            label="Email"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel
              htmlFor="outlined-adornment-password"
              error={!!errors.password}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              error={!!errors.password}
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
              label="Password"
            />
            {!!errors.password && (
              <FormHelperText id="outlined-adornment-password" error>
                Enter password
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loadingPosition="center"
            variant="contained"
            fullWidth
            type="submit"
            loading={isLoading}
          >
            Log in
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};
