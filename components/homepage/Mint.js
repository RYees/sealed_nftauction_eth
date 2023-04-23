import React, {useState} from "react";
import { uploadFileToIPFS } from "../../pages/pianata";
import { useStateContext } from '../../context';
import { 
  Button,
  Input,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useDisclosure,
  Text,
  Textarea,
  Box
} from "@chakra-ui/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { useAddress, useMetamask } from '@thirdweb-dev/react';

const getfromContract = async() => {
  const sdk = new ThirdwebSDK(Sepolia);
  const contract = await sdk.getContract("0x1CF62190fcd41cfbe0637E358caF70f57AAf3100");
  return contract;
};

const SearchBar = () => {  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connect, address, getNFTData, getMyNfts } = useStateContext();
  const tabStyle = {
    marginRight: "10",
    width: "60rem",
    rounded: "lg",
  };
  
  const { transferFund, isAuctionOpen, mintNft, formParams, updateFormParams } = useStateContext();
  const [fileURL, setFileURL] = useState(null);
  async function OnChangeFile(e) {
    //setIsLoading(true)
    var file = e.target.files[0];
    try {
        const response = await uploadFileToIPFS(file);
        if(response.success === true) {
            console.log("Uploaded image to Pinata: ", response.pinataURL)
            setFileURL(response.pinataURL);
        }
      }
      catch(e) {
          console.log("Error during file upload", e);
      }
  }

  const handle = async (e) => {
    try {    
     e.preventDefault();
     isAuctionOpen(1);
    }
      catch(error) {
      //  console.log("failed", error);
      //  console.log("formdata", formParams);
      }
   
   // await mintNft(fileURL); 0x365cc8c0728e08aef0874981ed59dc47178fd570daeb01267bf950656e102897
   };

  const handleSubmit = async (e) => {
   try {    
    e.preventDefault();
    mintNft(fileURL);
   }
     catch(error) {
      // console.log("failed", error);
      // console.log("formdata", formParams);
     }
  
  // await mintNft(fileURL); 0x365cc8c0728e08aef0874981ed59dc47178fd570daeb01267bf950656e102897
  };

  return (
    <>
      <Flex justifyContent="center" paddingTop={10} gap={10}>
        {/* <Input placeholder="Search" htmlSize={4} width="sm" variant="filled" /> */}
        <Text>{address}</Text>
        <Button
          colorScheme="black"
          bgColor="black"
          size="md"
          paddingX={10}
          paddingY={5}
          color="white"
          variant="outline"
          border="2px"
          borderColor="white"
          //onClick={onOpen}
          onClick={getMyNfts}
        >
          Mint NFT
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Tabs variant="unstyled">
                <TabList>
                  <Tab
                    _selected={{ color: "white", bg: "black" }}
                    sx={tabStyle}
                  >
                    NFT
                  </Tab>
                  <Tab
                    _selected={{ color: "white", bg: "black" }}
                    sx={tabStyle}
                  >
                    {" "}
                    Domain
                  </Tab>
                  <Tab
                    _selected={{ color: "white", bg: "black" }}
                    sx={tabStyle}
                  >
                    Assets
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Text fontSize="2xl" fontWeight="500">
                      Mint an NFT
                    </Text>
                    <Text fontSize="md">
                      Create a new NFT and mint it into one of your own ERC-1155
                      contract
                    </Text>
                    <Flex flexDirection="column" justifyContent="center" marginTop="20">
                    <Box mt="-60px" mb="10px">
                      <Text mb="10px" fontWeight="bold">
                        Ownername:
                      </Text>
                      <Input placeholder="Nft owner name" size="sm" onChange={e => updateFormParams({...formParams, ownername: e.target.value})} value={formParams.ownername} />
                    </Box>
                    <Box mb="10px" fontWeight="bold">
                      <Text>Description:</Text>
                      <Textarea mb="5px" fontWeight="bold" placeholder="write here..." onChange={e => updateFormParams({...formParams, description: e.target.value})} value={formParams.description}>                        
                      </Textarea>                     
                    </Box>
                    <Box mb="30px" fontWeight="bold">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload file</label><br/>
                        <input type={"file"} onChange={OnChangeFile}></input>
                    </Box>
                      <a
                        href=""
                        className="block px-8 py-4 hover:border"
                      >
                        <Button
                          colorScheme="black"
                          bgColor="black"
                          size="lg"
                          paddingX={20}
                          paddingY={5}
                          color="white"
                          variant="outline"
                          border="2px"
                          borderColor="white"
                          // onClick={onOpen}
                          onClick={handleSubmit}
                        >
                          Mint
                        </Button>
                      </a>
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default SearchBar;
