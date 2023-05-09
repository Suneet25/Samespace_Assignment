import {
  Box,
  Image,
  Text,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { SlOptions } from "react-icons/sl";

const AudioPlayer = ({ playlist, data, index, onChange }) => {
  const audioRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    data.forEach((el, i) => {
      if (el._id === playlist._id) {
        setCurrentSong(i);

        setIsPlaying(true);
      }
    });
  }, [playlist]);

  useEffect(() => {
    audioRef.current.src = data[currentSong].url;
    audioRef.current.load();
  }, [currentSong, data]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isMute) {
      audioRef.current.muted = true;
    } else {
      audioRef.current.muted = false;
    }
  }, [isMute]);

  const onPause = () => {
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    setIsPlaying(false);
  }, []);
  const onNext = () => {
    setCurrentTime(0);
    setCurrentSong((currentSong + 1) % data.length); //This is to ensure that after the last song the first song will be the next song
    setIsPlaying(true);
    console.log(currentSong, "currentsong");
    onChange((currentSong + 1) % data.length);
  };

  const onPrev = () => {
    setCurrentTime(0);
    setCurrentSong(currentSong === 0 ? data.length - 1 : currentSong - 1);
    onChange(currentSong === 0 ? data.length - 1 : currentSong - 1);
    setIsPlaying(true);
  };
  const onMute = () => {
    setIsMute(!isMute);
  };

  const onSliderChange = (value) => {
    setCurrentTime(value);
    audioRef.current.currentTime = value;
  };

  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  console.log(isPlaying);
  return (
    <Box width={"100%"}>
      <Box
        width={{ base: "100%", sm: "100%", md: "100%", lg: "500px" }}
        h="auto"
        pos={{ lg: "fixed", base: "relative" }}
        top={"30px"}
        right={"20px"}
        gap={"32px"}
      >
        <Box h={"68px"} gap={"8px"}>
          <Text
            fontWeight={700}
            fontSize={{ lg: "32px", base: "18px" }}
            lineHeight={"36px"}
            fontStyle={"normal"}
            textAlign={"left"}
          >
            {data[currentSong].title}
          </Text>
          <Text
            fontWeight={400}
            fontSize={"16px"}
            lineHeight={"24px"}
            fontStyle={"normal"}
            opacity={0.6}
            textAlign={"left"}
            mt={2}
          >
            {data[currentSong].artist}
          </Text>
        </Box>
        <Box
          width={{ lg: "450px", md: "450px", base: "210px", sm: "100px" }}
          height={{ lg: "400", md: "500px", base: "210px", sm: "100px" }}
          mt={4}
        >
          <Image
            src={data[currentSong].photo}
            w={"100%"}
            h={"100%"}
            borderRadius={"10px"}
          />
        </Box>

        <Box width={{ lg: "450px", base: "210px", md: "450px", sm: "100px" }}>
          <Slider
            aria-label="slider-ex-1"
            colorScheme="green"
            max={duration}
            value={currentTime}
            w={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
            mt="4"
            onChange={onSliderChange}
          >
            <SliderTrack bg="white">
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Flex
            justifyContent={"space-between"}
            // mr={{ lg: 0, base: "250px", sm: "250px" }}
            mt={5}
          >
            <Box
              width={{ lg: "100%", base: "210px", md: "450px", sm: "100px" }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box>
                <IconButton
                  size={{ lg: "lg", base: "sm", sm: "sm" }}
                  icon={<SlOptions />}
                  bg={"transparent"}
                  backgroundColor="rgba(255, 255, 255, 0.08)"
                  _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                  borderRadius={"50%"}
                />
              </Box>
              <Box display={"flex"}>
                <IconButton
                  onClick={onPrev}
                  aria-label="previous"
                  bg={"transparent"}
                  _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                  icon={<FaBackward />}
                  size={{ lg: "lg", base: "sm", sm: "sm" }}
                  mr="4"
                />
                <IconButton
                  onClick={onPause}
                  aria-label={isPlaying ? "pause" : "play"}
                  bg={"transparent"}
                  _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                  icon={isPlaying ? <FaPause /> : <FaPlay />}
                  size={{ lg: "lg", base: "sm", sm: "sm" }}
                  mr="4"
                />
                <IconButton
                  onClick={onNext}
                  aria-label="next"
                  bg={"transparent"}
                  _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                  icon={<FaForward />}
                  size={{ lg: "lg", base: "sm", sm: "sm" }}
                />
              </Box>
              <Box>
                <IconButton
                  onClick={onMute}
                  size={{ lg: "lg", base: "sm", sm: "sm" }}
                  icon={isMute ? <HiVolumeOff /> : <HiVolumeUp />}
                  bg={"transparent"}
                  backgroundColor="rgba(255, 255, 255, 0.08)"
                  _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                  borderRadius={"50%"}
                />
              </Box>
            </Box>
          </Flex>

          <audio
            onTimeUpdate={onTimeUpdate}
            autoPlay
            ref={audioRef}
            onLoadedMetadata={() => setDuration(audioRef.current.duration)}
            onEnded={onNext}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AudioPlayer;
