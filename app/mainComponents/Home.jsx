import Image from "next/image";
import Link from "next/link";
import VideoComponent from "../components/video";
import TopHeroText from "../TextComponents/topHeroText";
import BottomHeroText from "../TextComponents/bottomHeroText";
import SecurityFeatures from "../components/threeBlocks";


const HomeComponent = () => {
  return(
    <div  >
    <div className="h-screen w-screen overflow-hidden " >
      <VideoComponent />
    </div>
     <div className="absolute top-0 h-screen w-screen flex flex-col justify-between ">
                <TopHeroText />
                <BottomHeroText />
            </div>
            <div>
              <SecurityFeatures />
            </div>
    </div>
  )
}

export default HomeComponent;  