import { FC, useEffect } from "react";
import { Box, Grid, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../api/login.api";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from "../../../common/constans/regex";
import { usersApi } from "../../Admin/api/users.api";
import { ROUTE_PATHS } from "../../../App";
import { AUTH_TOKEN_KEY } from "../../../common/constans/localStorage";
import { useTranslation } from "react-i18next";
import { FormInputPassword } from "../../../common/components/FormInputPassword";

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
  const [login, { data, isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    login(data);
  };

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, data.token ?? "");
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
            helperText={!!errors.email && t("features.Auth.form.errors.email")}
            size="small"
            autoComplete="email"
            fullWidth
            label={t("features.Auth.form.labels.email")}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputPassword
            id="password"
            error={errors.password && t("features.Auth.form.errors.password")}
            label={t("features.Auth.form.labels.password")}
            inputProps={register("password", {
              required: true,
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loadingPosition="center"
            variant="contained"
            fullWidth
            type="submit"
            loading={isLoading}
          >
            {t("general.logIn")}
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};
