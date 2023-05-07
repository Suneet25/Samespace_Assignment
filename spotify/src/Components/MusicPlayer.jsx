import {
  Box,
  Heading,
  Image,
  Text,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  Button,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { SlOptions } from "react-icons/sl";

const MusicPlayer = ({ playlist, data, index, onChange }) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMute, setIsMute] = useState(false);

  useEffect(() => {
    data.forEach((el, i) => {
      if (el._id === playlist._id) {
        setCurrentSong(i);
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

  useEffect(() => {
    audioRef.current.currentTime = currentTime;
  }, [currentTime]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTime(0);
    setCurrentSong((currentSong + 1) % data.length);
    setIsPlaying(true);
    console.log(currentSong, "currentsong");
    onChange((currentSong + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentTime(0);
    setCurrentSong(currentSong === 0 ? data.length - 1 : currentSong - 1);
    onChange(currentSong === 0 ? data.length - 1 : currentSong - 1);
    setIsPlaying(true);
  };
  const handleMute = () => {
    setIsMute(!isMute);
  };
  console.log(isMute);
  //console.log(data[currentSong].url,currentSong,"current")

  //forSwitchingtabs

  // function handleVolumeChange(event) {
  //   const newVolume = parseFloat(event.target.value);
  //   audioRef.current.volume = newVolume;
  // }

  // useEffect(() => {
  //   // Add event listener for visibility change
  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   // Remove event listener on unmount
  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, []);

  // function handleVisibilityChange() {
  //   // Pause or resume audio playback when visibility changes
  //   if (document.hidden) {
  //     audioRef.current.pause();
  //   } else {
  //     if (isPlaying) audioRef.current.play().catch((err) => console.error(err));
  //   }
  // }

  return (
    <Box width={"100%"}>
      <Box
        width={"500px"}
        h={"750px"}
        pos={"fixed"}
        top={"30px"}
        right={"20px"}
        gap={"32px"}
      >
        <Box h={"68px"} gap={"8px"}>
          <Text
            fontWeight={700}
            fontSize={"32px"}
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
        <Box width={"450px"} h={"450"} mt={4}>
          <Image
            src={data[currentSong].photo}
            w={"100%"}
            h={"100%"}
            borderRadius={"10px"}
          />
        </Box>

        <Box>
          <Slider
            aria-label="slider-ex-1"
            max={duration}
            value={currentTime}
            w="90%"
            mt="4"
            mr={10}
            onChange={(value) => setCurrentTime(value)}
          >
            <SliderTrack bg="white">
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Flex justifyContent={"space-between"} mr={12} mt={5}>
            <Box>
              <IconButton
                size="lg"
                icon={<SlOptions />}
                bg={"transparent"}
                backgroundColor="rgba(255, 255, 255, 0.08)"
                _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                borderRadius={"50%"}
              />
            </Box>
            <Box>
              <IconButton
                onClick={handlePrev}
                aria-label="previous"
                bg={"transparent"}
                _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                icon={<FaBackward />}
                size="lg"
                mr="4"
              />
              <IconButton
                onClick={handlePlayPause}
                aria-label={isPlaying ? "pause" : "play"}
                bg={"transparent"}
                _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                icon={isPlaying ? <FaPause /> : <FaPlay />}
                size="lg"
                mr="4"
              />
              <IconButton
                onClick={handleNext}
                aria-label="next"
                bg={"transparent"}
                _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                icon={<FaForward />}
                size="lg"
              />
            </Box>
            <Box>
              <IconButton
                onClick={handleMute}
                size="lg"
                icon={isMute ? <HiVolumeOff /> : <HiVolumeUp />}
                bg={"transparent"}
                backgroundColor="rgba(255, 255, 255, 0.08)"
                _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                borderRadius={"50%"}
              />
            </Box>
          </Flex>

          <audio
            autoPlay
            ref={audioRef}
            onLoadedMetadata={() => setDuration(audioRef.current.duration)}
            onEnded={handleNext}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MusicPlayer;
