import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {  MoreVertical, Trash2 } from 'lucide-react';
import useProjectStore from '@/Store/projectstore';
import { toast } from 'react-toastify';

function ProjectCard({ project }) {
  const removeProject = useProjectStore((state) => state.removeProject);
  const techToDisplay = project?.techs?.slice(0, 5)



  return (
    <Link to={`/dashboard/projects/${project.name}`}>
      <div className="w-[280px] min-h-[180px] rounded-[8px] border border-gray-200 bg-white p-4 shadow-lg hover:shadow-xl transition-shadow flex flex-col gap-2">
        <div className="flex justify-between  items-center">
          <h3 className="text-md font-semibold">{project.name}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <div className='p-1'>
              <MoreVertical size={14} />
                   
                    <span className="sr-only">More</span>
                  </div>

            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-40 rounded bg-white p-1 shadow-md">
            <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  removeProject(project.id);
                  toast.success("Project deleted successfully!");
                }}
                className="flex items-center gap-2 px-2 py-1 cursor-pointer text-black/70 hover:text-black hover:bg-gray-100 focus:outline-none"
              >
                <Trash2 size={16} />
                <span className="text-sm font-medium ">Delete Project</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-gray-600 text-xs overflow-hidden line-clamp-3 mt-2 font-medium">
          {project.description}
        </p>
        <div className="pt-3 flex flex-wrap gap-2 border-t border-gray-300">
  {techToDisplay?.map((tech, index) => (
    <span
      key={index}
      className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-[6px] font-medium border border-gray-300 "
    >
      {tech.name}
    </span>
  ))}
</div>

<div className="mt-3  font-medium  text-black/70 text-xs  text-right pt-2">
   {new Date(project.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}
</div>
      </div>
    </Link>
  );
}

export default ProjectCard;



//<Ellipsis size={17} /> //