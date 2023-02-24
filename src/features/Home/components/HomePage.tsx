import { Stack, Box, CircularProgress, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { TagCloud } from "react-tagcloud";
import { ItemCard } from "../../Items/components/ItemCard";
import { useGetAllItemsQuery } from "../../Items/api/item.api";
import { useGetAllCollectionsQuery } from "../../Collection/api/collections.api";
import { CollectionCard } from "../../Collection/components/CollectionCard";
import { theme } from "../../../theme";
//todo реализовать обалко тэгов
const dataQ = [
  { value: "jQuery", count: 25 },
  { value: "MongoDB", count: 18 },
  { value: "JavaScript", count: 38 },
  { value: "React", count: 30 },
  { value: "Nodejs", count: 28 },
  { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 },
  { value: "CSS3", count: 20 },
  { value: "Webpack", count: 22 },
  { value: "Babel.js", count: 7 },
  { value: "ECMAScript", count: 25 },
  { value: "Jest", count: 15 },
  { value: "Mocha", count: 17 },
  { value: "React Native", count: 27 },
  { value: "Angular.js", count: 30 },
  { value: "TypeScript", count: 15 },
  { value: "Flow", count: 30 },
  { value: "NPM", count: 11 },
];

export const HomePage = () => {
  const {
    data: dataItems,
    isLoading: isLoadingItems,
    isSuccess: isSuccessItems,
  } = useGetAllItemsQuery();
  const {
    data: dataCollections,
    isLoading: isLoadingCollections,
    isSuccess: isSuccessCollections,
  } = useGetAllCollectionsQuery();

  return (
    <Stack gap="60px" p="0 22px">
      <Box>
        <Typography
          flexDirection="column"
          display="flex"
          alignItems="center"
          pb="16px"
          variant="h5"
        >
          Last added Items
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
              autoPlaySpeed={3000}
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
                  partialVisibilityGutter: 40,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                  partialVisibilityGutter: 30,
                },
              }}
            >
              {dataItems?.map(({ id, name, imgSrc, tags, likes, date }) => (
                <Box key={id} pl="12px">
                  <ItemCard
                    id={id}
                    name={name}
                    imgSrc={imgSrc}
                    tags={tags}
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
          The most biggest collections
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
              autoPlaySpeed={3500}
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
                  partialVisibilityGutter: 40,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                  partialVisibilityGutter: 30,
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

      <Box>
        <TagCloud
          //todo Добавить курсор поинтер
          minSize={12}
          maxSize={35}
          colorOptions={{ luminosity: "light", hue: "blue" }}
          tags={dataQ}
          onClick={(tag: string) => console.log("clicking on tag:", tag)}
        />
      </Box>
    </Stack>
  );
};
