import React, {useEffect} from 'react'
import { Flex, Text } from "@chakra-ui/react";
import MynftCard from "./MynftCard";
import { useStateContext } from '../../context';

const StartAuction = () => {
  const {connect, address, mynft, getNFTData, getMyNfts, nfttoken, tokens } = useStateContext();
  useEffect(() => {
   // nfttoken();
    // getMyNfts();
  });
  //console.log("flavor", mynft);
  return (
    <>
      <Flex justifyContent="space-between" marginX={20} marginTop={8}>
        <Text fontSize="2xl" color="black">
          My Nft
        </Text>
        <Text fontSize="md"> See All</Text>
      </Flex>

      <Flex marginX="20" marginTop={10}>
        {mynft.map((value, index) => {
            return <MynftCard data={value} key={index}></MynftCard>;
        })}
      </Flex>
    
    </>
  )
}

export default StartAuction