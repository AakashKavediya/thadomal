"use client"
import MagicBento from "./ReactBeatsComponents/MagicBento";
import SplitText from "./Texts/SplitText"
const HomePage = () => {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
  
  return(
    <div>
    <MagicBento 
  textAutoHide={true}
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={true}
  enableMagnetism={true}
  clickEffect={true}
  spotlightRadius={300}
  particleCount={12}
  glowColor="632, 0, 255"
/>
<SplitText
  text="Hello, GSAP!"
  className="text-2xl font-semibold text-center"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  onLetterAnimationComplete={handleAnimationComplete}
/>

    </div>
  )
}

export default HomePage;
