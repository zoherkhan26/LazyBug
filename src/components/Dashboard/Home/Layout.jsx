import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { CreateProjectForm } from './CreateProjectForm'
import { Key, Plus } from 'lucide-react'; 
import useProjectStore from '@/Store/projectstore';
import ProjectCard from './ProjectCard';

export default function Layout() {
  const [open, setOpen]  = useState()
  const projects = useProjectStore((state) => state.projects )
  return (
    
    projects ?
   <section className='max-w-[1300px] min-h-full px-4 py-4 pt-6 md:px-6 flex flex-col  gap-y-4 '>

             <div className='border-b border-gray-300 pb-6 '>
                   
                     
             <p  className='text-faded-50 font-semibold '>Welcome Back</p> 

               <div className={`flex justify-between `}> 
              
                <span className='md:text-2xl text-lg font-semibold '>Projects</span>
               <Button className='bg-black text-white rounded-[6px] cursor-pointer'  variant='primary' onClick={() => setOpen(true)}>
                <Plus className=''/>
                Create Project
               </Button>  

               <CreateProjectForm open={open} setOpen={setOpen} />
               </div>
            </div>

              <div className='grow p-2 bg-gray-50'>  
                  <div className='flex flex-wrap gap-6 px-4 py-2'>
                  {
                    projects.map((project) => (
                        
                        <ProjectCard project={project} key={project.id} />
                    ))
                  }
                  </div>

            </div>
        

   </section>
   : ''
  )
}


