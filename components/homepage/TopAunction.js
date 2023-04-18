import React from "react";
import { Box, Text } from "@chakra-ui/react";
import TopAuctionCard from "./TopAuctionCard";

const TopAunction = () => {
  return (
    <Box bgColor="#0C0217" paddingX="20" paddingY="10" h="100vh">
      <Text color=" white" fontSize="4xl">
        Top Auction
      </Text>
      <TopAuctionCard />
    </Box>
  );
};

export default TopAunction
