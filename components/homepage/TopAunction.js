import React, {useEffect} from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import TopAuctionCard from "./TopAuctionCard";
import { useStateContext } from '../../context';

const TopAunction = () => {
  const {allNfts, getAllNFTs} = useStateContext();
  return (
    <Box bgColor="#0C0217" paddingX="20" paddingY="10" h="100vh">
      <Text color=" white" fontSize="4xl">
        Top Auction
      </Text>
      <Flex marginX="20" marginTop={10}>
        {allNfts.map((value, index) => {
            return <TopAuctionCard  data={value} key={index}></TopAuctionCard >;
        })}
      </Flex>
      {/* <TopAuctionCard /> */}
    </Box>
  );
};

export default TopAunction
