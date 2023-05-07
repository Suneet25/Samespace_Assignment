import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Icon,
  Button,
  InputRightElement,
  Input,
  InputGroup,
} from "@chakra-ui/react";

import { useQuery } from "@apollo/client";
import { GET_ALL_SONGS } from "../Components/APIs_Functions/getSongs";
import Sidebar from "../Components/Sidebar";
import Loader from "../Components/Loader";
import { FiSearch } from "react-icons/fi";

const TopTracks = ({ artistId }) => {
  const [singleSongs, setsingleSongs] = useState({
    _id: "61b6f14dc2f7cafd968c31f2",
    artist: "Coldplay",
    duration: 645,
    photo:
      "https://i.pinimg.com/originals/1d/a7/9a/1da79a9ed751285378a05535ddb71ec8.png",
    title: "A Head Full Of Dreams",
    url: "https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3",
    __typename: "Song",
  });
  const { loading, error, data } = useQuery(GET_ALL_SONGS, {
    variables: { playlistId: 2 },
  });

  console.log("data:", data);
  // console.log("getAllSongs:", data.getAllSongs);

  // useEffect(() => {
  //   setgetAllSongs(data.getSongs);
  // }, []);

  const handlClick = (Singlesong) => {
    setsingleSongs(Singlesong);
  };

  console.log(singleSongs, "singleSongs");

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  return (
    <Box
      color={"white"}
      background="linear-gradient(to bottom, rgb(27,19,5), rgb(20,14,4))"
    >
      <Flex display={{ lg: "flex", sm: "block", md: "block" }}>
        <Sidebar />
        <Flex w={"75%"} px="1rem" justifyContent={"space-between"}>
          <Box border="1px solid black" w="40%" mt={8}>
            <Heading mb={"1rem"} textAlign={"left"}>
              Top Tracks
            </Heading>
            <Box mt={8}>
              <InputGroup>
                <Input
                  type="search"
                  placeholder="Search Song, Artist"
                  bgColor={"rgb(40,34,24)"}
                  _placeholder={{ color: "rgb(170,167,162)", fontSize: "18px" }}
                  border={"none"}
                  py={6}
                  // value={search}
                  // onChange={(e) => setSearch(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button variant={"link"} size="lg">
                    <Icon
                      as={FiSearch}
                      color="rgb(170,167,162)"
                      boxSize={6}
                      mt={2}
                    />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
            <Box mt={"40px"}>
              {data.getSongs?.map((songs) => (
                <Flex
                  cursor={"pointer"}
                  mb={"1rem"}
                  justifyContent={"space-between"}
                  key={songs._id}
                  onClick={() => handlClick(songs)}
                >
                  <Flex>
                    <Image
                      borderRadius={"full"}
                      boxSize={"40px"}
                      objectFit={"cover"}
                      src={songs.photo}
                    />
                    <Box ml="1rem">
                      <Text
                        fontSize={"1rem"}
                        fontWeight={"bold"}
                        textAlign={"left"}
                      >
                        {songs.title}
                      </Text>
                      <Text textAlign={"left"}>{songs.artist}</Text>
                    </Box>
                  </Flex>
                  <Text>{(songs.duration / 60).toFixed(2)}</Text>
                </Flex>
              ))}
            </Box>
          </Box>
          <Box px="1rem" w="50%" mt={12}>
            <Text
              fontSize={"2rem"}
              fontWeight={"bold"}
              fontStyle={"Gotham Circular"}
              textAlign={"left"}
            >
              {singleSongs.title}
            </Text>
            <Text fontWeight={"bold"} fontSize={"1.2rem"} textAlign={"left"}>
              {singleSongs.artist}
            </Text>
            <Flex direction={"column"} gap={10} alignItems={"center"}>
              <Image
                mt={"1rem"}
                borderRadius={"10px"}
                w="500px"
                h="500px"
                src={singleSongs.photo}
              />
              <audio controls>
                <source src={singleSongs.url} type="audio/ogg" />
                Your browser does not support the audio tag.
              </audio>
              {/* <AudioPlayer items={singleSongs.url} /> */}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TopTracks;
