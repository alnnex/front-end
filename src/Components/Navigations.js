import {
  AspectRatio,
  Box,
  Button,
  Container,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { PathFinder } from "./Misc/PathFinder";

const Navigations = () => {
  const { user } = ChatState();
  const path = PathFinder();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    localStorage.clear();
    navigate("/auth");
  }
  return (
    <Box w="100%" bgColor={"white"}>
      <Container maxW="8xl" justifyContent="space-between" display="flex">
        <Link to="/">
          <Box display="flex">
            <Image
              w="35px"
              h="35px"
              m="5px 5px"
              objectFit="cover"
              src="https://res.cloudinary.com/alnnex/image/upload/v1673071581/thesis/logo_igqq23.png"
            />

            <Text fontSize="3xl" display={{ base: "none", sm: "inline-block" }}>
              eKonsulta
            </Text>
          </Box>
        </Link>

        <Box textAlign="center">
          <Link to="/tests">
            <Button
              borderRadius="0px"
              bg={location.pathname === "/tests" ? "gray.300" : "white"}
              h="100%"
              p={2}
            >
              Tests
            </Button>
          </Link>
          {user && (
            <>
              <Link to="/chats">
                <Button
                  borderRadius="0px"
                  bg={location.pathname === "/chats" ? "gray.300" : "white"}
                  h="100%"
                  p={2}
                >
                  Chat
                </Button>
              </Link>
              {path !== "/chats" && (
                <Button
                  bg={"white"}
                  _hover={{ bg: "red.600", textColor: "white" }}
                  textColor="red"
                  borderRadius="0px"
                  h="100%"
                  p={2}
                  onClick={() => handleLogout()}
                >
                  Logout
                </Button>
              )}
            </>
          )}

          {!user && (
            <Link to="/auth">
              <Button borderRadius="0px" bg={"white"} h="100%" p={2}>
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Navigations;
