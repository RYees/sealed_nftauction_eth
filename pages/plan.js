import React, {useState} from "react";
import { Button, Flex, Text, Box, Image, Input, useClipboard,  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,} from "@chakra-ui/react";
import { useStateContext } from '../context';
import RevealBids from "../components/bids/RevealBids";

const plan = () => {
    const { reveal, connect, address, revealed, revealmessage, winnerAddress, highestVal, setrevealParams, revealParams } = useStateContext();
    const [show, setShow] = useState(false);
    const [winAddress, setwinAddress ] = useState();
    
    const formChange = (event) => {
      setrevealParams((prev) => ({
        ...prev,
        [event.target.name]: event.target.value
      }))
    }
  
    const handleFormFieldChange = (fieldName, e) => {
      setrevealParams({ ...revealParams, [fieldName]: e.target.value })
    }
  
    const revealing = () => {
      //setShow(true);
      setwinAddress("0x57614b7DFcBdb14907C9573f712461Ed3c983a56");
      reveal();
    }
  return (
    <>
         <Box>
    <Flex marginX="20" marginTop={10} flexDirection="column" rowGap={3} mb="2">
          <Text marginRight="8px">
              <Input type="number" placeholder="listing id" height="40px" value={revealParams.listId} onChange={(e) => handleFormFieldChange('listId', e)} />
          </Text>
          <NumberInput defaultValue={0} step={0.1} name={'bidvalue'} value={revealParams.bidvalue} onChange={(value) => formChange({ target: { name: 'bidvalue', value }})}>
              <NumberInputField />
              <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
              </NumberInputStepper>
          </NumberInput>
          <Text marginRight="8px">
              <Input type="" placeholder="passcode" height="40px" value={revealParams.passcode} onChange={(e) => handleFormFieldChange('passcode', e)}/>
          </Text>
      </Flex>
        {/* {address} */}
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
          onClick={revealing}
          >
          Reveal Bid
      </Button>
      </Flex> 
    </Box>
    </>
  );
};

export default plan;
