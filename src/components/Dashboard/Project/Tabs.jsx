import React from 'react';
import { tabs } from '../../../Constants/constant.js';
import { NavLink } from 'react-router-dom';
import {  AnimatePresence, motion } from 'framer-motion';

function Tabs({ projectname }) {
  return (
    <div 
      className="flex w-full gap-1 max-w-xl"

    >
      {tabs.map((tab, index) => {
        const path = `/dashboard/projects/${projectname}/${tab}`;

        return (
          <div key={tab} className="flex-1">
            <AnimatePresence>
            <motion.div
            initial={{scale: 0, opacity: 0 }}
            animate={{scale: 1, opacity: 1}}
            transition={{type: "spring", duration: 1, transition: 'easeIn'} }
            >
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex-1 text-center px-3 py-2 font-medium text-sm rounded-[6px] transition block ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-black'
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
               
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.div>  
              )}
            </NavLink>
            </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default Tabs;
