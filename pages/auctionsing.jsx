import React from "react";
import MainNavbar from "../components/navbars/MainNavbar";
import SearchBar from "../components/homepage/SearchBar";
import Auctions from "../components/homepage/Auctions";
import TopAunction from "../components/homepage/TopAunction";
import { Box } from "@chakra-ui/react";

const autions = () => {
  return (
    <Box height="100vh">
      {/* <MainNavbar /> */}
      <SearchBar />
      <Auctions />
      <TopAunction />
    </Box>
  );
};

export default autions;
