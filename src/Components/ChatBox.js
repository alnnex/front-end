import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { getSender } from "../Config/ChatLogic";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatBox = () => {
  const { selectedChat} = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "65%" }}
      borderRadius={{ base: "none", md: "lg" }}
      borderWidth="1px"
      h={{ md: "calc(100vh - 105px)", base: "calc(100vh - 93px)" }}
    >
      <Box w="100%" h="100%">
        <SingleChat />
      </Box>
    </Box>
  );
};

export default ChatBox;
