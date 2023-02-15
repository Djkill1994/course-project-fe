import { Box, Grid, TextField } from "@mui/material";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegistrationMutation } from "../api/registration.api";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from "../../../common/constans/regex";
import { LoadingButton } from "@mui/lab";
import { FormInputPassword } from "../../../common/components/FormInputPassword";
import { useTranslation } from "react-i18next";
import { ROUTE_PATHS } from "../../../App";

export interface IRegistrationForm {
  userName: string;
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
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    registerUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTE_PATHS.Login, { replace: true });
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
            helperText={!!errors.email && t("features.Auth.form.errors.email")}
            size="small"
            autoComplete="email"
            label={t("features.Auth.form.labels.email")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <TextField
            {...register("userName", { required: true })}
            error={!!errors.userName}
            helperText={
              !!errors.userName && t("features.Auth.form.errors.name")
            }
            size="small"
            label={t("features.Auth.form.labels.name")}
            autoComplete="fullName"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <FormInputPassword
            id="password"
            error={errors.password && t("features.Auth.form.errors.password")}
            label={t("features.Auth.form.labels.password")}
            inputProps={register("password", {
              required: true,
            })}
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <FormInputPassword
            id="confirmPassword"
            error={
              errors.passwordConfirm &&
              t("features.Auth.form.errors.confirmPassword")
            }
            label={t("features.Auth.form.labels.confirmPassword")}
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
            {t("general.signUp")}
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};
