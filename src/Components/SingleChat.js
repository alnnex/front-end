import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import "../Css/SingleChat.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getSender, getSenderfull } from "../Config/ChatLogic";
import { ChatState } from "../Context/ChatProvider";
import EditGroupChatModal from "./Modals/EditGroupChatModal";
import ProfileModal from "./Modals/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import { TriggerState } from "../Context/TriggerProvider";
import tone from "../audio/tone.mp3";

var socket, selectedChatCompare;

const SingleChat = () => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    notifications,
    setNotifications,
    ENDPOINT,
  } = ChatState();

  const { trigger, setTrigger, reFetchChats, setReFetchChats } = TriggerState();
  const toast = useToast();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const sound = new Audio(tone);

  async function sendMessage(event) {
    if (event === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          `${ENDPOINT}/api/message`,
          { content: newMessage, chatId: selectedChat._id },
          config
        );

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Something Went Wrong",
          description: "Failed to send message",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-left",
        });
      }
    }
  }

  async function fetchMessages() {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${ENDPOINT}/api/message/${selectedChat._id}`,
        config
      );
      socket.emit("join chat", selectedChat._id);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: "Failed to load messages",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    }
  }

  // function sound() {}
  // async function accessNotif(notif) {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };

  //     const { data } = await axios.post(
  //       `${ENDPOINT}/api/notifications`,
  //       {
  //         senderId: notif.sender._id,
  //         content: notif.content,
  //         chatId: notif.chat._id,
  //       },
  //       config
  //     );
  //     setNotifications([...notifications, data]);
  //     console.log(data);
  //   } catch (error) {
  //     toast({
  //       title: "Something Went Wrong",
  //       description: "Failed to send message",
  //       status: "error",
  //       duration: 2000,
  //       isClosable: true,
  //       position: "top-left",
  //     });
  //   }
  // }

  function typingHandler(e) {
    setNewMessage(e.target.value);

    // if (!socketConnected) return;

    // if (!typing) {
    //   setTyping(true);
    //   socket.emit("typing", selectedChat._id);
    // }

    // let lastTypingTime = new Date().getTime();
    // var timerLength = 3000;

    // setTimeout(() => {
    //   var timeNew = new Date().getTime();
    //   var timeDiff = timeNew - lastTypingTime;

    //   if (timeDiff >= timerLength && typing) {
    //     socket.emit("stop typing", selectedChat._id);
    //     setTyping(false);
    //   }
    // }, timerLength);
  }

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notifications.some((o) => o._id === newMessageRecieved._id)) {
          setNotifications([...notifications, newMessageRecieved]);
          setReFetchChats(!reFetchChats);
          setTrigger(!trigger);
          sound.play().vol(0.2);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
        sound.play().vol(0.2);
      }
    });
  });

  return (
    <>
      {selectedChat ? (
        <>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<i className="fa-sharp fa-solid fa-arrow-left"></i>}
              onClick={() => {
                setSelectedChat("");
              }}
            ></IconButton>

            <Box
              w="65%"
              justifyContent={{
                md: "start",
                base: "center",
              }}
              display="flex"
            >
              {!selectedChat.isGroupChat ? (
                <Box p={1}>{getSender(user, selectedChat.users)}</Box>
              ) : (
                <Box display={"flex"} alignItems="center" p={1}>
                  <Avatar size="sm" name={selectedChat.chatName} mr={2} />
                  <Text noOfLines={1}>{selectedChat.chatName}</Text>
                </Box>
              )}
            </Box>
            {selectedChat?.isGroupChat ? (
              <>
                <EditGroupChatModal groupChat={selectedChat}>
                  <Tooltip
                    label="Edit Group Chat"
                    hasArrow
                    placement="bottom-start"
                  >
                    <IconButton
                      icon={<i className="fa-solid fa-pen-to-square"></i>}
                    ></IconButton>
                  </Tooltip>
                </EditGroupChatModal>
              </>
            ) : (
              <ProfileModal user={getSenderfull(user, selectedChat.users)}>
                <Tooltip label="View Profile" hasArrow placement="bottom-start">
                  <IconButton
                    icon={<i className="fa-solid fa-eye"></i>}
                  ></IconButton>
                </Tooltip>
              </ProfileModal>
            )}
          </Box>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            mt={2}
            p={1}
            bg="#E8E8E8"
            w="100%"
            borderRadius="lg"
            overflowY="hidden"
            h="calc(100% - 48px)"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <>
                <div className="messages">
                  <ScrollableChat messages={messages} />
                </div>

                <Box borderRadius="lg" mt={1}>
                  <FormControl
                    onKeyDown={(event) => sendMessage(event.key)}
                    isRequired
                  >
                    {isTyping ? (
                      <Box bgColor="rgba(159,159,159,1%)">
                        <Text>Typing...</Text>
                      </Box>
                    ) : (
                      <></>
                    )}
                    <InputGroup>
                      <Input
                        type="text"
                        placeholder="Message Here"
                        w="100%"
                        bg="white"
                        boxShadow="2xl"
                        shadow="inner"
                        onChange={typingHandler}
                        value={newMessage}
                      />
                      <InputRightElement>
                        <IconButton
                          type="submit"
                          borderLeftRadius="none"
                          bgColor="purple.300"
                          onClick={() => sendMessage("Enter")}
                        >
                          <i className="fa-solid fa-paper-plane"></i>
                        </IconButton>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </Box>
              </>
            )}
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="calc(100vh - 130px)"
        >
          <Text fontSize="3xl" pb={3}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
