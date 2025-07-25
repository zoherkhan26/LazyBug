import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function DashboardButton() {
  return (
      <Link to={'/dashboard/home'}>
    <div
      className={`group relative  w-28 md:w-32 lg:w-36 cursor-pointer overflow-hidden rounded-full   p-1.5 px-3 text-center font-medium   translate-y-1.5 border border-gray-300 mb-2 items-center`}
    >
      <span className="inline-block translate-x-1 text-sm sm:text-base tracking-wide transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        Dashboard
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2  opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 bg-[#172121] text-white">
        <span className="text-sm sm:text-base">Dashboard</span>
        <FaArrowRight size={14} sm:size={16} strokeWidth={2} />
      </div>
      <div className="absolute left-[5%] sm:left-[8%] md:left-[12%] top-[35%] sm:top-[38%] md:top-[40%] h-2 w-2 scale-[1] rounded-2xl  transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-myaccentlight dark:group-hover:bg-fuchsia-700 bg-[#172121]"></div>
    </div>
    </Link>
  );
}

export default DashboardButton;
