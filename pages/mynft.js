import React, {useEffect} from 'react'
import Mint from "../components/homepage/Mint";
import StartAuction from "../components/homepage/StartAuction";
import { Box } from "@chakra-ui/react";
import { useStateContext } from '../context';

const mynft = () => {
  const {connect, address, getNFTData, getMyNfts, nfttoken, tokens } = useStateContext();
  useEffect(() => {
    nfttoken();
    getMyNfts();
   });
   
  return (
    <Box height="100vh">
    <Mint />
    <StartAuction />
    </Box>
  )
}

export default mynft