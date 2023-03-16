import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Wrap,
  Box,
  useToast,
  InputGroup,
  VStack,
  Avatar,
} from "@chakra-ui/react";
import UserList from "../UserList";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserBadgeItem from "../Misc/UserBadgeItem";
import { TriggerState } from "../../Context/TriggerProvider";

const EditGroupChatModal = ({ children, groupChat }) => {
  const { user, selectedChat, setSelectedChat, ENDPOINT } = ChatState();
  const { trigger, setTrigger } = TriggerState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [groupChatName, setGroupChatName] = useState(groupChat.chatName);
  const [groupUsers, setGroupUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();

  const toast = useToast();
  async function handleRename() {
    if (user._id !== groupChat.groupAdmin._id) {
      toast({
        title: "Cannot Add User",
        description: "Only the Group Admin can Rename Group Name",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${ENDPOINT}/api/chat/rename`,
        { chatName: groupChatName, chatId: groupChat._id },
        config
      );

      setSelectedChat((prev) => ({ ...prev, chatName: data.chatName }));
      setGroupChatName(data.chatName);
      setTrigger(!trigger);
      toast({
        title: "Group Chat Name Updated Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Failed to Rename Group! ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  }

  async function handleDelete(userToDelete) {
    if (groupUsers.length < 4) {
      toast({
        title: "Cannot Remove User",
        description: "Needs a minimum of 2 members",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    if (user._id !== groupChat.groupAdmin._id) {
      toast({
        title: "Cannot Add User",
        description: "Only the Group Admin can Add or Remove Users",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${ENDPOINT}/api/chat/groupremove`,
        { userId: userToDelete._id, chatId: groupChat._id },
        config
      );
      setGroupUsers(data.users);
      setTrigger(!trigger);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Failed to delete User! ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
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
        title: "Something went wrong",
        description: "Search Results Failed to Load! ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  }

  async function handleAdd(userToAdd) {
    if (user._id !== groupChat.groupAdmin._id) {
      toast({
        title: "Cannot Add User",
        description: "Only the Group Admin can Add or Remove Users",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    if (groupUsers.some((o) => o._id === userToAdd._id)) {
      toast({
        title: "Something went wrong",
        description: "User is Already Added",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${ENDPOINT}/api/chat/groupadd`,
        { userId: userToAdd._id, chatId: groupChat._id },
        config
      );
      setGroupUsers(data.users);
      // setTrigger(!trigger);

      setLoading(false);
      toast({
        title: "User added successfuly",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    } catch (error) {}
  }

  async function removeGroupChat(chat) {
    if (user._id !== chat.groupAdmin._id) {
      toast({
        title: "Cannot Add User",
        description: "Only the Group Admin can Add or Remove Users",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${ENDPOINT}/api/chat/removeGroupChat`,
        { chatId: chat._id },
        config
      );
      setTrigger(!trigger);
      setSelectedChat();
      setLoading(false);
    } catch (error) {}
  }

  function handleClose() {
    onClose();
    // setGroupChatName(groupChatNameInitial);
    // setGroupUsers(groupUsersInitial);
    setSearch("");
    setSearchResult([]);
  }

  useEffect(() => {
    setGroupUsers(groupChat.users);
    setGroupChatName(groupChat.chatName);
  }, [onOpen, selectedChat]);

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div>
      {children ? <span onClick={onOpen}>{children}</span> : ""}

      <Modal isOpen={isOpen} onClose={() => handleClose()}>
        <ModalOverlay />
        <ModalContent mt={8}>
          <ModalHeader>Edit Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Text fontSize="xl" fontWeight="semibold">
                Admin
              </Text>
              <Avatar
                src={groupChat.groupAdmin.pic}
                name={
                  JSON.stringify(groupChat.groupAdmin.firstName)?.replace(
                    /['"]+/g,
                    ""
                  ) +
                  " " +
                  JSON.stringify(groupChat.groupAdmin.lastName)?.replace(
                    /['"]+/g,
                    ""
                  )
                }
              />{" "}
              <Text fontSize={"xl"} fontWeight="semibold">
                {groupChat.groupAdmin.firstName} {groupChat.groupAdmin.lastName}{" "}
                {groupChat.groupAdmin.psychologist && <>, Psy.D</>}
              </Text>
              {groupChat.groupAdmin.psychologist && (
                <Text textColor={"maroon"} fontWeight="bold">
                  Psychometrician
                </Text>
              )}
            </VStack>
            <FormControl>
              <FormLabel>Group Name</FormLabel>
              <InputGroup gap={1}>
                <Input
                  type="text"
                  placeholder="Group Chat Name"
                  onChange={(e) => setGroupChatName(e.target.value)}
                  value={groupChatName}
                />
                <Button
                  onClick={() => handleRename()}
                  colorScheme="blue"
                  mb={2}
                >
                  Update
                </Button>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Members</FormLabel>
              <Stack display={"flex"} mt={0} mb={2}>
                {" "}
                <Wrap spacing="2px">
                  {groupUsers?.map((u) => (
                    <>
                      {u._id !== user._id && (
                        <UserBadgeItem
                          key={u._id}
                          user={u}
                          handleFunction={() => handleDelete(u)}
                        />
                      )}
                    </>
                  ))}{" "}
                </Wrap>{" "}
              </Stack>
              <Input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Add Members"
              />
            </FormControl>{" "}
            {loading ? (
              <div>Loading</div>
            ) : (
              <>
                {!user.psychologist ? (
                  <Stack mt={2} maxH="32vh" overflowY="auto">
                    {" "}
                    {searchResult
                      ?.filter((user) => user.psychologist)
                      .map((filteredUser) => (
                        <>
                          <UserList
                            key={filteredUser._id}
                            user={filteredUser}
                            handleFunction={() => handleAdd(filteredUser)}
                          />
                        </>
                      ))}
                  </Stack>
                ) : (
                  <Stack mt={2} maxH="32vh" overflowY="auto">
                    {searchResult?.map((userChat) => (
                      <Box key={groupUsers._id}>
                        <UserList
                          user={userChat}
                          handleFunction={() => handleAdd(userChat)}
                        />
                      </Box>
                    ))}
                  </Stack>
                )}
              </>
            )}
            <Box display="flex" justifyContent="end">
              <Button
                mt={2}
                colorScheme="red"
                onClick={() => removeGroupChat(groupChat)}
              >
                Delete
              </Button>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditGroupChatModal;
