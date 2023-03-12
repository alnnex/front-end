import { Avatar, Box, Button, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
  timeOffset,
} from "../Config/ChatLogic";
import { ChatState } from "../Context/ChatProvider";
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
            key={m._id}
          >
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Box>
                <Tooltip
                  label={
                    JSON.stringify(m.sender.firstName).replace(/['"]+/g, "") +
                    " " +
                    JSON.stringify(m.sender.lastName).replace(/['"]+/g, "")
                  }
                  hasArrow
                  placement="bottom"
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    name={
                      JSON.stringify(m.sender.firstName).replace(/['"]+/g, "") +
                      " " +
                      JSON.stringify(m.sender.lastName).replace(/['"]+/g, "")
                    }
                    src={m.sender.pic}
                  />
                </Tooltip>
              </Box>
            )}
            <Tooltip label="alnex">
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 6,
                }}
              >
                {m.content}
                {(isSameSender(messages, m, i, user._id) ||
                  isLastMessage(messages, i, user._id)) && (
                  <Text fontSize="xs" fontWeight="semibold">
                    {timeOffset(m.createdAt) + " " + m.createdAt.split("T")[0]}
                  </Text>
                )}
              </span>
            </Tooltip>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
