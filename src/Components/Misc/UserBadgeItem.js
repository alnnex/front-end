import { Box, Text } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ key, user, handleFunction }) => {
  return (
    <Box
      key={key}
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
      bgColor="purple.400"
      w={"fit-content"}
      alignItems="center"
      display={"flex"}
      textColor="white"
    >
      <Text mr={1}>
        {user.firstName} {user.lastName}
      </Text>
      <i className="fa-sharp fa-solid fa-xmark"></i>
    </Box>
  );
};

export default UserBadgeItem;
