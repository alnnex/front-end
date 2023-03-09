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
  VStack,
  Text,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { TriggerState } from "../../Context/TriggerProvider";

const GroupChatDetailsModal = ({ children, groupChatDetails }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { trigger, setTrigger } = TriggerState();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setMembers(groupChatDetails.users);
  }, [trigger, onOpen]);
  return (
    <div>
      {" "}
      {children ? <span onClick={onOpen}>{children}</span> : ""}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" fontSize="2xl">
            {groupChatDetails.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Text fontSize="xl" fontWeight="semibold">
                Admin
              </Text>
              <Avatar
                src={groupChatDetails.groupAdmin.pic}
                name={
                  JSON.stringify(groupChatDetails.groupAdmin.firstName).replace(
                    /['"]+/g,
                    ""
                  ) +
                  " " +
                  JSON.stringify(groupChatDetails.groupAdmin.lastName).replace(
                    /['"]+/g,
                    ""
                  )
                }
              />{" "}
              <Text fontSize={"xl"} fontWeight="semibold">
                {groupChatDetails.groupAdmin.firstName}{" "}
                {groupChatDetails.groupAdmin.lastName}{" "}
                {groupChatDetails.groupAdmin.psychologist && <>, Psy.D</>}
              </Text>
              {groupChatDetails.groupAdmin.psychologist && (
                <Text textColor={"maroon"} fontWeight="bold">
                  Psychometrician
                </Text>
              )}
              <Text>Members:</Text>
              <Box
                display="flex"
                flexDir="column"
                w="100%"
                px={3}
                gap={1}
                h="155px"
                overflowY="auto"
              >
                {members.map((user) => (
                  <Box display="flex" alignItems="center" w="100%">
                    <Avatar
                      mr={2}
                      src={user.pic}
                      name={
                        JSON.stringify(
                          groupChatDetails.groupAdmin.firstName
                        ).replace(/['"]+/g, "") +
                        " " +
                        JSON.stringify(
                          groupChatDetails.groupAdmin.lastName
                        ).replace(/['"]+/g, "")
                      }
                    />
                    <Text textColor={user.psychologist ? "maroon" : "black"}>
                      {user.firstName} {user.lastName}{" "}
                      {user.psychologist && <>, Psy.D</>}
                    </Text>
                  </Box>
                ))}
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GroupChatDetailsModal;
