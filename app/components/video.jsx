import BottomHeroText from "../TextComponents/bottomHeroText"
import TopHeroText from "../TextComponents/topHeroText"

const VideoComponent = () => {
    return(
        <div>
            <div  >
                <video autoPlay loop muted className="h-full w-full object-cover" src="./imagess/mainVideo.mp4"></video>
            </div>
           
        </div>
    )
}

export default VideoComponent