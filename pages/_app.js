import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import "../styles/globals.css";
import { StateContextProvider } from '../context';
import { motion, AnimatePresence } from "framer-motion";

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  ChainId
} from "@thirdweb-dev/react";
import {
  ThirdwebStorage,
  StorageDownloader,
  IpfsUploader,
} from "@thirdweb-dev/storage";

// Configure a custom ThirdwebStorage instance
const gatewayUrls = {
  "ipfs://": [
    "https://gateway.ipfscdn.io/ipfs/",
    "https://cloudflare-ipfs.com/ipfs/",
    "https://ipfs.io/ipfs/",
  ],
};
const downloader = new StorageDownloader();
const uploader = new IpfsUploader();
const storage = new ThirdwebStorage({ uploader, downloader, gatewayUrls });
import MainNavbar from "../components/navbars/MainNavbar";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());
  const variants = {
    out: {
      opacity: 0,
      y: 40,
      transition: {
        duration: 0.75
      }
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        delay: 0.5
      }
    }
  };
  return (
    <ThirdwebProvider
    desiredChainId={ChainId.Sepolia}
    supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
    autoConnect={false}
    storageInterface={storage}
    >
    <QueryClientProvider client={queryClient}>  
        <ChakraProvider>
          <StateContextProvider>
            <Layout>
              {/* <AnimatePresence 
                mode='wait' 
                initial={false}
              >
              <motion.div
                key={router}
                variants={variants}
                animate="in"
                initial="out"
                exit="out"
              > */}
                  <Component {...pageProps} />
                {/* </motion.div>
              </AnimatePresence> */}
            </Layout>
          </StateContextProvider>
        </ChakraProvider>
     
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </ThirdwebProvider>
  );
}
