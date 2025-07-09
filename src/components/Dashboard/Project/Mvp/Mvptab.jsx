import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddFeatureForm } from "./AddFeatureForm";
import useProjectStore from "@/Store/projectstore";
import { useParams } from "react-router-dom";
import Featurelist from "./Featurelist";

function Mvptab() {
  const [isFeatureDialogOpen, setFeatureDialogOpen] = useState(false);
  const projects = useProjectStore((state) => state.projects);
  // const features = useProjectStore((state) => state.features);
  const removeFeature = useProjectStore((state) => state.removeFeature);
  const { projectname } = useParams();
  const project = projects.find((p) => p.name === projectname);
  const projectId = project?.id;
  console.log(project);

  return (
    <section className="flex flex-col grow gap-4 ">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-center text-black/70 text-sm">
          Features
        </p>
        <div>
          <Button
            className="bg-black text-white rounded-[6px] cursor-pointer"
            variant="primary"
            onClick={() => setFeatureDialogOpen(true)}
          >
            <Plus className="" />
            <span className="text-xs font-medium"> New Feature </span>
          </Button>

          <AddFeatureForm
            open={isFeatureDialogOpen}
            setOpen={setFeatureDialogOpen}
            projectId={projectId}
          />
        </div>
      </div>

      <section className="flex grow flex-col space-y-1 bg-gray-100 p-2 py-6 rounded gap-1.5 ">
        {[...project.features]
          .sort((a, b) => {
            // Sorting the incompleted first
            if (a.completed !== b.completed) {
              return a.completed - b.completed;
            }

            // sorting the completed ones, using the 'completedAt' key
            if (a.completed && b.completed) {
              return b.completedAt - a.completedAt;
            }

            return 0;
          })
          .map((feature) => (
            <Featurelist
              key={feature.id}
              feature={feature}
              projectId={projectId}
            />
          ))}
      </section>
    </section>
  );
}

export default Mvptab;
