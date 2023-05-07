import { Box } from "@chakra-ui/react";
import React from "react";
import { Routes, Route } from "react-router-dom";

import TopTracks from "../Pages/TopTracks";
import RecentlyPlayed from "../Pages/RecentlyPlayed";
import Favorites from "../Pages/Favorites";
import Foryou from "../Pages/ForYou";
const AllRoutes = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Foryou />}></Route>
        <Route path="/top-tracks" element={<TopTracks />}></Route>
        <Route path="/recently-played" element={<RecentlyPlayed />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
      </Routes>
    </Box>
  );
};

export default AllRoutes;
