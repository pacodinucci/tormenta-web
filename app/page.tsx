import LandingComponent from "@/components/LandingComponent";
import Navbar from "@/components/navbar";
import StartComponent from "@/components/StartComponent";

export default function Home() {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen pt-16 gap-8 max-w-[100dvw]">
      <Navbar />
      <LandingComponent />
      <StartComponent />
    </div>
  );
}
