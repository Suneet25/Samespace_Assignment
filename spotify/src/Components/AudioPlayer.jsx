import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";

import { FaBackward, FaForward } from "react-icons/fa";

import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";

import { AiTwotoneSound } from "react-icons/ai";

const AudioPlayer = () => {
  let [isPlaying, setIsPlaying] = useState(false);

  return (
    <Box>
      <audio src="https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3" />
      <Flex gap={10} justifyContent={"space-evenly"}>
        <HiOutlineDotsCircleHorizontal />
        <Flex gap={10}>
          <FaBackward />

          {isPlaying ? <BsPauseCircleFill /> : <BsFillPlayCircleFill />}
          <FaForward />
        </Flex>
        <AiTwotoneSound />
      </Flex>
    </Box>
  );
};

export default AudioPlayer;
