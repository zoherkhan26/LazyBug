// pages/MilestoneTab.jsx
// import MilestoneDialog from "@/components/MilestoneDialog";
// import MilestoneList from "@/components/MilestoneList";
import useProjectStore from "@/Store/projectstore";
import AddMilestoneForm from "./AddMilestoneForm";
import { useParams } from "react-router-dom";
import MilestoneList from "./MilestoneList";
import EmptyState from "@/components/Dashboard/Project/EmptyState";


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
      <div className="flex grow flex-1 flex-col space-y-1  p-2 py-6 rounded gap-1.5  min-h-[300px]">
    { project.milestones.length === 0 ? (
        <EmptyState
        title="No Milestones Added"
        subtitle="Track your progress by adding key milestones"
      />
    ) : 
    
    project?.milestones?.map((milestone) => ( 
      
      <MilestoneList key={milestone.id} milestone={milestone} projectId={projectId} />
      ))}
    </div>
    </section>
  );
};

export default MilestoneTab;
