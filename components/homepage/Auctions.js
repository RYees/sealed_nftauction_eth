import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import AunctionCards from "./AuctionCard";
import { useStateContext } from '../../context';

const Auctions= () => {
  return (
    <Flex marginX="20">
      <AunctionCards />
    </Flex>
  );
};

export default Auctions;
