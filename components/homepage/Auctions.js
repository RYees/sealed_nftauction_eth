import React, {useEffect} from "react";
import { Flex, Text } from "@chakra-ui/react";
import AuctionCards from "./AuctionCard";
import { useStateContext } from '../../context';

const Auctions= () => {
  const {allNfts, getAllNFTs} = useStateContext();
  useEffect(()=>{
    getAllNFTs();
  });
  return (
    // <Flex marginX="20">
    //   <AuctionCards />
    // </Flex>
    <Flex marginX="20" marginTop={10}>
      {allNfts.map((value, index) => {
          return <AuctionCards data={value} key={index}></AuctionCards>;
      })}
    </Flex>
  );
};

export default Auctions;
