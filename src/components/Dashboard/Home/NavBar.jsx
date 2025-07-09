import React from 'react'
import { BreadCrumb } from './BreadCrumb'
import { LaptopMinimal } from 'lucide-react';

export const NavBar = ({setOpen}) => {
  return (
    <nav className='bg-white flex items-center space-x-2.5 text-sm text-black  p-2   border-b border-gray-200 border-muted-purple bg-dark-blue leading-2'>
         <div className='p-3 border-r border-gray-300 hover:bg-gray-100' onClick={() => setOpen((prev) => !prev)} >
          <LaptopMinimal className='rotate-90 text-black/90  bg-gray-50 ' size={17}  />
         </div>
        <div className='' ><BreadCrumb/></div>
         </nav>
  )
}
