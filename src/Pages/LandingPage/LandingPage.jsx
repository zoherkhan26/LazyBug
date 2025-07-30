import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Nav from "../../components/LandingPage/Nav";
import Footer from "../../components/LandingPage/Footer";
import Hero from "../../components/LandingPage/Hero"
import { BsTelegram } from "react-icons/bs";

const LandingPage = () => {
  return (
    <> 
    
      
      <div className="  flex flex-col mx-auto max-w-[1100px] scroll-smooth gap-1 min-h-screen ">

      
        <Nav/>
        
        <Hero/>
        
        <Footer/>
      
        </div>
      </>
    
  );
};

export default LandingPage;
