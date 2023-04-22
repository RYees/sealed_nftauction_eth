import React from "react";
import { Button, Flex, Text, Box, Image, Input, useClipboard, NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper, } from "@chakra-ui/react";
  
import { useStateContext } from '../../context';

const RevealBids= () => {
  return (
    <>
    <Flex marginX="20" marginTop={10} flexDirection="column" rowGap={3} mb="2">
       <Text marginRight="8px">
            <Input type="number" placeholder="listing id" height="40px" />
        </Text>
        <NumberInput defaultValue={0.01} min={0.01}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
        <Text marginRight="8px">
            <Input type="" placeholder="passcode" height="40px" />
        </Text>
    </Flex>

    <Flex marginX="20">
      
      <Button
        colorScheme="black"
        size="xlg"
        paddingY={4}
        color="white"
        variant="outline"
        border="2px"
        borderColor="white"
        bgColor="black"
        width="30%"
        >
        Reveal Bid
    </Button>
    </Flex>
    </>
  );
};

export default RevealBids;
