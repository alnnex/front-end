import { Avatar, Button, Tooltip } from "@chakra-ui/react";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../Config/ChatLogic";
import { ChatState } from "../Context/ChatProvider";
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex", alignItems: "center" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <>
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
              </>
            )}
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
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
