import { Box, Grid, TextField } from "@mui/material";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegistrationMutation } from "../../../api/registration.api";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from "../../../../../common/constans/regex";
import { FormInputPassword } from "./FormInputPassword";
import { LoadingButton } from "@mui/lab";

export interface IRegistrationForm {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const RegistrationForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationForm>();
  const [registerUser, { isSuccess, isLoading }] = useRegistrationMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    registerUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/", { replace: true });
    }
  }, [isSuccess]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 3 }}
    >
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Grid item xs={12} width="100%">
          <TextField
            {...register("email", { required: true, pattern: EMAIL_REGEX })}
            error={!!errors.email}
            helperText={!!errors.email && "Enter email"}
            size="small"
            autoComplete="email"
            label="Email"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <TextField
            {...register("username", { required: true })}
            error={!!errors.username}
            helperText={!!errors.username && "Enter your name"}
            size="small"
            label="Full Name"
            autoComplete="fullName"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <FormInputPassword
            id="password"
            error={errors.password && "Password is not valid"}
            label="Password"
            inputProps={register("password", {
              required: true,
            })}
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <FormInputPassword
            id="confirmPassword"
            error={errors.passwordConfirm && "Confirm password is not valid"}
            label="Confirm Password"
            inputProps={register("passwordConfirm", {
              required: true,
            })}
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
            fullWidth
            loading={isLoading}
          >
            Sign Up
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};
