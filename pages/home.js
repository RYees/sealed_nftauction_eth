import { Inter } from "next/font/google";
import useStore from "./../store/store";
import LandingPage from "../components/homepage/LandingPage";
import Navbar from "../components/navbars/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const color = useStore((state) => state.color);
  const changeColor = useStore((state) => state.changeColor);
  return (
    <>
      <main>
        <Navbar />
        <LandingPage />
      </main>
    </>
  );
}
