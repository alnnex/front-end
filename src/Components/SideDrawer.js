import React, { useEffect, useState } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Box,
  Tooltip,
  Container,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Image,
  AspectRatio,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Wrap,
  WrapItem,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  InputLeftElement,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./Modals/EditProfileModal";
import axios from "axios";
import UserList from "./UserList";
import SideDrawerLoading from "./Misc/SideDrawerLoading";
import { getSender, getSenderNameOnly } from "../Config/ChatLogic";
import { TriggerState } from "../Context/TriggerProvider";

const SideDrawer = () => {
  const {
    user,
    setSelectedChat,
    selectedChat,
    chats,
    setChats,
    notifications,
    setNotifications,
    ENDPOINT,
  } = ChatState();
  const { trigger } = TriggerState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [localTrigger, setLocalTrigger] = useState(false);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/auth");
  }
  useEffect(() => {
    handleSearch();
  }, [search, localTrigger]);

  useEffect(() => {
    fetchNotifications();
  }, [localTrigger, trigger]);

  useEffect(() => {
    notifications?.map((notif) => {
      if (notif?.chat?._id === selectedChat?._id) {
        console.log("to delete", notif);
        deleteNotif(notif?._id);
      }
    });
  }, [notifications, selectedChat, trigger]);

  async function fetchNotifications() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${ENDPOINT}/api/notifications/fetchNotif`,
        {
          userId: user._id,
        },
        config
      );
      console.log("notif fetched", data);
      setNotifications(data);
    } catch (error) {}
  }

  async function handleSearch() {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${ENDPOINT}/api/user?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Search Failed! Something went wrong",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    }
  }

  async function accessChat(userId) {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${ENDPOINT}/api/chat`,
        { userId: userId },
        config
      );
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Chat Fetching Failed! ",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    }
  }
  async function deleteNotif(notifId) {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.put(
        `${ENDPOINT}/api/notifications/deleteNotif`,
        { notifId },
        config
      );
      setLocalTrigger(!localTrigger);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Notification Deletion Failed! ",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    }
  }
  const combinedName =
    JSON.stringify(user.firstName).replace(/['"]+/g, "") +
    " " +
    JSON.stringify(user.lastName).replace(/['"]+/g, "");

  function handleSideDrawer() {
    onOpen();
    setLocalTrigger(!localTrigger);
  }
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        my={1}
        px={{ base: 2, md: 0 }}
      >
        <Tooltip label="Search Users to Chat" placement="bottom-end" hasArrow>
          <Button
            variant="ghost"
            _hover={{ bgColor: "rgba(159,159,159,50%)" }}
            bgColor="rgba(159,159,159,20%)"
            onClick={handleSideDrawer}
          >
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", sm: "inline-block" }}>
              Search User
            </Text>
          </Button>
        </Tooltip>{" "}
        <Box display="flex" gap={4}>
          <Menu>
            <MenuButton position="relative" p={1}>
              {notifications.length > 0 && (
                <Box position="absolute" top={-1} right={-3}>
                  <i
                    style={{ color: "red" }}
                    className="fa-solid fa-comment"
                  ></i>
                  <Box
                    position="absolute"
                    top={0.23}
                    right={1}
                    textColor="white"
                    fontSize="sm"
                  >
                    {notifications.length}
                  </Box>
                </Box>
              )}
              <i className="fa-sharp fa-solid fa-bell"></i>
            </MenuButton>
            <MenuList px={2}>
              {!notifications.length && "No New Messages"}
              {notifications
                .filter((notifs) => notifs.sender._id !== user._id)
                .map((filteredNotifs) => (
                  <MenuItem
                    key={filteredNotifs._id}
                    onClick={() => {
                      setSelectedChat(filteredNotifs.chat);
                      setNotifications(
                        notifications.filter((n) => n !== filteredNotifs)
                      );
                      deleteNotif(filteredNotifs._id);
                    }}
                  >
                    {" "}
                    {filteredNotifs.chat?.isGroupChat
                      ? `New Message in ${filteredNotifs?.chat.chatName}`
                      : `New Message from ${filteredNotifs?.sender?.firstName} ${filteredNotifs?.sender?.lastName}`}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              p="2px 10px"
              display="flex"
              bgColor="rgba(159,159,159,20%)"
              rightIcon={<i className="fa-sharp fa-solid fa-angle-down"></i>}
              _hover={{ bgColor: "rgba(159,159,159,50%)" }}
            >
              <Box display={"flex"}>
                <Avatar size="sm" name={combinedName} src={user.pic} />
                <Text
                  display={{ base: "none", sm: "inline-block" }}
                  m="auto 10px"
                >
                  {user.firstName} {user.lastName}
                </Text>
              </Box>
            </MenuButton>

            <MenuList>
              <Text textAlign="center" px={2} fontWeight="semibold">
                {user.email}
              </Text>
              <Text display={{ sm: "none", base: "block" }} textAlign="center">
                {user.firstName} {user.lastName}
              </Text>
              {user.psychologist && (
                <Text
                  textAlign="center"
                  my={"auto"}
                  fontWeight="medium"
                  textColor={"maroon"}
                  fontSize="medium"
                >
                  Psychometrician
                </Text>
              )}
              <MenuDivider />
              <ProfileModal user={user}>
                <MenuItem>Edit Profile</MenuItem>
              </ProfileModal>

              <MenuItem
                onClick={() => handleLogout()}
                bg="red.600"
                _hover={{ bg: "red.300" }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>{" "}
        </Box>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Search User
            <InputGroup mt={1}>
              <Input
                type="text"
                placeholder="Search User Here"
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputLeftElement>
                <i className="fas fa-search"></i>
              </InputLeftElement>
            </InputGroup>
          </DrawerHeader>
          <DrawerBody>
            {loading ? (
              <SideDrawerLoading />
            ) : (
              <>
                {loadingChat ? (
                  <Spinner display="flex" my="100%" mx="auto" />
                ) : (
                  <>
                    {!user.psychologist ? (
                      <>
                        {" "}
                        {searchResult
                          ?.filter((user) => user.psychologist)
                          .map((filteredUser) => (
                            <Box key={filteredUser._id}>
                              <UserList
                                user={filteredUser}
                                handleFunction={() =>
                                  accessChat(filteredUser._id)
                                }
                              />
                            </Box>
                          ))}
                      </>
                    ) : (
                      <>
                        {" "}
                        {searchResult?.map((userChat) => (
                          <Box key={userChat._id}>
                            <UserList
                              user={userChat}
                              handleFunction={() => accessChat(userChat._id)}
                            />
                          </Box>
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>{" "}
    </Box>
  );
};

export default SideDrawer;
