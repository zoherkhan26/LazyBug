import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, PlusCircle } from "lucide-react";
import { AddFeatureForm } from "./AddFeatureForm";
import useProjectStore from "@/Store/projectstore";
import { useParams } from "react-router-dom";
import Featurelist from "./Featurelist";
import EmptyState from "@/components/Dashboard/Project/EmptyState";
import { motion } from "framer-motion";



function Mvptab() {
  const [isFeatureDialogOpen, setFeatureDialogOpen] = useState(false);
  const projects = useProjectStore((state) => state.projects);

  const { projectname } = useParams();
  const project = projects.find((p) => p.name === projectname);
  const projectId = project?.id;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  return (
    
    <section className="flex flex-col grow gap-4">
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
            <Plus />
            <span className="text-xs font-medium"> New Feature </span>
          </Button>

          <AddFeatureForm
            open={isFeatureDialogOpen}
            setOpen={setFeatureDialogOpen}
            projectId={projectId}
          />
        </div>
      </div>

      <motion.section
        className="flex grow flex-1 flex-col space-y-1 p-2 py-6 rounded gap-1.5 min-h-[300px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {project.features.length === 0 ? (
          <EmptyState
            title={"No Features Added"}
            subtitle={"Start by adding your first feature"}
            action={
              <Button
                className="bg-black text-white text-xs rounded font-semibold transition-all hover:cursor-pointer"
                onClick={() => setFeatureDialogOpen(true)}
              >
                <PlusCircle className="w-4 h-4 mr-1" />
                Add Feature
              </Button>
            }
          />
        ) : (
          project.features
            .sort((a, b) => {
              if (a.completed !== b.completed) {
                return a.completed - b.completed;
              }
              if (a.completed && b.completed) {
                return b.completedAt - a.completedAt;
              }
              return 0;
            })
            .map((feature) => (
        
                <Featurelist feature={feature} projectId={projectId} key={feature.id} />
             
            ))
        )}
      </motion.section>
    </section>
   
  );
}

export default Mvptab;
