import useProjectStore from '@/Store/projectstore'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { toast } from 'react-toastify'

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

export const CreateProjectForm = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm()
  const addProject = useProjectStore((state) => state.addProject)

  const onSubmit = (data) => {
    try {
      const udpatedData = {
        ...data,
        name: slugify(data.name),
        id: Date.now(),
        createdAt: new Date().toDateString()
      }
  
      addProject(udpatedData)
      reset()
      setOpen(false)
      toast.success("🎉 Project created successfully!")
  
      reset()
      setOpen(false)
    } catch (error) {
      console.error("Project creation failed:", error)
      toast.error("❌ Failed to create project. Please try again.")
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
      className=""
    >
      <DialogContent className="sm:max-w-md bg-white w-96 rounded-[8px]">
        <DialogHeader>
          <DialogTitle>Create a new Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mt-2">
            <Label
              htmlFor="projectName"
              className={`text-sm font-semibold text-mytext`}
            >
              Project Name
            </Label>
            <input
              type="text"
              id="projectName"
              {...register('name', { required: 'Project name is required' })}
              className="w-full px-4 py-1 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none  transition duration-200 ease-in-out mt-2 focus:border-black"
              placeholder="LazyBug"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="mt-2">
            <Label htmlFor="description" className={`text-mytext font-semibold`}>
              Project Description
            </Label>

            <textarea
              id="descriptioon"
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 40,
                  message: 'Description must be at least 40 characters long',
                },
                maxLength: {
                  value: 300,
                  message: 'Description must be within 300 characters long',
                }
              })}
              className="w-full h-24 px-4 py-2  text-gray-900 bg-white border border-gray-300 rounded-lg resize-none focus:outline-none  transition duration-200 ease-in-out mt-2 focus:border-black"
              placeholder="Break down your project description."
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message} </p>
            )}
          </div>

          <DialogFooter className={`dialog-footer-custom`}>
            <button
              type="submit"
              className="rounded bg-black text-white px-4 py-1.5"
            >
              Create
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}