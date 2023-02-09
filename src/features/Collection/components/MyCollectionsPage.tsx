import { Box, IconButton, Stack } from "@mui/material";
import { FC } from "react";
import { CreateCollectionModal } from "./CreateCollectionModal";
import { useModal } from "../../../common/hooks/useModal";
import { AddBoxOutlined } from "@mui/icons-material";
import { useGetCollectionsQuery } from "../api/collections.api";
import { Header } from "../../../common/components/Header";
import { CollectionCard } from "./CollectionCard";

export const MyCollectionsPage: FC = () => {
  const { isOpened, open, close } = useModal();
  const { data } = useGetCollectionsQuery();

  return (
    <Box>
      <Header />
      <Box mt="50px">
        {isOpened && <CreateCollectionModal onClose={close} />}
      </Box>
      <IconButton onClick={() => open()} size="large" color="primary">
        <AddBoxOutlined />
      </IconButton>
      <Stack gap="10px" direction="row" flexWrap="wrap" justifyContent="center">
        {data?.map(({ name, id, theme, description, imgSrc, date }) => (
          <Box key={id}>
            <CollectionCard
              id={id}
              name={name}
              theme={theme}
              description={description}
              imgSrc={imgSrc}
              date={date}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
