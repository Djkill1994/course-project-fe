import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  useAuthRefreshQuery,
  useDeleteUserMutation,
  useEditingProfileUserMutation,
} from "../api/user.api";
import { DeleteForever, Edit } from "@mui/icons-material";
import { ROUTE_PATHS } from "../../../App";
import { generatePath, useNavigate } from "react-router-dom";
import { logOutUser } from "../../../common/utils/logOutUser";
import { EMAIL_REGEX } from "../../../common/constans/regex";
import { UploadImages } from "../../../common/components/UploadImages";

interface IProfileEditingForm {
  userName: string;
  email: string;
  avatarSrc: string;
}

export const ProfilePage: FC = () => {
  const { data } = useAuthRefreshQuery();
  const [profileEditing, { isLoading, isSuccess: isSuccessEditing }] =
    useEditingProfileUserMutation();
  const [deleteUser, { isSuccess: isSuccessDelete }] = useDeleteUserMutation();
  const [edit, setEdit] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IProfileEditingForm>();

  const onSubmit: SubmitHandler<IProfileEditingForm> = async (data) => {
    profileEditing({
      userName: data.userName,
      email: data.email,
      avatarSrc: data.avatarSrc,
    });
  };

  useEffect(() => {
    if (isSuccessEditing) {
      setEdit(false);
    }
    if (isSuccessDelete) {
      logOutUser();
    }
  }, [isSuccessEditing, isSuccessDelete]);

  return (
    <Box display="flex" width="100%" flexDirection="column">
      <Stack alignItems="flex-end" p="0 12px">
        <IconButton onClick={() => deleteUser(data!.id)}>
          <DeleteForever />
          <Typography variant="body2">
            {t("features.ProfilePage.buttons.deleteUser")}
          </Typography>
        </IconButton>
      </Stack>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        gap="12px"
        alignItems="center"
      >
        <Box display="flex" alignItems="flex-start">
          {edit ? (
            <UploadImages
              onChange={(imgSrc) => setValue("avatarSrc", imgSrc)}
              imgSrc={watch("avatarSrc") || data?.avatarSrc}
              avatar={true}
              avatarSize="188px"
            />
          ) : (
            <Avatar
              src={data?.avatarSrc}
              sx={{ width: "188px", height: "188px" }}
            />
          )}
          <IconButton onClick={() => setEdit((prev) => !prev)}>
            <Edit />
          </IconButton>
        </Box>
        <Stack gap="12px">
          <Box>
            <Typography variant="body2" color="text.secondary">
              {t("features.ProfilePage.name")}
            </Typography>
            {edit ? (
              <TextField
                {...register("userName", { required: true })}
                error={!!errors.userName}
                helperText={
                  !!errors.userName && t("features.ProfilePage.errors.userName")
                }
                size="small"
                autoComplete="userName"
                defaultValue={data?.userName}
              />
            ) : (
              <Typography variant="h5">{data?.userName}</Typography>
            )}
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {t("features.ProfilePage.email")}
            </Typography>
            {edit ? (
              <TextField
                {...register("email", { required: true, pattern: EMAIL_REGEX })}
                error={!!errors.email}
                helperText={
                  !!errors.email && t("features.ProfilePage.errors.email")
                }
                size="small"
                autoComplete="email"
                defaultValue={data?.email}
              />
            ) : (
              <Typography variant="h5">{data?.email}</Typography>
            )}
          </Box>
          {edit && (
            <LoadingButton
              loadingPosition="center"
              variant="contained"
              type="submit"
              loading={isLoading}
            >
              {t("features.ProfilePage.buttons.sendForm")}
            </LoadingButton>
          )}
          <Button
            variant="contained"
            onClick={() =>
              navigate(
                generatePath(ROUTE_PATHS.Collection, { userId: data?.id }),
                {
                  replace: true,
                }
              )
            }
          >
            {t("features.ProfilePage.buttons.myCollections")}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
