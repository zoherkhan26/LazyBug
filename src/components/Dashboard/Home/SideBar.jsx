import useProjectStore from "@/Store/projectstore";
import { ChevronLast, ChevronFirst, Menu } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"; 
import lazyBugLogo from "../../../assets/lazyBugLogo.png";
import { motion, AnimatePresence } from "framer-motion";

const SidebarContext = createContext();

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const projects = useProjectStore((state) => state.projects);

  return (
    <>
      {/* Mobile Sidebar Trigger */}
      {window.innerWidth < 768 && (
        <Sheet open={open} onOpenChange={setOpen}>
          {/* Mobile Sidebar Content */}
          <SheetContent side="left" className="p-0 w-64">
            <nav className="h-full flex flex-col bg-white shadow-sm">
              <div className="p-4 pb-2 flex items-center gap-2">
                <Link to="/" className="flex items-center gap-2">
                  <motion.img
                    src={lazyBugLogo}
                    alt="LazyBug Logo"
                    className="w-8 sm:w-10"
                    initial={false}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <motion.h1
                    className="text-2xl sm:text-3xl font-normal tracking-wide pt-1"
                    style={{ fontFamily: "Bebas Neue" }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    Lazy<span className="text-accent">Bug</span>
                  </motion.h1>
                </Link>
              </div>

              <SidebarContext.Provider value={{ open }}>
                <SidebarItem projects={projects} />
              </SidebarContext.Provider>
            </nav>
          </SheetContent>
        </Sheet>
      )}

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ width: open ? 224 : 56 }}
        animate={{ width: open ? 224 : 56 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
        className="h-screen hidden sm:flex flex-col py-2 border-r border-gray-200 shadow-sm bg-white"
      >
        <nav
          className={`flex items-center gap-1 transition-all ${
            open ? "px-3 py-2" : "px-1 py-1"
          }`}
        >
          <Link to="/" className="flex items-center gap-1">
            <motion.img
              src={lazyBugLogo}
              alt="LazyBug Logo"
              initial={false}
              animate={{ width: open ? 55 : 64 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            <AnimatePresence>
              {open && (
                <motion.h1
                  className="text-4xl font-normal tracking-wide pt-1"
                  style={{ fontFamily: "Bebas Neue" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  Lazy<span className="text-accent">Bug</span>
                </motion.h1>
              )}
            </AnimatePresence>
          </Link>
        </nav>

        <div className="flex flex-col relative p-2">
          <AnimatePresence>
            {open && (
              <motion.div
                className="px-2 text-faded text-sm font-body"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Projects
              </motion.div>
            )}
          </AnimatePresence>

          <div className="px-1">
            <SidebarContext.Provider value={{ open }}>
              <SidebarItem projects={projects} />
            </SidebarContext.Provider>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export function SidebarItem({ projects }) {
  const { open } = useContext(SidebarContext);

  return (
    <ul className="flex flex-col gap-2 mt-2">
      {projects.length > 0 ? (
        projects.map((proj) => {
          const isActive = location.pathname.startsWith(
            `/dashboard/projects/${proj.name}`
          ); // active logic
          return (
            <li
              key={proj.id}
              className={`relative flex items-center px-2 py-2 rounded-md cursor-pointer group 
                ${
                  isActive
                    ? "bg-gray-100 text-black"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
            >
              <Link
                to={`/dashboard/projects/${proj.name}`}
                className="flex items-center w-full"
              >
                {/* Dot or Icon */}
                <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>

                {/* Project name (when sidebar is open) */}
                <AnimatePresence>
                  {open && (
                    <motion.span
                      className="ml-3 text-sm font-medium truncate"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ duration: 0.15 }}
                    >
                      {proj.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Tooltip (when sidebar is collapsed) */}
              {!open && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-all">
                  {proj.name}
                </div>
              )}
            </li>
          );
        })
      ) : (

        open &&   <p className="text-xs text-gray-500 ml-4">No projects yet</p>
      )}
    </ul>
  );
}






