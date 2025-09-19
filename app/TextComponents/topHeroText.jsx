import VideoComponent from "../components/video"

const TopHeroText = () => {
    return(
        <div className="p-4 text-center" >
            <div><h2 className="font-[font2] font-bold text-[9.5vw] uppercase leading-[9vw] flex justify-center align-center item-center pt-20">Fuel Your Life</h2></div>
            <div><h2 className="font-[font2] font-bold text-[9.5vw] uppercase leading-[9vw] flex flex-row justify-center align-center item-center">
            with 
                <div className="h-[12vh] w-[12vw] rounded-full mt-4 mx-2 overflow-hidden flex justify-center align-center item-center">
                    <VideoComponent />
                </div>
                Fresh</h2></div>
            <div><h2 className="font-[font2] font-bold text-[9.5vw] uppercase leading-[9vw] flex justify-center align-center item-center">Choices</h2></div>
        </div>
    )
}

export default TopHeroText