import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div>
        <h1 className='text-4xl font-semibold mt-4 p-3'>404 Not Found</h1>
        <h3 className='text-xl font-medium'>The page you are looking for does not exist</h3>
        <Link to='/' className='text-[#0000EE]  p-3 block'>Go Home</Link>
    </div>
  )
}
