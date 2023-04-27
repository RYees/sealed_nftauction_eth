import React, {useEffect} from 'react'
import { Flex } from "@chakra-ui/react";
import MynftCard from "./MynftCard";
import { useStateContext } from '../../context';

const StartAuction = () => {
  const {connect, address, mynft, getNFTData, getMyNfts, nfttoken, tokens } = useStateContext();
  useEffect(() => {
   // nfttoken();
    // getMyNfts();
  });
  console.log("flavor", mynft);
  return (
    <Flex marginX="20">
      {mynft.map((value, index) => {
          return <MynftCard data={value} key={index}></MynftCard>;
      })}
    </Flex>
  )
}

export default StartAuction