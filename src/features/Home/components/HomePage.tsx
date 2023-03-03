import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { TagCloud } from "react-tagcloud";
import { ItemCard } from "../../Items/components/ItemCard";
import {
  useGetItemsPortionQuery,
  useGetTagsQuery,
} from "../../Items/api/item.api";
import { useGetAllCollectionsQuery } from "../../Collection/api/collections.api";
import { CollectionCard } from "../../Collection/components/CollectionCard";
import { useTranslation } from "react-i18next";
import { ROUTE_PATHS } from "../../../App";
import { generatePath, useNavigate } from "react-router-dom";

export const HomePage = () => {
  const {
    data: dataItems,
    isLoading: isLoadingItems,
    isSuccess: isSuccessItems,
  } = useGetItemsPortionQuery();
  const {
    data: dataCollections,
    isLoading: isLoadingCollections,
    isSuccess: isSuccessCollections,
  } = useGetAllCollectionsQuery();
  const {
    data: dataTags,
    isLoading: isLoadingTags,
    isSuccess: isSuccessTags,
  } = useGetTagsQuery();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Stack gap="60px">
      <Box>
        <Typography
          flexDirection="column"
          display="flex"
          alignItems="center"
          pb="16px"
          variant="h5"
        >
          {t("features.HomePage.lastAddedItem")}
        </Typography>
        {isLoadingItems && (
          <Box display="flex" justifyContent="space-evenly">
            <CircularProgress />
          </Box>
        )}
        {isSuccessItems && (
          <Box p="0 22px 30px" position="relative">
            <Carousel
              autoPlay
              autoPlaySpeed={4000}
              containerClass="container"
              showDots
              infinite
              pauseOnHover
              renderDotsOutside
              responsive={{
                superLargeDesktop: {
                  breakpoint: { max: 4000, min: 3000 },
                  items: 6,
                },
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 4,
                },
                tablet: {
                  breakpoint: { max: 1024, min: 860 },
                  items: 3,
                },
                tabletSmall: {
                  breakpoint: { max: 860, min: 570 },
                  items: 2,
                },
                mobile: {
                  breakpoint: { max: 570, min: 0 },
                  items: 1,
                },
              }}
            >
              {dataItems?.map(({ id, name, imgSrc, likes, date }) => (
                <Box key={id} pl="12px" mt={1} mb={1}>
                  <ItemCard
                    id={id}
                    name={name}
                    imgSrc={imgSrc}
                    likes={likes}
                    date={date}
                  />
                </Box>
              ))}
            </Carousel>
          </Box>
        )}
      </Box>
      <Box>
        <Typography
          flexDirection="column"
          display="flex"
          alignItems="center"
          pb="16px"
          variant="h5"
        >
          {t("features.HomePage.mostBiggestCollection")}
        </Typography>
        {isLoadingCollections && (
          <Box display="flex" justifyContent="space-evenly">
            <CircularProgress />
          </Box>
        )}
        {isSuccessCollections && (
          <Box p="0 22px 30px" position="relative">
            <Carousel
              autoPlay
              autoPlaySpeed={5000}
              containerClass="container"
              showDots
              infinite
              pauseOnHover
              renderDotsOutside
              responsive={{
                superLargeDesktop: {
                  breakpoint: { max: 4000, min: 3000 },
                  items: 5,
                },
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 3,
                },
                tablet: {
                  breakpoint: { max: 1024, min: 860 },
                  items: 2,
                },
                tabletSmall: {
                  breakpoint: { max: 860, min: 0 },
                  items: 1,
                },
              }}
            >
              {dataCollections?.map(
                ({ theme, description, date, name, imgSrc, id }) => (
                  <Box key={id} pl="12px" mt={1} mb={1}>
                    <CollectionCard
                      theme={theme}
                      description={description}
                      date={date}
                      name={name}
                      imgSrc={imgSrc}
                      id={id}
                    />
                  </Box>
                )
              )}
            </Carousel>
          </Box>
        )}
      </Box>
      <Box p="0 22px">
        {isLoadingTags && (
          <Box display="flex" justifyContent="space-evenly">
            <CircularProgress />
          </Box>
        )}
        {isSuccessTags && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={6}
          >
            <TagCloud
              style={{ cursor: "pointer" }}
              minSize={32}
              maxSize={64}
              colorOptions={{ luminosity: "light", hue: "blue" }}
              tags={dataTags?.map((tag) => ({
                id: tag.id,
                count: tag.count,
                value: tag.tag,
              }))}
              onClick={(tag) =>
                navigate(
                  generatePath(ROUTE_PATHS.FoundTags, {
                    id: tag.id,
                    tagName: tag.value,
                  })
                )
              }
            />
          </Box>
        )}
      </Box>
    </Stack>
  );
};
