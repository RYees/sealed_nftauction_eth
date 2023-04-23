import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import AuctionCards from "./AuctionCard";
import { useStateContext } from '../../context';

const Auctions= () => {
  return (
    <Flex marginX="20">
      <AuctionCards />
    </Flex>
  );
};

export default Auctions;
