import { CalendarDays, CheckCircle, Ellipsis, Trash2 } from "lucide-react";
import useProjectStore from "@/Store/projectstore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export default function MilestoneCard({ milestone, projectId }) {
  const deleteMilestone = useProjectStore((state) => state.deleteMilestone);
  const updateMilestone = useProjectStore((state) => state.updateMilestone);
  
  const isDeadlinePassed = milestone.deadline
    ? new Date(milestone.deadline) < new Date()
    : false;

  const handleDelete = () => {
    deleteMilestone(projectId, milestone.id);
  };

  const toggleStatus = () => {
    const newStatus = milestone.status === "pending" ? "completed" : "pending";
    updateMilestone(projectId, milestone.id, { status: newStatus });
  };

  return (
    <div className="flex items-start justify-between px-4 py-3 rounded bg-white border border-black/10 shadow-md hover:shadow-lg transition-all">
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

      <div className="relative ">
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
              onClick={toggleStatus}
              className="flex items-center gap-2 px-2 py-2 cursor-pointer text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors border-b border-b-black/10"
            >
              <CheckCircle size={16} />
              <span>
                Mark as {milestone.status === "pending" ? "Completed" : "Pending"}
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleDelete}
              className="flex items-center gap-2 px-2 py-2 cursor-pointer text-sm font-semibold   text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
