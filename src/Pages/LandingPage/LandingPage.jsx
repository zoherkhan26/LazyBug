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
    {/* <div className="flex h-screen w-max"> */}

    <div className="  min-h-screen flex flex-col mx-auto ">
        {/* Background Blobs */}
  <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-purple-200  rounded-full blur-3xl opacity-20 animate-pulse z-[-1]" />
  <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-amber-200 rounded-full blur-3xl opacity-20 animate-pulse z-[-1]" />

     
      <Nav/>
      <Hero/>
      <Footer/>
    
      </div>
      </>
    
  );
};

export default LandingPage;
