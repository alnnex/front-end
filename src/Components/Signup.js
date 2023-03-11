import React, { useState } from "react";
import "../Css/Signup.css";
import axios from "axios";

import {
  AspectRatio,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
  color,
  Switch,
} from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

const Signup = () => {
  const { setSelectedChat, ENDPOINT } = ChatState();
  const toast = useToast();
  const navigate = useNavigate();

  const [show, setShow] = useState([
    {
      secret: false,
      password: false,
      confirmPassword: false,
      secretInputBox: false,
    },
  ]);

  const [secret, setSecret] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isPsychologist, setIsPsychologist] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
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

  async function handleSignup(e) {
    e.preventDefault();
    setSelectedChat();
    let url = "";
    if (password !== confirmPassword) {
      toast({
        title: "Password is not the same",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (image) {
      url = await uploadImage(image);
    } else {
      url = null;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      const { data } = await axios.post(
        `${ENDPOINT}/api/user`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          pic: url,
          psychologist: isPsychologist,
          psychSecret: secret,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      toast({
        title: "Registration Successfull",
        description: "You are now logged in",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Invalid Credentials",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
    }
  }

  function handleIfPsychologist() {
    setShow((prev) => ({
      ...prev,
      secretInputBox: !show.secretInputBox,
    }));
    setIsPsychologist(!isPsychologist);
  }
  return (
    <form onSubmit={handleSignup}>
      <VStack p={{ md: "0 5px 0  0" }} spacing="10px" m="10px 0">
        <FormControl display="flex" justifyContent="center">
          <FormLabel position={"relative"} w="120px">
            <AspectRatio ratio={1}>
              <Image
                p="3px"
                objectPosition="center"
                objectFit="cover"
                borderRadius="100%"
                border="1px"
                borderColor="gray.200"
                w="80px"
                h="80px"
                src={
                  imagePreview ||
                  "https://res.cloudinary.com/alnnex/image/upload/v1677902180/thesis/wp9566390_vfy2ai.png"
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
          {/* <FormControl>
            <Checkbox onChange={() => handleIfPsychologist()}>
              Are you a Psychometrician?
            </Checkbox>
          </FormControl> */}
          <FormControl display="flex" alignItems="center">
            <Switch
              id="if-psychologist"
              onChange={() => handleIfPsychologist()}
            />
            <FormLabel htmlFor="if-psychologist" mb="0">
              Are you a Psychometrician?
            </FormLabel>
          </FormControl>
          <Input
            hidden
            type="file"
            accept="image/png, image/jpeg"
            onChange={validateImg}
          />
        </FormControl>
        <FormControl>
          <AnimatePresence>
            {show.secretInputBox && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0 }}
              >
                <FormLabel id="secret">Enter Secret Key</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Enter Your Secret Key"
                    type={`${!show.secret ? "password" : "text"}`}
                    onChange={(e) => setSecret(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() =>
                        setShow((prev) => ({ ...prev, secret: !show.secret }))
                      }
                    >
                      {show.secret ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </motion.div>
            )}{" "}
          </AnimatePresence>
        </FormControl>
        <FormControl id="first-name" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="Enter Your First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl id="last-name" isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            placeholder="Enter Your First Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Enter Your Password"
              type={`${!show.password ? "password" : "text"}`}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() =>
                  setShow((prev) => ({ ...prev, password: !show.password }))
                }
              >
                {show.password ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Enter Your Password Again"
              type={`${!show.confirmPassword ? "password" : "text"}`}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() =>
                  setShow((prev) => ({
                    ...prev,
                    confirmPassword: !show.confirmPassword,
                  }))
                }
              >
                {show.confirmPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button colorScheme={"blue"} w={{ base: "100%" }} type="submit">
          Signup
        </Button>
        asd
      </VStack>
    </form>
  );
};

export default Signup;
