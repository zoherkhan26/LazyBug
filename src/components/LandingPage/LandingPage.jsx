import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Nav from "./Nav";
import Footer from "./Footer";
import Hero from "./Hero"
import { BsTelegram } from "react-icons/bs";

const LandingPage = () => {
  return (
    <> 
    {/* <div className="flex h-screen w-max"> */}
    <div className="  min-h-screen flex flex-col mx-auto ">
     
      <Nav/>
      <Hero/>
      <Footer/>
    
      </div>
      </>
    
  );
};

export default LandingPage;
