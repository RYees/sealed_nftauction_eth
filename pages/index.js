import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import useStore from "./../store/store";
import { immer } from "zustand/middleware/immer";
import HomeCard from "../components/homepage/HomeCard";
import MainNavbar from "../components/navbars/MainNavbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const color = useStore((state) => state.color);
  const changeColor = useStore((state) => state.changeColor);
  return (
    <>
      <Head>
        <title>Bid-Bloc Dapp</title>
        <meta
          name="description"
          content="A decentralised NFT Auction Application"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/svg/logo.svg" />
        <meta property="og:image" content="/images/svg/logo.svg" />
      </Head>
      <main>
        <MainNavbar />
        <HomeCard />
      </main>
    </>
  );
}
