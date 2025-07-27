import useProjectStore from '@/Store/projectstore';
import { useState } from 'react';
import { Check, Clock, Ellipsis, Trash2, Eye, Loader, BadgeCheck, CircleCheck } from 'lucide-react';
import { toast } from "react-toastify";
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Featurelist({ feature, projectId }) {
  const removeFeature = useProjectStore((state) => state.removeFeature);
  const toggleFeatureCompletion = useProjectStore((state) => state.toggleFeatureCompletion);
  const [open, setOpen] = useState(false);

  const isDueDatePassed = feature.dueDate ? new Date(feature.dueDate) < new Date() : false;

  const onDelete = (featureId) => {
    try {   
      removeFeature(projectId, featureId);
      toast.success("Feature deleted successfully!");
    } catch (error) {
      toast.error(error)
    }
  };

  const FeatureCompleted = (featureId) => {
    toggleFeatureCompletion(projectId, featureId);
    const message = !feature.completed
      ? "Marked as completed"
      : "Marked as incomplete";
    toast.info(message);
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div 
    variants={childVariants}
    className={`flex flex-row sm:items-center justify-between w-full px-4 py-3 mb-3 rounded bg-white border border-black/10 shadow-lg gap-y-3 sm:gap-y-0 ${feature.completed ? 'opacity-70' : ''}`}>
      
      {/* Left Section */}
      <motion.div  
     
      className="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-3 w-full sm:w-auto">
        <label className="group cursor-pointer">
          <input
            type="checkbox"
            checked={feature.completed}
            onChange={() => FeatureCompleted(feature.id)}
            className="hidden"
          />
          <div className={`
            w-4 h-4 border-2 rounded-full flex items-center justify-center
            transition-all duration-200
            ${feature.completed ? 'bg-green-500/50 border-green-500/10' : 'border-gray-300'}
          `}>
            {feature.completed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          </div>
        </label>

        <span className={`font-semibold text-sm break-words ${feature.completed ? 'line-through text-faded' : ''}`}>
          {feature.title}
        </span>

        <div className="hidden md:flex md:flex-col text-xs ml-1 sm:ml-5 mt-0.5 ">
          {feature.dueDate &&
            (!feature.completed ? (
              isDueDatePassed ? (
                <span className="text-red-500 font-semibold bg-red-100 px-1 rounded py-0.5">
                  Due date Passed
                </span>
              ) : (
                <span className="flex gap-1 items-center text-black/80">
                  <Clock size={14} />
                  <p className="font-semibold text-gray-500">
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    }).format(new Date(feature.dueDate))}
                  </p>
                </span>
              )
            ) : (
              <p className="text-green-600 font-semibold bg-green-100 px-1.5 py-0.5 rounded">
                Completed
              </p>
            ))}
        </div>
      </motion.div>

      {/* Right Section */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        {/* Sheet for Details */}
        <Sheet open={open} onOpenChange={setOpen} className=''>
          <SheetTrigger asChild>
            <Eye
              size={18}
              className="cursor-pointer text-gray-600 hover:text-black transition"
              onClick={() => setOpen(true)}
            />
          </SheetTrigger>

          <SheetContent side="right" className="w-[290px] sm:w-[400px] overflow-y-auto bg-white">
            <SheetHeader>
              <SheetTitle className="text-lg mb-2">{feature.title}</SheetTitle>
            </SheetHeader>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-semibold">Status:</p>
                <p className={`text-sm ${feature.completed ? "text-green-600" : "text-yellow-500"}`}>
                {feature.completed ? (
                  <span className="inline-flex items-center gap-1">
                    <CircleCheck className="h-4 w-4 text-emerald-500" /> Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <Loader className="h-4 w-4 "  style={{ animation: 'spin 8s linear infinite' }}  /> In Progress
                  </span>
                )}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">Deadline:</p>
                <p className="text-sm text-gray-700">
                  {feature.dueDate
                    ? new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }).format(new Date(feature.dueDate))
                    : "No deadline set"}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">Description:</p>
                <p className="text-sm text-gray-800">
                  {feature.details || "No description provided."}
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Dropdown for Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Ellipsis size={17} className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 rounded" side="right" align="start">
            <DropdownMenuItem
              onClick={() => onDelete(feature.id)}
              className="flex items-center gap-2 px-2 py-2 cursor-pointer text-sm bg-white shadow-sm rounded border border-black/10 font-semibold text-gray-700 hover:bg-gray-100 hover:text-black/90 transition-colors"
            >
              <Trash2 size={16} />
              <span>Delete feature</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}


<Loader />