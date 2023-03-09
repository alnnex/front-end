import React from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
const Authspage = () => {
  return (
    <Container maxW="8xl">
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(10, 1fr)" }}
        gap={{ base: 0, md: 2 }}
      >
        <GridItem colSpan={4}>
          <Box
            d="flex"
            justifyContent="center"
            p={2}
            m="20px 0 0 0"
            w="100%"
            borderRadius="lg"
          >
            <Text fontSize="2xl" textAlign="center">
              Welcome to eKonsulta
            </Text>
            <Text textAlign="center">
              Your trusted mental health service website for UB students
            </Text>
          </Box>
          <Box w="100%" borderRadius="lg">
            <Tabs>
              <TabList justifyContent="center">
                <Tab>Login</Tab>
                <Tab>Signup</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={0}>
                  <Login />
                </TabPanel>
                <TabPanel p={{ md: 4, base: 0 }}>
                  <Signup />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
        <GridItem display={{ base: "none", md: "inline-block" }} colSpan={6}>
          <Image
            h="calc(100vh - 45px)"
            w="100%"
            objectFit="cover"
            src="https://res.cloudinary.com/alnnex/image/upload/v1673071582/thesis/hero_lodk7w.jpg"
          />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Authspage;
