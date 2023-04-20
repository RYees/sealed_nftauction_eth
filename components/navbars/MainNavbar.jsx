import { useState } from "react";
import Image from "next/image";
import { Button, Flex } from "@chakra-ui/react";
import { CustomButton } from './CustomButton';
import { useStateContext } from '../../context';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function MainNavbar() {
  const [showMenu, setShowMenu] = useState(false);
  const { connect, address } = useStateContext();
  const router = useRouter();
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      bg="black"
      color="white"
      fontSize={20}
      padding="5"
    >
      <Link href="/">        
          <Image src="/images/svg/logo.svg" alt="" width="100" height="100" />        
      </Link>

      <Link href="/home" className="block px-8 py-4 hover:border">        
          Home        
      </Link>

      <Link href="/auctions" className="block px-8 py-4 hover:border">        
          Auctions        
      </Link>

      <Link href="/place-bid" className="block px-8 py-4 hover:border">        
          Place Bid        
      </Link>

      <Link href="" className="block px-8 py-4 hover:border">        
          Asset        
      </Link>

      <Link href="/mynft" className="block px-8 py-4 hover:border">        
        Nfts      
      </Link>
      {/* <CustomButton 
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if(address) router.push('/')
            else connect()
          }}
        /> */}
      <Button
        colorScheme="black"
        size="lg"
        paddingX={10}
        paddingY={2}
        color="white"
        variant="outline"
        border="2px"
        borderColor="white"
        onClick={() => {
          if(address) router.push('/')
          else connect()
        }}
      >  
       
        Account
      </Button>
    </Flex>
  );
}
