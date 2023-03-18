import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserList = ({ user, handleFunction }) => {
  const combinedName =
    JSON.stringify(user.firstName).replace(/['"]+/g, "") +
    " " +
    JSON.stringify(user.lastName).replace(/['"]+/g, "");
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      w="100%"
      display="flex"
      alignItems="center"
      px={3}
      py={2}
      mb="1px"
      borderRadius="lg"
      border="1px"
      borderColor={"gray.100"}
      _hover={{ bgColor: "#FCB19A" }}
      bgColor={"#E8E8E8"}
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={combinedName}
        src={user.pic}
      />
      <Text
        textColor={user.psychologist ? "maroon" : "black"}
        // fontWeight={user.psychologist ? "semibold" : "normal"}
      >
        {user.firstName} {user.lastName} {user.psychologist && ", Psy.D"}
      </Text>
    </Box>
  );
};

export default UserList;
