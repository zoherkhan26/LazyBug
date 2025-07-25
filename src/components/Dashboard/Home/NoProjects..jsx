import React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DotPatterns } from "@/components/DotPatterns";

const NoProjects = ({ onCreate }) => {
  return (
    <div className="relative flex flex-1 min-h-[400px] w-full items-center justify-center rounded-lg">
      <DotPatterns/>

      <div className="z-10 text-center space-y-4">
        <PlusCircle className="w-10 h-10 text-black/80 mx-auto" />
        <div>
          <p className="text-2xl md:text-4xl font-semibold text-black">No Projects Found</p>
          <p className="text-xs md:text-sm text-gray-500">Create your first project to get started</p>
        </div>
        <Button
          onClick={onCreate}
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Create New Project
        </Button>
      </div>
    </div>
  );
};

export default NoProjects;
