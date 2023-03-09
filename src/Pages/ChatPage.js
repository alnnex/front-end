import { Box, Container } from "@chakra-ui/react";
import React from "react";
import ChatBox from "../Components/ChatBox";
import MyChats from "../Components/MyChats";
import SideDrawer from "../Components/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <Container maxWidth={"8xl"} px={{ base: "0px", md: 4 }}>
      <div style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <Box display="flex" w="100%" gap={3}>
          {user && <MyChats />}
          {user && <ChatBox />}
        </Box>
      </div>
    </Container>
  );
};

export default ChatPage;
