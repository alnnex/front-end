import { Avatar, Box, Text } from "@chakra-ui/react";

export const getSenderNameOnly = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? (
    <Box>
      <Text>
        {users[1]?.firstName} {users[1]?.lastName}{" "}
      </Text>
    </Box>
  ) : (
    <Box>
      {" "}
      <Text>
        {users[0]?.firstName} {users[0]?.lastName}{" "}
      </Text>
    </Box>
  );
};
export const getLatestMessage = (message) => {
  return (
    <>
      {message && (
        <Box fontSize="sm" pl={10} noOfLines={1}>
          <Text>
            {message.sender.firstName} {message.sender.lastName}:{" "}
            {message.content}
          </Text>
        </Box>
      )}
    </>
  );
};
export const getSender = (loggedUser, users) => {
  //   const combinedName =
  //     JSON.stringify(user.firstName).replace(/['"]+/g, "") +
  //     " " +
  //     JSON.stringify(user.lastName).replace(/['"]+/g, "");

  return users[0]?._id === loggedUser._id ? (
    <Box display={"flex"} alignItems={"center"}>
      <Avatar
        mr={2}
        size={"sm"}
        src={users[1]?.pic}
        borderColor="maroon"
        name={
          JSON.stringify(users[1]?.firstName).replace(/['"]+/g, "") +
          " " +
          JSON.stringify(users[1]?.lastName).replace(/['"]+/g, "")
        }
      />
      <Text
        textColor={users[1]?.psychologist ? "maroon" : "black"}
        fontWeight="semibold"
        noOfLines={1}
      >
        {users[1]?.firstName} {users[1]?.lastName}{" "}
        {users[1]?.psychologist && ", Psy.D"}
      </Text>
    </Box>
  ) : (
    <Box display={"flex"} alignItems={"center"}>
      <Avatar
        mr={2}
        size={"sm"}
        src={users[0]?.pic}
        name={
          JSON.stringify(users[0]?.firstName).replace(/['"]+/g, "") +
          " " +
          JSON.stringify(users[0]?.lastName).replace(/['"]+/g, "")
        }
      />
      <Text
        textColor={users[0]?.psychologist ? "maroon" : "black"}
        fontWeight="semibold"
        noOfLines={1}
      >
        {users[0]?.firstName} {users[0]?.lastName}
        {users[0]?.psychologist && ", Psy.D"}
      </Text>
    </Box>
  );
};

export const getSenderfull = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender.id === m.sender._id;
};
