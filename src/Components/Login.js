import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";

const Login = () => {
  const { setSelectedChat, ENDPOINT } = ChatState();
  const [show, setShow] = useState([
    {
      password: false,
    },
  ]);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function handleSignin(e) {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast({
        title: "Please Fill ll the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          // "Access-Control-Allow-Origin": "*",
        },
      };
      const { data } = await axios.post(
        `${ENDPOINT}/api/user/login`,
        {
          email: email,
          password: password,
        },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setSelectedChat();
      setLoading(false);
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
    }
  }

  return (
    <form onSubmit={handleSignin}>
      <VStack p={{ base: "5px 0px", md: "5px 15px" }} spacing={2}>
        <FormControl id="login-email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="login-password" isRequired>
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
        <Button colorScheme={"blue"} w={{ base: "100%" }} type="submit">
          Login
        </Button>
      </VStack>
    </form>
  );
};

export default Login;
