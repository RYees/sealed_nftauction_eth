import Image from "next/image";
import { Button, Flex } from "@chakra-ui/react";

export default function Navbar() {
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
