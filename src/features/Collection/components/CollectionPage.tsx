import { Box } from "@mui/material";
import { FC } from "react";
import { CollectionTable } from "./CollectionTable";

// todo зарефачить все вложенные компоненты CollectionPage, перевести i18n все вложенные компоненты

export const CollectionPage: FC = () => {
  return (
    <Box m="0 50px">
      <CollectionTable />
    </Box>
  );
};
