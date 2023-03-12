import {
  Avatar,
  Box,
  Button,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawerLoading from "./Misc/SideDrawerLoading";
import { TriggerState } from "../Context/TriggerProvider";
import { getSender, getLatestMessage } from "../Config/ChatLogic";
import GroupChatModal from "../Components/Modals/GroupChatModal";
import tone from "../audio/tone.mp3";

const MyChats = () => {
  const toast = useToast();
  const { trigger, setTrigger, reFetchChats } = TriggerState();
  const {
    user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    ENDPOINT,
  } = ChatState();

  const [loggedUser, setLoggedUser] = useState();


  async function fetchChats() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${ENDPOINT}/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: "Failed to Load Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [reFetchChats, trigger]);

  function selectedChatHandle(chat) {
    setSelectedChat(chat);
    setTrigger(!trigger);
  }

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "35%" }}
      borderRadius={{ base: "none", md: "lg" }}
      borderWidth="1px"
      maxH={{ base: "calc(100vh - 91px)", md: "calc(100vh - 105px)" }}
      overflowY={"hidden"}
    >
      <Box
        pb={3}
        px={3}
        fontSize="20px"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        Chats
        {user.psychologist && (
          <GroupChatModal>
            <Tooltip
              label="Create a Group Chat"
              hasArrow
              placement="bottom-start"
            >
              <Button display="flex">
                <Text mr={2} display={{ base: "none", md: "inline" }}>
                  Group Chat
                </Text>
                <i className="fa-solid fa-plus"></i>
              </Button>
            </Tooltip>
          </GroupChatModal>
        )}
      </Box>
      <Box width={"100%"}>
        {chats ? (
          <Stack overflowY="auto" h="calc(100vh - 171px)" px={2}>
            {chats &&
              chats.map((chat) => (
                <Box
                  key={chat._id}
                  onClick={() => selectedChatHandle(chat)}
                  cursor="pointer"
                  bgColor={
                    selectedChat?._id === chat?._id ? "#FFBB96" : "#E8E8E8"
                  }
                  px={3}
                  py={2}
                  borderRadius="lg"
                  _hover={{ bgColor: "#FCB19A" }}
                  transition="0.2s"
                >
                  {" "}
                  {!chat.isGroupChat ? (
                    <>
                      {getSender(loggedUser, chat.users)}
                      {/* {getLatestMessage(chat.latestMessage)} */}
                    </>
                  ) : (
                    <Box>
                      <Box display={"flex"} alignItems="center">
                        <Avatar size="sm" name={chat.chatName} mr={2} />
                        <Text fontWeight={"semibold"}>{chat.chatName}</Text>
                      </Box>{" "}
                      {/* <Text> {getLatestMessage(chat?.latestMessage)}</Text> */}
                    </Box>
                  )}
                </Box>
              ))}
          </Stack>
        ) : (
          <SideDrawerLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
