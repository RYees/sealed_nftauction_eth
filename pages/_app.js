import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import "../styles/globals.css";

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
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

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        activeChain="binance-testnet"
        supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
        autoConnect={false}
        storageInterface={storage}
      >
      
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThirdwebProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
