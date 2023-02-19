import {
  InputAdornment,
  Box,
  TextField,
  Autocomplete,
  Button,
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
import { loginApi } from "../../features/Auth/api/login.api";

export const HeaderSearchApp: FC = () => {
  const { t } = useTranslation();
  const { data } = useGetAllItemsQuery();
  console.log(data);
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
        renderOption={(_, { name, id, imgSrc }) => (
          <Stack key={id} pt="8px">
            <ItemCard id={id} name={name} imgSrc={imgSrc} />
          </Stack>
        )}
      />
    </Box>
  );
};
