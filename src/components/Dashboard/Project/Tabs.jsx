import React from 'react';
import { tabs } from '../../../Constants/constant.js';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

function Tabs({ projectname }) {
  return (
    <motion.div 
      className="flex w-full gap-1 max-w-xl"
      // initial={{ opacity: 0, y:  }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.3 }}
    >
      {tabs.map((tab, index) => {
        const path = `/dashboard/projects/${projectname}/${tab}`;

        return (
          <div key={tab} className="flex-1">
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
                <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale:  1,

                }}
                transition={{
                 type: 'spring',
                    stiffness: 400,
                    damping: 18,
                    bounce: 0.15,
                  
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.span>  
              )}
            </NavLink>
          </div>
        );
      })}
    </motion.div>
  );
}

export default Tabs;
