import React from "react";
import MainNavbar from "../navbars/MainNavbar";
import SearchBar from "components/homepage/SearchBar";
import { Button, Flex, Text, Box, Image } from "@chakra-ui/react";
import TopAuctionCard from "components/homepage/TopAuctionCard";
import TopAunction from "components/homepage/TopAunction";

const AunctionBids = () => {
  return (
    <>
      <MainNavbar />
      <SearchBar />
      <Box marginX="9rem">
        <Text marginY="2" fontSize="2xl" color="red" fontWeight="bold">
          Live Auction
        </Text>
        <Flex justifyContent="center" gap={20}>
          <Box justifyContent="space-around">
            <a href="./nft-auction-page">
              <Image
                boxSize="100%"
                src="/images/svg/NFT1.svg"
                alt=""
                rounded="xl"
              />
            </a>
          </Box>
          <Flex
            direction="column"
            border="1px"
            borderColor="#94a3b8"
            w="50%"
            rounded="xl"
            padding="8"
            gap={5}
          >
            <Box>
              <Text fontSize="2xl" fontWeight="bold">
                The Rain Forest
              </Text>
              <Text fontSize="xl"> Created by @Mankiniboss</Text>
            </Box>

            <Flex justifyContent="space-between">
              <Box>
                <Text fontSize="md"> Starting Price</Text>
                <Text fontSize="xl" fontWeight="bold">
                  0.45 ETH
                </Text>
              </Box>
              <Box>
                <Text fontSize="md"> Auction Ends In</Text>
                <Text fontSize="xl" fontWeight="bold">
                  {" "}
                  12.07.56
                </Text>
              </Box>
            </Flex>
            <Box>
              <Text fontSize="2xl" fontWeight="bold">
                {" "}
                Description
              </Text>
              <Text fontSize="md">
                Description The philosopher Seneca said “loneliness is not being
                alone, but being empty” and that’s something I realized very
                young. Contrary to what most of us are taught, I believe being
                alone can be a good thing, and this notion is the basis for
                Solitude, which aims to explore feelings of lonesomeness in
                tandem with spiritual connections within the natural world.
              </Text>
            </Box>
            <Flex justifyContent="center">
              <Button
                colorScheme="black"
                size="xlg"
                paddingY={5}
                color="white"
                variant="outline"
                border="2px"
                borderColor="white"
                bgColor="black"
                width="50%"
              >
                Place Bid
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          justifyContent="space-between"
          marginY="20"
          border="1px"
          borderColor="#94a3b8"
          rounded="xl"
          padding="8"
        >
          <Flex direction="column" gap={3}>
            <Text fontSize="2xl" fontWeight="bold">
              History
            </Text>
            <Flex>
              <a href="./nft-auction-page">
                <Image boxSize="100%" src="/images/svg/profile.svg" alt="" />
              </a>
              <Box marginLeft={5}>
                <Text marginBottom={2} fontSize="md">
                  @TheManKinniboss
                </Text>
                <Text fontSize="xs"> Created on 23-12-2023</Text>
              </Box>
            </Flex>
            <Text>1st Bid - 22:00</Text>
            <Text>2nd Bid - 22:08</Text>
            <Text>3rd Bid - 22:15</Text>
            <Text>4th Bid - 22:27</Text>
          </Flex>
          <Box width="48%">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              align="start"
              marginBottom="5"
            >
              Information
            </Text>
            <Flex direction="column" gap={7}>
              <Flex>
                <Text> Artist - Markinbox </Text>
                <Text> Collection - Road to victory </Text>
              </Flex>
              <Flex>
                <Text> FileSize - 23mb </Text>
                <Text> Liscense - Markinbox 100% </Text>
              </Flex>

              <Text> Medium - Non-Fungible-Token </Text>
              <Text> Year - 2023  </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <TopAunction />
    </>
  );
};

export default AunctionBids;
