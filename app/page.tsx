import LandingComponent from "@/components/LandingComponent";
// import Navbar from "@/components/navbar";
import StartComponent from "@/components/StartComponent";

export default function Home() {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen gap-4 max-w-[100dvw]">
      {/* <Navbar /> */}
      <LandingComponent />
      <StartComponent />
    </div>
  );
}
