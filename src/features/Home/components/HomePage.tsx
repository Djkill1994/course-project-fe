import { Stack, Box, CircularProgress, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { TagCloud } from "react-tagcloud";
import { ItemCard } from "../../Items/components/ItemCard";
import {
  ITag,
  useGetItemsPortionQuery,
  useGetTagsQuery,
} from "../../Items/api/item.api";
import { useGetAllCollectionsQuery } from "../../Collection/api/collections.api";
import { CollectionCard } from "../../Collection/components/CollectionCard";
import { useTranslation } from "react-i18next";
import { ROUTE_PATHS } from "../../../App";
import { generatePath, useNavigate } from "react-router-dom";
//todo подкрутить карусель
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
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 4,
                  partialVisibilityGutter: 10,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                  partialVisibilityGutter: 10,
                },
              }}
            >
              {dataItems?.map(({ id, name, imgSrc, likes, date }) => (
                <Box key={id} pl="12px">
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
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 3,
                  partialVisibilityGutter: 10,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                  partialVisibilityGutter: 10,
                },
              }}
            >
              {dataCollections?.map(
                ({ theme, description, date, name, imgSrc, id }) => (
                  <Box key={id} pl="12px">
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
          <TagCloud
            style={{ cursor: "pointer" }}
            minSize={16}
            maxSize={35}
            colorOptions={{ luminosity: "light", hue: "blue" }}
            tags={dataTags?.map((tag) => {
              return { id: tag.id, count: tag.count, value: tag.tag };
            })}
            onClick={(tag: ITag) =>
              navigate(generatePath(ROUTE_PATHS.FoundTags, { id: tag.id }))
            }
          />
        )}
      </Box>
    </Stack>
  );
};
