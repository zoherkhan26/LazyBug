import React from 'react'
import {motion} from "framer-motion"
import DashboardButton from './DashboardButton'
import '@fontsource-variable/schibsted-grotesk'
import '@fontsource/bebas-neue';
import lazyBugLogo from '../../assets/lazyBugLogo.png'


function Nav() {
  return (
<>
    <nav className="w-full flex justify-between h-16 items-center ">
    <div className='flex items-center space-x-2'>
  <motion.img 
    className='w-12 hover:opacity-80'
    src={lazyBugLogo}
    alt="LazyBug Logo"
    initial={{scale:0.5, opacity:0}}
    animate={{ opacity: 1,scale:1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  />   
  <motion.h1
    className="text-3xl font-extralight tracking-wide hover:opacity-80 cursor-pointer"
    style={{ fontFamily: "Bebas Neue" }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    Lazy<span className='text-accent'>Bug</span>
  </motion.h1>
</div>

    <DashboardButton/>  
  </nav>
  </>
  )
}

export default Nav