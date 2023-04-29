import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

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

const UpcomingList = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1484589065579-248aad0d8b13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=918&q=80",
  },
];


const AuctionCard = (data) => {
  const router = useRouter();
  //console.log("card", data);
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text fontSize="2xl" color="red">
          Live Auction
        </Text>
        <Text fontSize="md"> See All</Text>
      </Flex>
   
      <Flex gap={5} marginBottom="10">
            <Box key={data.data.tokenId} color="black">
                {/* <Link
                   href={{
                    pathname: `./auctions/[tokenId]`,
                    query: {
                      id: data.data.tokenId, // pass the id 
                    },
                  }}
                  as={`/auctions/${data.data.tokenId}`}                
                >    */}
             
                          
                    <Image boxSize="xs" src={data.data.image} alt="" rounded="xl" onClick={()=>{
                                     router.push({
                                      pathname: "./auctions/[tokenId]",
                                      query: { data: JSON.stringify(data.data) },
                                    });
                    }}/> 
                               
               {/* </Link> */}
            </Box>      
      </Flex>
  
      
      <Flex justifyContent="space-between">
        <Text fontSize="2xl">Upcoming auctions</Text>
        <Text fontSize="md"> See All</Text>
      </Flex>

      <Flex gap={5} marginBottom="10">
            <Box key={data.data.tokenId} color="black">
                <Link
                   href={{
                    pathname: `./auctions/[tokenId]`,
                    query: {
                      id: data.data.tokenId, // pass the id 
                    },
                  }}
                  as={`/auctions/${data.data.tokenId}`}                
                >   
                    <Image boxSize="xs" src={data.data.image} alt="" rounded="xl" />               
                </Link>
            </Box>      
      </Flex>

      <Flex justifyContent="space-between">
        <Text fontSize="2xl">Todays Pick</Text>
        <Text fontSize="md"> See All</Text>
      </Flex>
       <Flex gap={5} marginBottom="10">
            <Box key={data.data.tokenId} color="black">
              <Link
                   href={{
                    pathname: `./auctions/[tokenId]`,
                    query: {
                      id: data.data.tokenId, // pass the id 
                    },
                  }}
                  as={`/auctions/${data.data.tokenId}`}                
                >   
                    <Image boxSize="xs" src={data.data.image} alt="" rounded="xl" />               
              </Link>
            </Box>      
      </Flex>

      <Flex justifyContent="space-between">
        <Text fontSize="2xl">New Auctions</Text>
        <Text fontSize="md"> See All</Text>
      </Flex>

       <Flex gap={5} marginBottom="10">
            <Box key={data.data.tokenId} color="black">
                <Link
                   href={{
                    pathname: `./auctions/[tokenId]`,
                    query: {
                      id: data.data.tokenId, // pass the id 
                    },
                  }}
                  as={`/auctions/${data.data.tokenId}`}                
                >   
                    <Image boxSize="xs" src={data.data.image} alt="" rounded="xl" />               
                </Link>
            </Box>      
      </Flex>

    </Box>
  );
};

export default AuctionCard;
