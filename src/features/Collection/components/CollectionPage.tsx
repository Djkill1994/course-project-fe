import { Box } from "@mui/material";
import { FC } from "react";
import { CollectionTable } from "./CollectionTable";

export const CollectionPage: FC = () => {
  return (
    <Box m="auto" maxWidth="1000px">
      <CollectionTable />
    </Box>
  );
};
