// components/MilestoneDialog.jsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useProjectStore from "@/Store/projectstore";
import { toast } from "react-toastify";
import { Label } from "@radix-ui/react-dropdown-menu";


const AddMilestoneForm = ({ projectId }) => {
  const {addMilestone} = useProjectStore()
  const { register, handleSubmit, reset, formState: { errors }, clearErrors } = useForm({mode: 'onSubmit'});
  const [open, setOpen] = useState(false);

  const onSubmit = (data) => {
    try {
      
   
    const newMilestone = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      status: "pending",
    };

     setOpen(false);
     addMilestone(projectId, newMilestone);
    toast.success(' Milestone added successfully!', )
    reset();
  } catch (error) {
    toast.error('❌ Failed to add Milestone') 
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
        variant='primary'
        className={`bg-black text-white px-4 py-2 rounded-[6px] text-[13px] mr-4 cursor-pointer `}
        >
          <Plus className="w-4 h-4 mr-2 " /> New Milestone
        </Button>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-md bg-bg w-96 rounded-[8px]'
       >
        <DialogHeader>
          <DialogTitle>Add Milestone</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-1 text-gray-900 bg-white border border-gray-300 rounded-lg mt-2 focus:outline-none focus:border-black"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          <textarea
            placeholder="Description"
            {...register("description",  {
              required: 'milestone details are required',
              minLength: {
                value: 20,
                message: 'Feature details must be at least 20 characters',
              },
              maxLength: {
                value: 90,
                message: 'Description must be within 90 characters long',
              }
            })}
            className="w-full h-24 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg resize-none mt-2 focus:outline-none focus:border-black"
          />
           {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
            <div>
            <Label htmlFor="dueDate" className="text-sm font-semibold">
              Due Date
            </Label>
          <input
            type="date"
            {...register("deadline", { required: 'Due date is required' })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-1 text-gray-900 bg-white border border-gray-300 rounded-lg mt-2 focus:outline-none focus:border-black"
          />
            </div>
          <Button type="submit" className="w-full w-rounded bg-black text-white px-4 py-1.5 grow hover:bg-black/90">
            Add Milestone
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMilestoneForm;
