import React from 'react'
import {motion} from "framer-motion"
import { Button } from '../ui/button'
import { ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';

function Hero() {
  return (  
  
  <>

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
      <Button className="rounded-full group bg-black text-white hover:bg-black/90" variant='default'>
        Get Started 
        <ChevronRight
    className="size-5 transition-transform duration-300 group-hover:translate-x-1"
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