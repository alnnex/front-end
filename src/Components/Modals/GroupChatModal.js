import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
  FormLabel,
  useToast,
  Box,
  Wrap,
  WrapItem,
  Stack,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserList from "../UserList";
import UserBadgeItem from "../Misc/UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, chats, setChats } = ChatState();
  const toast = useToast();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
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
  async function handleSubmit() {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please Fill All Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    if (selectedUsers.length < 2) {
      toast({
        title: "Need atleast 2 members",
        status: "warning",
        duration: 5000,
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
      const { data } = await axios.post(
        "http://localhost:5000/api/chat/group",

        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      setSearch("");
      setSearchResult([]);
      setSelectedUsers([]);
      setGroupChatName("");
      onClose();
      toast({
        title: "Group Chat Created Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: "Failed to Create Group Chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  }

  useEffect(() => {
    handleSearch();
  }, [search, onOpen]);

  function handleGroup(userToAdd) {
    if (selectedUsers.some((o) => o._id === userToAdd._id)) {
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

    setSelectedUsers([...selectedUsers, userToAdd]);
  }

  function handleClose() {
    onClose();
    setSearch("");
    setSearchResult([]);
    setSelectedUsers([]);
    setGroupChatName("");
  }

  function handleDelete(userToDelete) {
    setSelectedUsers(
      selectedUsers.filter((sel) => sel._id !== userToDelete._id)
    );
  }

  return (
    <>
      {children ? <span onClick={onOpen}>{children}</span> : ""}
      <Modal isOpen={isOpen} onClose={() => handleClose()}>
        <ModalOverlay />
        <ModalContent overflowY="hidden">
          <ModalHeader>Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={2}>
              {/* <FormLabel></FormLabel> */}
              <Input
                type="text"
                placeholder="Group Chat Name"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              {/* <FormLabel></FormLabel> */}
              <Input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for Members"
              />
            </FormControl>{" "}
            <Stack display={"flex"} mt={2}>
              {" "}
              <Wrap spacing="2px">
                {selectedUsers.map((u) => (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleDelete(u)}
                  />
                ))}{" "}
              </Wrap>{" "}
            </Stack>
            {loading ? (
              <div>Loading</div>
            ) : (
              <>
                {!user.psychologist ? (
                  <Stack mt={2} h="32vh" overflowY="auto">
                    {" "}
                    {searchResult
                      ?.filter((user) => user.psychologist)
                      .map((filteredUser) => (
                        <>
                          <UserList
                            key={filteredUser._id}
                            user={filteredUser}
                            handleFunction={() => handleGroup(filteredUser)}
                          />
                        </>
                      ))}
                  </Stack>
                ) : (
                  <Stack mt={2} h="32vh" overflowY="auto">
                    {" "}
                    {searchResult?.map((userChat) => (
                      <Box key={userChat._id}>
                        <UserList
                          user={userChat}
                          handleFunction={() => handleGroup(userChat)}
                        />
                      </Box>
                    ))}
                  </Stack>
                )}
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
