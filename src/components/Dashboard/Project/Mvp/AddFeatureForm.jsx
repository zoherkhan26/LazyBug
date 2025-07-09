import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useParams } from 'react-router-dom'
import useProjectStore from '@/Store/projectstore'
import { toast, Zoom } from 'react-toastify'

export const AddFeatureForm = ({ open, setOpen , projectId  }) => {
  const { projectname } = useParams();
  const projects = useProjectStore((state) => state.projects );
  const addFeature = useProjectStore((state) => state.addFeature );


   
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({mode: 'onSubmit'})

  const onSubmit = (data) => {
    try {
      const newFeature = {
        ...data,
        id: Date.now(),
        completed: false,
      }
  
      addFeature(projectId, newFeature)
      reset()
      setOpen(false)
      toast.success(' Feature added successfully!', {
        className: 'toast-fade-top bg-black  text-sm px-4 py-2 rounded',
        transition: Zoom,
      })
  
    } catch (error) {
      toast.error('❌ Failed to add feature')
    }
  }

  const handleDialogClose = () => {
    clearErrors()
    reset()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleDialogClose()
        setOpen(isOpen)
      }}
    >
      <DialogContent className="text-sm max-w-[300px] md:max-w-[400px] bg-bg w-96 rounded-[8px]">
        <DialogHeader>
          <DialogTitle>Add a Feature</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mt-2">
            <Label htmlFor="featureTitle" className=" font-semibold">
              Feature Title
            </Label>
            <input
              type="text"
              id="featureTitle"
              {...register('title', { required: 'Feature title is required' })}
              className="w-full px-4 py-1 text-gray-900 bg-white border border-gray-300 rounded-lg mt-2 focus:outline-none focus:border-black"
              placeholder="Dark Mode Toggle"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="mt-2 ">
            <Label htmlFor="details" className="text-sm font-semibold">
              Feature Details
            </Label>
            <textarea
              id="details"
              {...register('details', {
                required: 'Feature details are required',
                minLength: {
                  value: 20,
                  message: 'Feature details must be at least 20 characters',
                },maxLength: {
                  value: 200,
                  message: 'Description must be within 20 characters long',
                }
              })}
              className="w-full h-24 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg resize-none mt-2 focus:outline-none focus:border-black"
              placeholder="Explain what this feature does..."
            />
            {errors.details && (
              <p className="text-red-500 text-sm">{errors.details.message}</p>
            )}
          </div>

          <div className="">
            <Label htmlFor="dueDate" className="text-sm font-semibold">
              Due Date
            </Label>
            <input
              type="date"
              id="dueDate"
              {...register('dueDate', { required: 'Due date is required' })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-1 text-gray-900 bg-white border border-gray-300 rounded-lg mt-2 focus:outline-none focus:border-black"
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
            )}
          </div>


          <DialogFooter>
            <button type="submit" className="rounded bg-black text-white px-4 py-1.5 grow hover:bg-black/90">
              Add Feature
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
