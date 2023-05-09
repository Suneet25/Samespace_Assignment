import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const Error = () => {
  return (
    <Box
      h={"100vh"}
      w={"100vw"}
      background="linear-gradient(to bottom, rgb(27,19,5), rgb(20,14,4))"
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={4}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"100vh"}
      >
        <Heading color={"white"}>Error ;) Please refresh the page</Heading>
      </Box>
    </Box>
  );
};

export default Error;
