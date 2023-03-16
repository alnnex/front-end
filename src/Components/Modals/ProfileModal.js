import React from "react";
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
  Avatar,
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";

const ProfileModal = ({ children, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {" "}
      {children ? <span onClick={onOpen}>{children}</span> : ""}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" justifyContent="center">Profile Viewer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Avatar
                w="40"
                h="40"
                src={user.pic}
                name={
                  JSON.stringify(user.firstName)?.replace(/['"]+/g, "") +
                  " " +
                  JSON.stringify(user.lastName)?.replace(/['"]+/g, "")
                }
              />
              <Text fontSize="3xl">
                {user.firstName} {user.lastName} {user.psychologist && ", Psy.D"}
              </Text>
              {user.psychologist && (
                <Text fontSize="xl" textColor="maroon">
                  Psychometrician
                </Text>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
