import React from "react";
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
import MusicPlayer from "../Components/MusicPlayer";
import { debounce } from "lodash";
import ColorThief from "colorthief";
import { GET_ALL_SONGS } from "../Components/APIs_Functions/getSongs";
const ForYou = ({ playlistId }) => {
  const [activeIndex, SetactiveIndex] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [Index, setIndex] = React.useState(0);
  const [currentSongIndex, setCurrentSongIndex] = React.useState(0);
  const [backgroundGradient, setBackgroundGradient] = React.useState(
    "linear-gradient(160deg, rgba(34,3,2,1) 8%, rgba(1,0,2,1) 90%)"
  );

  const [Player, setPlayer] = React.useState({
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
    variables: { playlistId: 1, search: searchTerm },
  });

  React.useEffect(() => {
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
        if (error) return <p>Error: {error.message}</p>;
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
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Box color={"white"} background={backgroundGradient} backgroundSize="cover">
      <Flex>
        <Sidebar />
        <Flex w={"100%"} px={"1rem"} justifyContent={"space-between"}>
          <Box w={"45%"} padding={"20px"}>
            <Box mb="30px">
              <Heading fontSize={"30px"} textAlign={"left"}>
                For You
              </Heading>

              {/* Search Bar */}
              <InputGroup mt={10}>
                <Input
                  border={"none"}
                  backgroundColor={"rgba(255, 255, 255, 0.08)"}
                  onChange={(e) => handleSearch(e)}
                  w={"550px"}
                  placeholder="Search Song, Artist"
                  py={3}
                  px={4}
                  borderRadius={"8px"}
                />
                <InputRightElement
                  w={"4.5rem"}
                  children={
                    <SearchIcon boxSize={5} mt={2} opacity={"0.2"} mb={2} />
                  }
                />
              </InputGroup>
            </Box>

            {/* mapping of the songs */}

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
                      {/* Name and Playlist */}
                      <Box>
                        <Text textAlign={"left"} fontSize={"18px"}>
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
          {/* colortheif ka use krke index match karana hai , get the color and in callback send the color to parent */}
          {/* music player */}
          <Box width={"50%"}>
            <MusicPlayer
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

export default ForYou;
