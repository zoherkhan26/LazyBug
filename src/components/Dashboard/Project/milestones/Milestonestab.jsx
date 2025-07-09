// pages/MilestoneTab.jsx
// import MilestoneDialog from "@/components/MilestoneDialog";
// import MilestoneList from "@/components/MilestoneList";
import useProjectStore from "@/Store/projectstore";
import AddMilestoneForm from "./AddMilestoneForm";
import { useParams } from "react-router-dom";
import MilestoneList from "./MilestoneList";


const MilestoneTab = () => {
  const projects = useProjectStore((state) => state.projects)
  const { projectname } = useParams();
  const project = projects.find((p) => p.name === projectname );

 const   projectId = project?.id ;

  return (
    <section className="flex flex-col grow gap-4">
   
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold">Milestones</h2>
        <AddMilestoneForm projectId={projectId} />
      </div>
      <div className="flex flex-col gap-2 ">
    {  project?.milestones?.map((milestone) => ( 
      
      <MilestoneList key={milestone.id} milestone={milestone} projectId={projectId} />
      ))}
    </div>
    </section>
  );
};

export default MilestoneTab;
