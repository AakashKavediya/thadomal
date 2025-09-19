import Link from "next/link"

const BottomHeroText = () => {
    return(
        <div>
            <div className="flex flex-row justify-center align-center text-center gap-2" >
                <Link  href="/" className="text-[6vw] m-4 p-0 border-3 leading-[5.5vw] border-orange-00 px-10 hover:border-[#D3FD50] hover:text-[#D3FD50] rounded-full outline-none font-bold uppercase">CULLINARY </Link>
                <Link  href="/" className="text-[6vw] m-4 p-0 border-3 leading-[5.5vw] border-orange-00 px-10 hover:border-[#D3FD50] hover:text-[#D3FD50] rounded-full outline-none font-bold uppercase">MAGIC</Link>
            </div>
        </div>
    )
}

export default BottomHeroText