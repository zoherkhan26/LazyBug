import useProjectStore from "@/Store/projectstore";
import TechStackDialog from "./TechStackDialogue"; 
import { useParams } from "react-router-dom";

export default function Techtab() {

  const projects = useProjectStore((state) => state.projects)
  const { projectname } = useParams();
  const project = projects.find((proj) => proj.name === projectname);

  const projectId = project?.id;
  
  const removeTech = useProjectStore((state) => state.removeTech  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Tech Stack</h3>
        <TechStackDialog project={project} />
      </div>

      <div className="flex flex-wrap gap-2">
        {(project?.techs || []).map((tech, index) => (
          <div
            key={index}
            className="bg-gray-100 text-sm px-3 py-1 rounded-full flex items-center gap-2 "
          >
            <img src={tech.logo} alt={tech.name} className="w-4 h-4" />
            {tech.name}
            <button
              onClick={() => removeTech(projectId, tech)}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
