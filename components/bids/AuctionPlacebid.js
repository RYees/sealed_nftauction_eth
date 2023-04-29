import React, {useState} from "react";
import { Button, Flex, Text, Box, Image, Input, useClipboard,  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,} from "@chakra-ui/react";
import { useStateContext } from '../../context';
import RevealBids from "./RevealBids";

const AuctionPlacebid = ({amount, id ,bytehash}) => {
    // console.log("//;",0x8f793261cfdc56049b7eba03d1558afa8b7ba5ba20157247c737165e76cd92a6);
  const { bid, connect, getNFTData, getMyNfts, donebid, setbidParams, bidParams } = useStateContext();
  const [show, setShow] = useState(false);
  const [revealed, showReveal] = useState(false);
  const [value, setValue] = useState(bytehash);
  const { onCopy, hasCopied } = useClipboard(value);
  //console.log("bidsdd", amount);

  const handleFormFieldChange = (fieldName, e) => {
    bidParams.listId = id;
    bidParams.bidamount = amount
    setbidParams({ ...bidParams, [fieldName]: e.target.value })
  }
  
  const bidding = () => {
    // setShow(true);
    bid()
  }
  return (
    <>
        {!donebid ? 
        <Box>
            <Flex justifyContent="center" mb={2} mt={7}>
                <Input
                  value={value}
                  width="70%"
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  mr={2}
                />
                <Button onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
            </Flex>
            
            <Box>
                {/* <Box>
                    <Text marginRight="180px" mb="3" mt="12">
                        <Input width="180%" height="40px" onChange={(e) => handleFormFieldChange('listId', e)} value={bidParams.listId} />
                    </Text>
                </Box> */}
                <Box>
                    <Text marginRight="180px" mb="8">
                        <Input placeholder="paste your sealed hash" width="180%" height="40px" onChange={(e) => handleFormFieldChange('sealhash', e)} value={bidParams.sealhash} />
                    </Text>
                </Box> 

                {/* <Box mb={5}>
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
                </Box> */}

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
                        onClick={bid}
                    >
                    Place Bid
                    </Button>
                </Flex>
            </Box> 
            </Box>: <RevealBids amount={amount} id={id}/>}
    </>
  );
};

export default AuctionPlacebid;
