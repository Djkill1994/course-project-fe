import {
  InputAdornment,
  Box,
  TextField,
  Typography,
  Autocomplete,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Search } from "@mui/icons-material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetAllItemsQuery,
  useLazyGetAllItemsQuery,
} from "../../features/Items/api/item.api";
import { ItemCard } from "../../features/Items/components/ItemCard";
import { Item } from "../../features/Items/components/Item";
import { authApi } from "../../features/Auth/api/auth.api";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../App";
import { useModal } from "../hooks/useModal";

export const HeaderSearchApp: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = useGetAllItemsQuery();
  //todo разобраться с поиском и переходом на коллекцию

  return (
    <Box p="0 22px" width="100%" borderRadius="20px">
      <Autocomplete
        onChange={(event, item) => console.log(item)}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            size="small"
            placeholder={t("general.search")}
            // InputProps={{
            //   sx: { borderRadius: "20px" },
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <Search />
            //     </InputAdornment>
            //   ),
            // }}
          />
        )}
        getOptionLabel={(option) => option.name || ""}
        options={data || []}
        renderOption={(_, { name, id }) => (
          <Stack
            sx={{ cursor: "pointer", "&:hover": { background: "#dbdbdb" } }}
            key={id}
            p="4px 8px 4px 8px"
            direction="row"
            gap="8px"
            alignItems="center"
          >
            <Search />
            <Typography>{name}</Typography>
          </Stack>
        )}
      />
    </Box>
  );
};
