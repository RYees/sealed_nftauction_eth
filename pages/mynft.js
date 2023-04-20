import React from 'react'
import Mint from "../components/homepage/Mint";
import StartAuction from "../components/homepage/StartAuction";
import { Box } from "@chakra-ui/react";

const mynft = () => {
  return (
    <Box height="100vh">
    <Mint />
    <StartAuction />
    </Box>
  )
}

export default mynft