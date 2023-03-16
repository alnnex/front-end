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
            {message.sender?.firstName} {message.sender?.lastName}:{" "}
            {message.content}
          </Text>
        </Box>
      )}
    </>
  );
};
export const getSender = (loggedUser, users) => {
  //   const combinedName =
  //     JSON.stringify(user.firstName)?.replace(/['"]+/g, "") +
  //     " " +
  //     JSON.stringify(user.lastName)?.replace(/['"]+/g, "");

  return users[0]?._id === loggedUser?._id ? (
    <Box display={"flex"} alignItems={"center"}>
      <Avatar
        mr={2}
        size={"sm"}
        src={users[1]?.pic}
        borderColor="maroon"
        name={
          JSON.stringify(users[1]?.firstName)?.replace(/['"]+/g, "") +
          " " +
          JSON.stringify(users[1]?.lastName)?.replace(/['"]+/g, "")
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
          JSON.stringify(users[0]?.firstName)?.replace(/['"]+/g, "") +
          " " +
          JSON.stringify(users[0]?.lastName)?.replace(/['"]+/g, "")
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
    (messages[i + 1]?.sender?._id !== m?.sender?._id ||
      messages[i + 1]?.sender?._id === undefined) &&
    messages[i]?.sender?._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1]?.sender?._id !== userId &&
    messages[messages.length - 1]?.sender?._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1]?.sender?._id === m.sender?._id &&
    messages[i].sender?._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1]?.sender?._id !== m.sender?._id &&
      messages[i].sender?._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender?._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1]?.sender?.id === m.sender?._id;
};

export const timeOffset = (time) => {
  var converted = Number(time.split("T")[1].split(":")[0]);
  var half;
  if (converted === 1) {
    toString((converted = 10));
    half = "am";
  } else if (converted === 2) {
    toString((converted = 11));
    half = "am";
  } else if (converted === 3) {
    toString((converted = 12));
    half = "am";
  } else if (converted === 4) {
    toString((converted = 1));
    half = "pm";
  } else if (converted === 5) {
    toString((converted = 2));
    half = "pm";
  } else if (converted === 6) {
    toString((converted = 3));
    half = "pm";
  } else if (converted === 7) {
    toString((converted = 4));
    half = "pm";
  } else if (converted === 8) {
    toString((converted = 5));
    half = "pm";
  } else if (converted === 9) {
    toString((converted = 6));
    half = "pm";
  } else if (converted === 10) {
    toString((converted = 7));
    half = "pm";
  } else if (converted === 11) {
    toString((converted = 8));
    half = "pm";
  } else if (converted === 12) {
    toString((converted = 9));
    half = "pm";
  } else if (converted === 13) {
    toString((converted = 10));
    half = "pm";
  } else if (converted === 14) {
    toString((converted = 11));
    half = "pm";
  } else if (converted === 15) {
    toString((converted = 12));
    half = "pm";
  } else if (converted === 16) {
    toString((converted = 1));
    half = "am";
  } else if (converted === 17) {
    toString((converted = 2));
    half = "am";
  } else if (converted === 18) {
    toString((converted = 3));
    half = "am";
  } else if (converted === 19) {
    toString((converted = 4));
    half = "am";
  } else if (converted === 20) {
    toString((converted = 5));
    half = "am";
  } else if (converted === 21) {
    toString((converted = 6));
    half = "am";
  } else if (converted === 22) {
    toString((converted = 7));
    half = "am";
  } else if (converted === 23) {
    toString((converted = 8));
    half = "am";
  } else {
    converted = 9;
    half = "am";
  }

  return (
    converted + ":" + time.split("T")[1].split(":")[1] + `${half.toUpperCase()}`
  );
};
