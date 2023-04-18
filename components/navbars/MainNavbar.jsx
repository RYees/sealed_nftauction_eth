import { useState } from "react";
import Image from "next/image";
import { Button, Flex } from "@chakra-ui/react";

export default function MainNavbar() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      bg="black"
      color="white"
      fontSize={20}
      padding="5"
    >
      <a href="./">
        <Image src="/images/svg/logo.svg" alt="" width="100" height="100" />
      </a>
      <a href="./home" className="block px-8 py-4 hover:border">
        Home
      </a>
      <a href="./auctions" className="block px-8 py-4 hover:border">
        Auctions
      </a>
      <a href="./place-bid" className="block px-8 py-4 hover:border">
        Place Bid
      </a>
      <a href="" className="block px-8 py-4 hover:border">
        Asset
      </a>
      <Button
        colorScheme="black"
        size="lg"
        paddingX={10}
        paddingY={2}
        color="white"
        variant="outline"
        border="2px"
        borderColor="white"
      >
        Account
      </Button>
    </Flex>
  );
}
