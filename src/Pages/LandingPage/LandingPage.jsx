import React from "react";
import {ReactLenis, useLenis} from "lenis/react"
import Nav from "../../components/LandingPage/Nav";
import Footer from "../../components/LandingPage/Footer";
import Hero from "../../components/LandingPage/Hero"

const LandingPage = () => {
// const lenis = useLenis((lenis) => {
//   console.log(lenis)
// })
  return (
    <> 
    <ReactLenis root>
      
      <div className="  flex flex-col mx-auto max-w-[1100px] scroll-smooth gap-1 min-h-screen pb-12">

      
        <Nav/>
        
        <Hero/>
        
        <Footer/>
      
        </div>
        </ReactLenis>
      </>
    
  );
};

export default LandingPage;
