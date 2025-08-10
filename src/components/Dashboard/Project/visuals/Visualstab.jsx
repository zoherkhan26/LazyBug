  import useProjectStore from "@/Store/projectstore";
import { Button } from "@/components/ui/button";
import { pinata } from "@/lib/pinata";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EmptyState from "@/components/Dashboard/Project/EmptyState";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";

export default function VisualsTab() {
  const { projects, addVisual, removeVisual } = useProjectStore();
  const { projectname } = useParams();
  const project = projects.find((proj) => proj.name === projectname);
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const projectId = project?.id;
  const [previewImage, setpreviewImage] = useState(null) 



  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      
      const result = await pinata.upload.file(file);
      const url = await pinata.gateways.convert(result.IpfsHash);
       
      if (project.visuals.includes(url)) {
        toast.error("This image already exists.");
        return;
      }

      addVisual(projectId, url);
      toast.success("Image uploaded successfully!");
      
    } catch (err) {
      console.error(err);
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (url) => {
    const confirmDelete = window.confirm("Delete this image?");
    
    if (!confirmDelete) return;

    try {
      const ipfsHash = url.split('/').pop();

      if (!ipfsHash)
      {
        console.log("Failed to extract IPFS hash.");
        return;
      }
     
      await pinata.unpin([ipfsHash]);
      removeVisual(projectId, url);
      toast.success("Image deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed.");
    }
  };


  return (
    <section className="flex flex-col grow gap-4 ">
        <div
          className="flex justify-end"
        >
        <Button
          onClick={() => inputRef.current.click()}
          className="bg-black text-white px-4 py-2 rounded-[6px] text-[13px] mr-4 cursor-pointer"
          disabled={uploading}
          variant='primary'
        >
          <Plus/> 
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>

        <input
          type="file"
          ref={inputRef}
          onChange={handleUpload}
          accept="image/*"
          hidden
        />
        </div>
        
                    {project.visuals.length === 0 ? (
              <EmptyState
                title="No Visuals Uploaded"
                subtitle="Add screenshots, mockups, or designs here"
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 bg-gray-100 grow p-4">
                {project?.visuals.map((url) => (
                  <div key={url} className="relative group w-full aspect-square cursor-pointer hover:scale-[1.02] transition-transform duration-200 ease-in-out">
                    <img
                      src={url}
                      alt="Visual"
                      loading="lazy"
                      className="absolute inset-0 rounded shadow-md object-cover w-full h-full"
                      onClick={() => setpreviewImage(url)}
                    />
                    <button
                      onClick={() => handleDelete(url)}
                      className="absolute top-2 right-2 bg-red-600 text-white text-[8px] md:text-xs p-0.5 md:px-2 md:py-1 rounded md:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
      <Dialog 
      open={!!previewImage}
      onOpenChange={() => setpreviewImage(null)}
      >
        <DialogClose asChild>
  <button className="absolute top-4 right-4 text-white text-2xl bg-black p-1 hover:cursor-pointer">×</button>
</DialogClose>
         <DialogContent
  className="bg-black/90 border-none p-0 max-w-[95vw] max-h-[95vh] flex justify-center items-center overflow-hidden"
  onClick={() => setpreviewImage(null)}
>
  <img
    src={previewImage || ""}
    alt="Preview"
    className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg"
    onClick={(e) => e.stopPropagation()}
  />
</DialogContent>


      </Dialog>

      
    
    </section>
  );
}
