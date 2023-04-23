import React, {useState} from "react";
import MainNavbar from "../navbars/MainNavbar";
import SearchBar from "components/homepage/SearchBar";
import { Button, Flex, Text, Box, Image, Input, useClipboard, NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper, } from "@chakra-ui/react";
import TopAuctionCard from "components/homepage/TopAuctionCard";
import TopAunction from "components/homepage/TopAunction";
import { useStateContext } from '../../context';
import AuctionPlacebid from "./AuctionPlacebid";

const AuctionSealbid = () => {
  const { sealBid, connect, address, getNFTData, nfttoken, getMyNfts, sealedDetails, sealed, setsealParams, sealParams, byte } = useStateContext();
  const [value, setValue] = useState(address);
  const { onCopy, hasCopied } = useClipboard(value);
  const [show, setShow] = useState(false);
  const [reveal, showReveal] = useState(false);

  const formChange = (event) => {
    setsealParams((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }
  const handleFormFieldChange = (fieldName, e) => {
    setsealParams({ ...sealParams, [fieldName]: e.target.value })
  }
  //console.log("chu", sealParams);
  const seal = () => {
    //setShow(true);
    //getNFTData()
    //nfttoken()
    sealBid()
  }

  return (
    <>
      {/* <MainNavbar /> */}
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
              <Box>
                <Text fontSize="md"> Reveal time Ends In</Text>
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
            {!sealed ? 
            <Box>
                <Box mb={5}>
                  <Text mb="5px" fontWeight="bold">
                    Bid Value:
                  </Text>
                  <NumberInput defaultValue={0} step={0.1} name={'bidvalue'} value={sealParams.bidvalue} onChange={(value) => formChange({ target: { name: 'bidvalue', value }})}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>

                <Box mb={5}>
                    <Text marginRight="8px">
                     <Input type="password" placeholder="passcode" height="40px" width="101%"  onChange={(e) => handleFormFieldChange('passcode', e)}  value={sealParams.passcode}/>
                  </Text>
                </Box>

                <Flex justifyContent="center">          
                  <Button
                    colorScheme="black"
                    size="xlg"
                    paddingY={3}
                    color="white"
                    variant="outline"
                    border="2px"
                    borderColor="white"
                    bgColor="black"
                    width="20%"
                    onClick={sealedDetails}
                  >
                    Seal Bid
                  </Button>              
                </Flex>
            </Box>
         : <AuctionPlacebid bytehash={byte}/>}        
            
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

export default AuctionSealbid;
