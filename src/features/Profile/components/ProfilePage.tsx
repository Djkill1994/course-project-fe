import { LoadingButton } from "@mui/lab";
import {
  Box,
  Stack,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { FC, useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  useAuthRefreshQuery,
  useEditingProfileUserMutation,
  useDeleteUserMutation,
} from "../api/user.api";
import { AUTH_TOKEN_KEY } from "../../../common/constans/localStorage";
import { DeleteForever, Edit } from "@mui/icons-material";
import { ROUTE_PATHS } from "../../../App";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../../common/utils/logOutUser";
import { EMAIL_REGEX } from "../../../common/constans/regex";

interface IProfileEditingForm {
  userName: string;
  email: string;
  file: File[];
}

export const ProfilePage: FC = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const { data } = useAuthRefreshQuery(undefined, { skip: !token });
  const [profileEditing, { isLoading, isSuccess: isSuccessEditing }] =
    useEditingProfileUserMutation();
  const [deleteUser, { isSuccess: isSuccessDelete }] = useDeleteUserMutation();
  const [edit, setEdit] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileEditingForm>();

  const onSubmit: SubmitHandler<IProfileEditingForm> = async (data) => {
    const img = new FormData();
    img.append("file", data.file[0]);
    img.append("upload_preset", "course-prt");
    img.append("cloud_name", "djkill");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/djkill/image/upload",
      {
        method: "post",
        body: img,
      }
    ).then((resp) => resp.json());
    const uploadImg = res.url;
    profileEditing({
      userName: data.userName,
      email: data.email,
      avatarSrc: uploadImg,
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
            <IconButton component="label">
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                {...register("file")}
              />
              <Avatar
                src={data?.avatarSrc}
                sx={{ width: "188px", height: "188px" }}
              />
            </IconButton>
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
            onClick={() => navigate(ROUTE_PATHS.Collection, { replace: true })}
          >
            {t("features.ProfilePage.buttons.myCollections")}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
