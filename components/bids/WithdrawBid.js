import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useStateContext } from '../../context';

const WithdrawBid= () => {
  const { withdrawBid, connect, getNFTData, getMyNfts, winnerAddress, highestVal, setidParams, idParams } = useStateContext();
  console.log("bidsdd", bidParams);

  setidParams(1);
  const withdraw = () => {
    withdrawBid()
  }

  return (
    <>
        <Flex marginX="20" justifyContent={"space-evenly"}>
          <Text fontSize={24} marginTop={10} fontFamily={"fantasy"}><small>Winner:</small>{winnerAddress}</Text>
          <Text fontSize={24} marginTop={10} fontFamily={"fantasy"}><small>Winning value:</small>{highestVal}</Text>
        </Flex>

        <Flex marginX="20">
          <Text fontSize={24} marginTop={10} fontFamily={"fantasy"}>
              Sorry bud, Not a winner these time!!! 
          </Text>
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
              onClick={withdraw}
        >
              Withdraw
          </Button>
      </Flex>
    </>
  );
};

export default WithdrawBid;
