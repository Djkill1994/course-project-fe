import { Box, Button, Stack } from "@mui/material";
import { FC } from "react";
import { CreateCollectionModal } from "./CreateCollectionModal";
import { useModal } from "../../../common/hooks/useModal";
import { useGetCollectionsQuery } from "../api/collections.api";
import { CollectionCard } from "./CollectionCard";
import { Add } from "@mui/icons-material";

export const MyCollectionsPage: FC = () => {
  const { isOpened, open, close } = useModal();
  const { data } = useGetCollectionsQuery();

  return (
    <Box m="0">
      {isOpened && <CreateCollectionModal onClose={close} />}
      <Button
        onClick={() => open()}
        variant="contained"
        size="small"
        sx={{ textTransform: "none" }}
      >
        <Add sx={{ width: "14px" }} /> New collection
      </Button>
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
