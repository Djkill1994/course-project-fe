import { Box, IconButton, Stack } from "@mui/material";
import { FC } from "react";
import { CreateCollectionModal } from "./CreateCollectionModal";
import { useModal } from "../../../common/hooks/useModal";
import { AddBoxOutlined } from "@mui/icons-material";
import { useGetCollectionsQuery } from "../api/collections.api";
import { Header } from "../../../common/components/Header";

export const MyCollectionsPage: FC = () => {
  const { isOpened, open, close } = useModal();
  const { data } = useGetCollectionsQuery();

  return (
    <Box>
      <Header />
      <Box mt="50px">
        {" "}
        {isOpened && <CreateCollectionModal onClose={close} />}
      </Box>
      <IconButton onClick={() => open()} size="large" color="primary">
        <AddBoxOutlined />
      </IconButton>
      <Stack gap="5px">
        {data?.map(({ name, id, theme, description }) => (
          <Box key={id}>
            <Box>{name}</Box>
            <Box>{theme}</Box>
            <Box>{description}</Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
