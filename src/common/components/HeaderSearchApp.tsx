import {
  Autocomplete,
  Avatar,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetAllItemsQuery,
  useLazyGetAllItemsQuery,
} from "../../features/Items/api/item.api";
import { Item } from "../../features/Items/components/Item";

export const HeaderSearchApp: FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const { data } = useGetAllItemsQuery(search);
  const [refetchItems] = useLazyGetAllItemsQuery();
  const [itemId, setItemId] = useState("");

  return (
    <Box p="0 22px" width="70%" borderRadius="20px">
      {itemId && <Item id={itemId} onClose={() => setItemId("")} />}
      <Autocomplete
        onOpen={() => refetchItems("")}
        onChange={(event, item) => console.log(item)}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={({ target: { value } }) => {
              setSearch(value);
            }}
            fullWidth
            size="small"
            placeholder={t("general.search")}
          />
        )}
        getOptionLabel={(option) => option.name || ""}
        options={data || []}
        renderOption={(_, { name, id, imgSrc }) => (
          <Stack
            onClick={() => setItemId(id)}
            sx={{ cursor: "pointer", "&:hover": { background: "#dbdbdb" } }}
            key={id}
            p="4px 8px 4px 8px"
            direction="row"
            gap="8px"
            alignItems="center"
          >
            <Avatar src={imgSrc} />
            <Typography>{name}</Typography>
          </Stack>
        )}
      />
    </Box>
  );
};
