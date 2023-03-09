import React from "react";
import "../Css/Homepage.css";
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const Homepage = () => {
  const picUrl = [
    {
      url: "https://res.cloudinary.com/alnnex/image/upload/v1673071582/thesis/hero_lodk7w.jpg",
    },
    {
      url: "https://res.cloudinary.com/alnnex/image/upload/v1675960235/thesis/mp_digitalbackgrounds_May_desktop_20_0050-1024x576_bzecy6.jpg",
    },
    {
      url: "https://res.cloudinary.com/alnnex/image/upload/v1675960284/thesis/teahub.io-wallpaper-psicologia-1609686_xkvl06.jpg",
    },
    {
      url: "https://res.cloudinary.com/alnnex/image/upload/v1675960282/thesis/watercolor-world-mental-health-day-background_23-2149637237_u048fi.jpg",
    },
  ];
  return (
    <Container maxW="8xl">
      <Swiper
        modules={[Navigation, Scrollbar, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        loop="true"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {picUrl.map((pic) => (
          <SwiperSlide key={pic.url}>
            <Image
              objectFit="cover"
              src={pic.url}
              h={{ md: "55vh" }}
              w="100%"
            />
            <Text
              fontWeight="semibold"
              fontSize={"2xl"}
              p={{ base: "10px 0px", xl: "20px 100px" }}
            >
              Title
              <br />
              <span className="text-sm">
                Aliqua non culpa fugiat laboris elit id mollit sunt
                reprehenderit do. Dolore excepteur laborum nisi anim proident
                est ut irure aliquip aliquip tempor. Veniam occaecat ut
                incididunt dolore sunt consectetur do proident. Dolore non elit
                est ipsum magna pariatur aute cupidatat consequat sit laboris
                aliqua irure. 
              </span>
            </Text>
          </SwiperSlide>
        ))}
      </Swiper>

      <Grid>
        <GridItem m="25px 0">
          <Box justifyContent={"center"} display={"flex"} gap={2}>
            <Button
              w={{ md: "200px" }}
              h="12"
              bg={"#FCB19A"}
              _hover={{ bg: "#FFBB96" }}
            >
              Get Started
            </Button>
            <Button
              w={{ md: "200px" }}
              h="12"
              bg={"purple.400"}
              _hover={{ bg: "purple.300" }}
            >
              Take a Test
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Homepage;
