import React from "react";
import { Flex, Text, Box, Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useStateContext } from '../../context';

const liveList = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=818&q=80",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1732&q=80",
  },
];

const MynftCard = () => {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text fontSize="2xl" color="red">
          My Nft
        </Text>
        <Text fontSize="md"> See All</Text>
      </Flex>
      <Flex gap={5} marginBottom="10">
      {/* <Image boxSize="xs" src={mynft.image} alt="" rounded="xl" /> */}
        {liveList.map((auction) => {
          return (
            <Box key={auction.id} color="black">
              <a href="./nft-auction-page">
                <Image boxSize="xs" src={auction.img} alt="" rounded="xl" />
              </a>

              <Box>
              <a
                href="./create-listing"
                className="block px-8 py-4 hover:border"
              >
                <Button 
                  position="absolute"
                  marginTop="-11rem"
                  marginX="5.5rem"
                  opacity= ""
                >
                  StartAuction
                </Button>
              </a>
              </Box>
            </Box>
          );
        })}
      </Flex>
     
    </Box>
  );
};

export default MynftCard;
