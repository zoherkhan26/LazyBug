import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Tabs from "@/components/Dashboard/Project/Tabs";

function ProjectPage() {
  const { projectname } = useParams();

  return (
    <section className="min-h-[93vh] max-w-[1300px] px-2 min-[400px]:px-4 min-[500px]:px-10 pt-10 pb-4 flex flex-col gap-y-4">
      <div className="space-y-4 pb-4 border-b border-b-gray-300">
        <p
          className="text-lg font-semibold 
        "
        >
          {projectname}
        </p>
        <Tabs projectname={projectname} />
      </div>

      <Outlet />
    </section>
  );
}

export default ProjectPage;
