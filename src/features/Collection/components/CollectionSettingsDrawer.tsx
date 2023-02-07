import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { FC } from "react";

interface IProps {
  open: boolean;
}

export const CollectionSettingsDrawer: FC<IProps> = ({ open }) => {
  return (
    <Box>
      <Drawer anchor="right" open={open}>
        <List sx={{ width: "500px" }}>DRAWER</List>
      </Drawer>
    </Box>
  );
};
