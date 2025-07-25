'use client';

import React from "react";
import { PlusCircle } from "lucide-react";
import { DotPatterns } from "../../DotPatterns";
import { motion } from "framer-motion";

const EmptyState = ({ title, subtitle, icon, action }) => {
  return (
    <div className="relative flex flex-1 min-h-[300px] w-full items-center justify-center">
      <DotPatterns />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="z-10 text-center space-y-4"
      >
        {icon || <PlusCircle className="w-8 h-8 text-black/80 mx-auto" />}
        <div>
          <p className="text-lg md:text-3xl font-semibold text-black">
            {title}
          </p>
          <p className="text-sm text-gray-500 font-semibold">
            {subtitle || "Start by adding your first item"}
          </p>
        </div>
        {action && <div>{action}</div>}
      </motion.div>
    </div>
  );
};

export default EmptyState;
