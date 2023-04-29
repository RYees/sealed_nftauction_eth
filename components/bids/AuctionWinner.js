import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useStateContext } from '../../context';

const AuctionWinner= ({id}) => {
  const { completeAuction, connect, getNFTData, getMyNfts, winnerAddress, highestVal, setidParams, idParams } = useStateContext();

  setidParams(1);
  const winner = () => {
    completeAuction(id)
  }

  return (
    <>
    <Flex marginX="20" justifyContent={"space-evenly"}>
      <Text fontSize={24} marginTop={10} fontFamily={"fantasy"}><small>Winner</small>{winnerAddress}</Text>
      <Text fontSize={24} marginTop={10} fontFamily={"fantasy"}><small>Highest value</small>{highestVal}</Text>
    </Flex>

    <Flex marginX="20">
      <Text fontSize={24} marginTop={10} fontFamily={"fantasy"}>Congradulations, you won the auction!!!</Text>
    </Flex>
    <Flex justifyContent="center" paddingTop={10} gap={10}>
        <Button
              colorScheme="black"
              bgColor="red"
              size="md"
              paddingX={10}
              paddingY={10}
              color="white"
              variant="outline"
              border="2px"
              borderColor="white"
              fontSize={25}
              onClick={winner}
        >
              Claim Nft
        </Button>
    </Flex>
    </>
  );
};

export default AuctionWinner;
