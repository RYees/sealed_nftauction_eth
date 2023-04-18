import React, { useState } from "react";
import {
  Button,
  Input,
  Text,
  Flex,
  Textarea,
  Box,
  Image,
  Select,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const NewListing = () => {
  const [currentStep, setCurrentStep] = useState("1");
  const Step1 = () => {
    return (
      <Flex direction="column" marginY="5rem" paddingX="15rem" gap={5}>
        <Flex justifyContent="center">
          <Text fontSize="4xl" textAlign="center">
            Create New Listing
          </Text>
        </Flex>

        <Text fontSize="md" textAlign="center">
          Create a new NFT and mint it into one of your own ERC-1155 contract
        </Text>
        <Box>
          <Text mb="5px" fontWeight="bold">
            Name:
          </Text>
          <Input placeholder="Here is a sample placeholder" size="lg" />
        </Box>
        <Box>
          <Text mb="5px" fontWeight="bold">
            External Links:
          </Text>
          <Input placeholder="Here is a sample placeholder" size="lg" />
        </Box>
        <Box>
          <Text mb="5px" fontWeight="bold">
            Description:
          </Text>
          <Textarea placeholder="Here is a sample placeholder" size="lg" />
        </Box>
        <Flex justifyContent="center">
          <Button
            colorScheme="black"
            size="xlg"
            mt="10"
            paddingY={5}
            color="white"
            variant="outline"
            border="2px"
            borderColor="white"
            bgColor="black"
            width="40%"
            onClick={() => setCurrentStep("2")}
          >
            Continue
          </Button>
        </Flex>
      </Flex>
    );
  };
  const Step2 = () => {
    return (
      <Flex direction="column" marginY="3rem" paddingX="15rem" gap={5}>
        <Flex justifyContent="space-between">
          <ArrowBackIcon
            boxSize={8}
            onClick={() => setCurrentStep("1")}
            mt="3"
          />
          <Text fontSize="4xl" textAlign="center" width="95%">
            Create New Listing
          </Text>
        </Flex>
        <Flex direction="column" px="10rem" gap={5}>
          <Text fontSize="md">
            Create a new NFT and mint it into one of your own ERC-1155 contract
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Image, Video, Audio, or 3D Model
          </Text>
          <Text>
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Max size: 100 M
          </Text>

          <Box
            border="1px"
            borderStyle="dotted"
            width="30%"
            borderColor="grey"
            rounded="xl"
          >
            <Input
              type="file"
              //   position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
            />
            <Image
              boxSize="100%"
              src="/images/svg/fe_picture.svg"
              alt=""
              rounded="xl"
            />
          </Box>
          <Box>
            <Text mb="5px" fontWeight="bold">
              Blockchain:
            </Text>
            <Select placeholder="Select Chain">
              <option value="option1">Etherium</option>
              <option value="option2">Polygon</option>
              <option value="option3">Arbitrium</option>
            </Select>
          </Box>
        </Flex>

        <Flex justifyContent="center">
          <Button
            colorScheme="black"
            size="xlg"
            mt="10"
            paddingY={5}
            color="white"
            variant="outline"
            border="2px"
            borderColor="white"
            bgColor="black"
            width="40%"
          >
            Create
          </Button>
        </Flex>
      </Flex>
    );
  };
  return currentStep == "1" ? <Step1 /> : <Step2 />;
};

export default NewListing;
