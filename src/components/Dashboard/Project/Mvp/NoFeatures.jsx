import { DotPatterns } from "@/components/DotPatterns";
import React from "react";

export const NoFeatures = () => {
  return (
    <div className="relative flex flex-1 h-full w-full items-center justify-center  ">
     <DotPatterns/>
      {/* Main content */}
      <div className="z-10 text-center">
        <p className="text-lg md:text-3xl font-semibold ">No Features Added</p>
        <p className="text-xs font-semibold md:text-sm text-gray-500">Start by adding your first feature</p>
      </div>
    </div>
  );
};
