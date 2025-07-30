import {
  CalendarDays,
  CheckCircle,
  Ellipsis,
  Trash2,
  Eye,
  Loader,
  CircleCheck,
} from "lucide-react";
import useProjectStore from "@/Store/projectstore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function MilestoneCard({ milestone, projectId }) {
  const [open, setOpen] = useState(false);

  const deleteMilestone = useProjectStore((state) => state.deleteMilestone);
  const updateMilestone = useProjectStore((state) => state.updateMilestone);

  const isDeadlinePassed = milestone.deadline
    ? new Date(milestone.deadline) < new Date()
    : false;

    const handleDelete = async (e) => {
      e.stopPropagation(); 
      try {
        await deleteMilestone(projectId, milestone.id);
        toast.info("Milestone deleted!");
      } catch (error) {
        toast.error("Failed to delete milestone.");
      }
    };

  const toggleStatus = (e) => {
    const newStatus = milestone.status === "pending" ? "completed" : "pending";
  
    updateMilestone(projectId, milestone.id, { status: newStatus });
  
    newStatus === "pending"
      ? toast.info(`Marked as ${newStatus}`)
      : toast.success(`Marked as ${newStatus}`);
  
    e.stopPropagation(); 
  };
  

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex items-start justify-between px-4 py-3 rounded bg-white border border-black/10 shadow-md hover:shadow-lg transition-all"
       onClick={() => setOpen(true)}
      >
        {/* Left content */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[15px]">{milestone.title}</h3>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                milestone.status === "completed"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {milestone.status}
            </span>
          </div>

          {milestone.description && (
            <p className="text-gray-600 text-sm line-clamp-1 w-40">
              {milestone.description}
            </p>
          )}

          {milestone.deadline && (
            <div className="flex items-center gap-2 text-xs mt-1 text-gray-600">
              <CalendarDays size={14} />
              <span className="font-medium">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(milestone.deadline))}
              </span>
              {milestone.status === "pending" && isDeadlinePassed && (
                <span className="ml-2 px-1 py-0.5 bg-red-100 text-red-600 rounded font-semibold">
                  Deadline Passed
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right side:Menu */}
        <div className="flex flex-col items-end gap-1 p-2">
          

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Ellipsis size={17} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-40 rounded border bg-white border-black/10"
              side="right"
              align="start"
            >
              <DropdownMenuItem
                onClick={ (e) => toggleStatus(e)}
                className="flex items-center gap-2 px-2 py-2 cursor-pointer text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors border-b border-b-black/10"
              >
                <CheckCircle size={16} />
                <span>
                  Mark as{" "}
                  {milestone.status === "pending" ? "Achieved" : "Pending"}
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={(e) => handleDelete(e)}
                className="flex items-center gap-2 px-2 py-2 cursor-pointer text-sm font-semibold   text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Sheet Content */}
      <SheetContent side="right" className="w-[290px] sm:w-[400px] overflow-y-auto bg-white">
        <SheetHeader>
          <SheetTitle className="text-lg mb-2">{milestone.title}</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm font-semibold">Status:</p>
            <p
              className={`text-sm ${
                milestone.status === "completed"
                  ? "text-green-600"
                  : "text-yellow-500"
              }`}
            >
              {milestone.status === "completed" ? (
                <span className="inline-flex items-center gap-1">
                  <CircleCheck className="h-4 w-4 text-emerald-500" /> Completed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <Loader
                    className="h-4 w-4"
                    style={{ animation: "spin 8s linear infinite" }}
                  />{" "}
                  In Progress
                </span>
              )}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Deadline:</p>
            <p className="text-sm text-gray-700">
              {milestone.deadline
                ? new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(milestone.deadline))
                : "No deadline set"}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Description:</p>
            <p className="text-sm text-gray-800">
              {milestone.description || "No description provided."}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
