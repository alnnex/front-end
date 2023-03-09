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
  Image,
  AspectRatio,
  Input,
  VStack,
  FormControl,
  FormLabel,
  useToast,
  Box,
  Avatar,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TriggerState } from "../../Context/TriggerProvider";
import { ChatState } from "../../Context/ChatProvider";

const EditProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ENDPOINT } = ChatState();
  const { trigger, setTrigger } = TriggerState();
  const toast = useToast();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const [imagePreview, setImagePreview] = useState(user.pic);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  function validateImg(e) {
    const file = e.target.files[0];
    // if (file.size >= 1048576) {
    //   return alert("Max file size is 1mb!");
    // } else {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "jmk6eni3");
    try {
      setLoading(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/alnnex/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await res.json();
      setLoading(false);
      return urlData.url;
    } catch (error) {
      setLoading(false);
    }
  }

  async function updateProfile(e) {
    e.preventDefault();
    let url = "";
    if (!firstName || !lastName) {
      toast({
        title: "First Name and Last Name Cannot be Empty",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    if (image) {
      url = await uploadImage(image);
    } else {
      url = user.pic;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${ENDPOINT}/api/user`,
        {
          firstName: firstName,
          lastName: lastName,
          pic: url,
        },
        config
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          _id: user._id,
          firstName,
          lastName,
          email: user.email,
          pic: url,
          psychologist: user.psychologist,
          token: user.token,
        })
      );

      setTrigger(!trigger);

      setLoading(false);
      toast({
        title: "Profile Updated Successfuly",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      navigate("/chats");
      onClose();
    } catch (error) {
      toast({
        title: "Invalid Field Inputs",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
    }
  }

  return (
    <div>
      {children ? <span onClick={onOpen}>{children}</span> : ""}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={updateProfile}>
          <ModalContent>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={2}>
                {" "}
                <FormControl>
                  <FormLabel w="120px" mx="auto" position="relative">
                    <AspectRatio ratio={1}>
                      <Avatar
                        src={imagePreview || user.pic}
                        name={
                          JSON.stringify(user.firstName).replace(/['"]+/g, "") +
                          " " +
                          JSON.stringify(user.lastName).replace(/['"]+/g, "")
                        }
                      />
                    </AspectRatio>
                    <Box position="absolute" right={1} bottom={1}>
                      <i
                        style={{ color: "green" }}
                        className="fa-solid fa-circle-plus"
                      ></i>
                    </Box>
                  </FormLabel>
                  <Input
                    hidden
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={validateImg}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    id="editFirstName"
                    placeholder="Edit First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    isRequired
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    id="editLastName"
                    placeholder="Edit last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    isRequired
                  />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default EditProfileModal;
