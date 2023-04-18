import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import SearchBar from "./SearchBar";

export default function LandingPage() {
  const basicBoxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100vw",
    height: "90vh",
    color: "white",
    textShadow: "0 0 20px black",

    background: "url('/images/svg/plain_bg.svg') center/cover no-repeat",
  };

  return (
    <Box sx={basicBoxStyles}>
      <SearchBar />
      <Box height="85%" width="80%">
        <Flex justifyContent="space-between" width="100%" marginTop="2">
          <Text fontSize="2xl">Live Auction</Text>
          <Text fontSize="lg"> See All</Text>
        </Flex>
        <Flex
          height="85%"
          variant="outline"
          border="2px"
          borderColor="white"
          bg="black"
        >
          <Flex
            gap={3}
            flexDirection="Column"
            width="55%"
            justifyContent="start"
            alignItems="start"
            padding={10}
          >
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
            <Text fontSize="md">Starting Price</Text>
            <Text fontSize="3xl">0.45 Eth</Text>
            <Flex gap={10}>
              <Text fontSize="sm">Auction Date</Text>
              <Text fontSize="sm">Time</Text>
            </Flex>
            <Flex gap={5}>
              <Text fontSize="lg">21-12-2022</Text>
              <Text fontSize="lg">12:00 GMT</Text>
              <Text fontSize="sm">Auction runs for 24Hrs</Text>
            </Flex>
            <Text fontSize="lg">CountDown</Text>
            <Text fontSize="3xl">22:43:00</Text>
            <Button
              colorScheme="black"
              size="xlg"
              paddingX={20}
              paddingY={5}
              color="white"
              variant="outline"
              border="2px"
              borderColor="white"
              marginLeft="200px"
            >
              Enter Auction
            </Button>
          </Flex>

          <Box>
            <a href="./nft-auction-page">
              <Image boxSize="100%" src="/images/svg/NFT1.svg" alt="" />
            </a>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
