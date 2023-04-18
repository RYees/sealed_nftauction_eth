import React from "react";
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
} from "@chakra-ui/react";

const SearchBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tabStyle = {
    marginRight: "10",
    width: "60rem",
    rounded: "lg",
  };
  return (
    <>
      <Flex justifyContent="center" paddingTop={10} gap={10}>
        <Input placeholder="Search" htmlSize={4} width="sm" variant="filled" />
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
          onClick={onOpen}
        >
          Create
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
                    <Flex justifyContent="center" marginTop="20">
                      <a
                        href="./create-listing"
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
                          onClick={onOpen}
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
