import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Wrap,
  WrapItem,
  Avatar,
  Heading,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { useQuery } from "@apollo/client";
import Loader from "../Components/Loader";
import AudioPlayer from "../Components/AudioPlayer";
import { debounce } from "lodash";
import ColorThief from "colorthief";
import { GET_ALL_SONGS } from "../Components/APIs_Functions/getSongs";
import Error from "../Components/Error";
const TopTracks = ({ playlistId }) => {
  const [activeIndex, SetactiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [Index, setIndex] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [backgroundGradient, setBackgroundGradient] = useState(
    "linear-gradient(160deg, rgba(34,3,2,1) 8%, rgba(1,0,2,1) 90%)"
  );

  const [Player, setPlayer] = useState({
    artist: "Weeknd",
    duration: 320,
    photo:
      "https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg",
    title: "Starboy",
    url: "https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3",
    __typename: "Song",
    _id: "61b6f14dc2f7cafd968c31f0",
  });

  const { loading, error, data } = useQuery(GET_ALL_SONGS, {
    variables: { playlistId: 2, search: searchTerm },
  });

  useEffect(() => {
    let myfun = () => {
      try {
        const colorThief = new ColorThief();
        const img = new Image();
        img.src = data?.getSongs[currentSongIndex].photo;
        img.setAttribute("crossOrigin", "");
        img.addEventListener("load", () => {
          const color = colorThief.getColor(img);
          setBackgroundGradient(
            `linear-gradient(160deg , rgb(${color.join(
              ","
            )}) 8%, rgba(1,0,2,1) 90%)`
          );
        });
        if (loading) return <Loader />;
      } catch (error) {
        console.log(error);
        if (error) return <Error />;
      }
    };
    myfun();
  }, [currentSongIndex, data?.getSongs]);

  function handleClick(el, index) {
    SetactiveIndex(index);
    setPlayer(el);
    setIndex(index);
    setCurrentSongIndex(index);
  }

  let debounced = debounce((value) => {
    setSearchTerm(value);
  }, 1000);

  const handleSearch = (e) => {
    let value = e.target.value;
    debounced(value);
  };

  function handleCallback(i) {
    SetactiveIndex(i);
    setCurrentSongIndex(i);
  }

  if (loading) return <Loader />;
  if (error) return <Error />;
  return (
    <Box
      color={"white"}
      background={backgroundGradient}
      backgroundSize="cover"
      width={{ base: "100%", sm: "", md: "", lg: "" }}
    >
      <Flex>
        <Sidebar />
        <Flex
          mt={{ base: "10", sm: "", md: "", lg: "" }}
          w={"100%"}
          direction={{ base: "column-reverse", lg: "row" }}
          px={{ base: "0", sm: "", md: "", lg: "1rem" }}
          justifyContent={"space-between"}
        >
          <Box
            w={{ base: "85%", sm: "90%", md: "", lg: "45%" }}
            padding={{ base: "0px", sm: "", md: "", lg: "20px" }}
            mt={{ base: "50px", sm: "", md: "", lg: "" }}
          >
            <Box mb="30px">
              <Heading
                fontSize={{ lg: "32px", base: "18px" }}
                textAlign={{ base: "center", lg: "left" }}
              >
                Top Tracks
              </Heading>

              {/* Search Bar */}
              <InputGroup mt={{ base: 2, lg: 10 }}>
                <Input
                  border={"none"}
                  backgroundColor={"rgba(255, 255, 255, 0.08)"}
                  onChange={(e) => handleSearch(e)}
                  w={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
                  placeholder="Search Song, Artist"
                  py={3}
                  px={4}
                  borderRadius={"8px"}
                />
                <InputRightElement
                  display={{ lg: "block", base: "none" }}
                  top={0}
                  w={"4.5rem"}
                  children={
                    <SearchIcon boxSize={5} mt={2} opacity={"0.2"} mb={2} />
                  }
                />
              </InputGroup>
            </Box>

            {/* listing of the songs */}

            {data.getSongs?.map((el, i) => (
              <Box
                key={el._id}
                mt={8}
                mb={"1rem"}
                p={4}
                w={"100%"}
                borderRadius={"10px"}
                onClick={() => handleClick(el, i)}
                bg={i === activeIndex ? "rgba(255, 255, 255, 0.08)" : ""}
              >
                <Flex justifyContent={"space-between"}>
                  <Box>
                    <Flex justifyContent={"space-between"} gap={"20px"}>
                      <Box>
                        <Wrap>
                          <WrapItem>
                            <Avatar name={el.title} src={el.photo} />
                          </WrapItem>
                        </Wrap>
                      </Box>

                      <Box>
                        <Text
                          textAlign={"left"}
                          fontSize={{ lg: "18px", base: "sm", sm: "sm" }}
                        >
                          {el.title}
                        </Text>
                        <Text textAlign={"left"} opacity={0.4}>
                          {el.artist}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>

                  <Box mt="10px">
                    <Text>{(el.duration / 60).toFixed(2)}</Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Box>

          {/* music player */}
          <Box
            w={{ base: "90%", sm: "90%", md: "", lg: "45%" }}
            ml={{ lg: "", base: "4" }}
          >
            <AudioPlayer
              playlist={Player}
              data={data.getSongs}
              index={Index}
              onChange={handleCallback}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TopTracks;
