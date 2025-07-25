
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useProjectStore from "@/Store/projectstore";
import { Tech } from "../../../../Constants/constant";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

export default function TechStackDialog({ project }) {
  const addTech = useProjectStore((state) => state.addTech);
  const techs = useProjectStore((state) => state.techs);

  const [selectedTech, setSelectedTech] = useState([]);
  const [isOpen, setIsOpen] = useState(false); 

  const projectId = project?.id;

  //  Pre-select already added techs when dialog opens
  useEffect(() => {
    if (isOpen && project?.techs) {
      const existingIds = project.techs.map((tech) => tech.id);
      setSelectedTech(existingIds);
    }
  }, [isOpen, project]);

  const toggleTech = (tech) => {
    setSelectedTech((prev) =>
      prev.includes(tech.id)
        ? prev.filter((id) => id !== tech.id)
        : [...prev, tech.id]
    );
  };

  //  Prevent duplicates + close dialog after adding
  const handleAdd = () => {
    const existingIds = project.techs.map((t) => t.id);
    let addedCount = 0;

    selectedTech.forEach((id) => {
      if (!existingIds.includes(id)) {
        const tech = Tech.find((t) => t.id === id);
        addTech(projectId, tech);
        addedCount++;
      }
    });

    if (addedCount > 0) {
      toast.success(`${addedCount} tech${addedCount > 1 ? 's' : ''} added to the project!`);
    } else {
      toast.info("No new technologies were added.");
    }
    setIsOpen(false); //  Close the dialog
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-black text-white px-4 py-2 rounded-[6px]  mr-4 hover:bg-black/80 cursor-pointer text-[13px]"
          variant="primary"
        >
          + Add Tech
        </Button>
      </DialogTrigger>

      <AnimatePresence>
        {isOpen && (
          <DialogContent className="max-w-lg bg-bg">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <h3 className="text-lg font-semibold mb-4">Select Technologies</h3>
              </DialogHeader>

              <motion.div 
                className="flex flex-wrap items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {Tech.map((tech, index) => {
                  const isSelected = selectedTech.includes(tech.id);
                  return (
                    <motion.button
                      key={tech.id}
                      onClick={() => toggleTech(tech)}
                      className={`flex items-center gap-1 py-2 px-3 rounded-full border text-sm transition-all 
                        ${isSelected ? "bg-blue-100 border-blue-500" : "bg-white hover:bg-gray-100"}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        animate={isSelected ? { 
                          backgroundColor: "#dbeafe",
                          borderColor: "#3b82f6",
                          scale: 1.02
                        } : {
                          backgroundColor: "#ffffff",
                          borderColor: "#e5e7eb",
                          scale: 1
                        }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-1"
                      >
                        <img src={tech.logo} alt={tech.name} className="w-4 h-4" />
                        <span>{tech.name}</span>
                      </motion.div>
                    </motion.button>
                  );
                })}
              </motion.div>

              <motion.div 
                className="mt-6 flex justify-end gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Button
                  className='grow bg-black text-white text-center rounded-[6px] cursor-pointer'
                  onClick={handleAdd}
                  disabled={selectedTech.length === 0}
                  variant='primary'
                >
                  Add Selected
                </Button>
              </motion.div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}