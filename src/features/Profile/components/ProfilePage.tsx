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

// todo перевести i18n

interface IProfileEditing {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileEditing>();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<IProfileEditing> = async (data) => {
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
  // todo LogOut и delete user одна логика , совместить
  useEffect(() => {
    if (isSuccessEditing) {
      setEdit(false);
    }
    if (isSuccessDelete) {
      localStorage.clear();
      window.location.replace(ROUTE_PATHS.Login);
    }
  }, [isSuccessEditing, isSuccessDelete]);

  return (
    <Box display="flex" width="100%" flexDirection="column">
      <Stack alignItems="flex-end" p="0 12px">
        <IconButton onClick={() => deleteUser(data!.id)}>
          <DeleteForever />
          <Typography variant="body2">Delete user</Typography>
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
              Name
            </Typography>
            {edit ? (
              <TextField
                {...register("userName", { required: true })}
                error={!!errors.userName}
                helperText={
                  !!errors.userName &&
                  t(
                    "features.CollectionPage.CreateCollectionModal.errors.description"
                  )
                }
                size="small"
                autoComplete="description"
                defaultValue={data?.userName}
              />
            ) : (
              <Typography variant="h5">{data?.userName}</Typography>
            )}
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Email
            </Typography>
            {edit ? (
              <TextField
                {...register("email", { required: true })}
                error={!!errors.email}
                helperText={
                  !!errors.email &&
                  t(
                    "features.CollectionPage.CreateCollectionModal.errors.description"
                  )
                }
                size="small"
                autoComplete="description"
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
              {t("features.CollectionPage.CreateCollectionModal.button.send")}
            </LoadingButton>
          )}
          <Button
            variant="contained"
            onClick={() => navigate(ROUTE_PATHS.Collection, { replace: true })}
          >
            My collections
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
