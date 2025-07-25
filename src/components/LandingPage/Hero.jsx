import React from 'react'
import {motion} from "framer-motion"
import { Button } from '../ui/button'
import { ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';

function Hero() {
  return (  
  
  <>
{/* <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-200 opacity-30 rounded-full blur-3xl z-[-1] animate-pulse" />
<div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-amber-200 opacity-30 rounded-full blur-3xl z-[-1] animate-pulse" /> */}


  <main className="flex flex-col items-center justify-center flex-grow text-black  text-center px-4">
    <motion.h1
      className="text-3xl md:text-5xl font-bold"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
    Effortless Project Planning, Zero Hassle!

    </motion.h1>
    <p className="text-base md:text-lg mt-4 max-w-2xl">
      Plan, organize, and execute your projects seamlessly with <span className='text-black'>Lazy<span className='text-primary'>Bug</span></span>.
    </p>

    <motion.div
      className="mt-6 "
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      
    >
      <Link to={"/dashboard/home"}>
      <Button className=" text-white  rounded-full group bg-gradient-to-r from-black/40 to-black  group-hover:opacity-100 transition duration-500 hover:scale-105" variant='default'>
        Get Started 
        <ChevronRight
    className="ml-1 size-5 transition-transform duration-300 group-hover:translate-x-1"
  />
      </Button>
      </Link>
    </motion.div>
  </main>

  {/* Footer */}

  </>

  )
}

export default Hero