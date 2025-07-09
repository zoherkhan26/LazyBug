import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { BsTelegram } from "react-icons/bs";


function Footer() {
  return (
    <footer className="w-full text-center p-4 text-sm md:text-sm  ">
      <div className='py-2'>
    © {new Date().getFullYear()} LazyBug. All rights reserved. 
    </div>
    
    <div className='flex justify-center gap-2 '>
    
    <a target='_blank' href="https://github.com/zoherkhan26">
     <FaGithub className='w-6 h-6'/>
    </a>

    <a target='_blank' href="https://www.linkedin.com/in/zoher-khan">
      <FaLinkedin className='w-6 h-6 rounded-full'/>
    </a>

    <a target='_blank' href="https://t.me/zoherkhan">
     <BsTelegram className='w-6 h-6 rounded-full'/>
    </a>

    </div>  
  </footer>
  )
}

export default Footer