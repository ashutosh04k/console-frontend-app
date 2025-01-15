
import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button, Skeleton } from 'antd';
import axios from 'axios';

const ProductImageUpload = ({
  imagefile, 
  setImagefile,
  uploadedImageUrl, 
  imageLoadingState, 
  setuploadedImageUrl,
  setImageLoadingState,
  isEditMode,
}) => 
  {

  const inputRef = useRef(null);
  console.log(isEditMode);
  

  const handleImageFileChange =(event)=>{
    const selectedFile = event.target.files?.[0];
    if(selectedFile){
      setImagefile(selectedFile);
    }
  }

  const handleDragOver = (event)=>{
    event.preventDefault();
  }

  const  handleDropOver =(event)=>{
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if(droppedFile){
      setImagefile(droppedFile);
      // setuploadedImageUrl(URL.createObjectURL(droppedFile));
    }
  }

  const  handleRemove = () => {
    setImagefile(null);
    // setuploadedImageUrl(null);
    if(inputRef.current){
    // inputRef.current.files = new DataTransfer().files;  
    inputRef.current.value = "";
  }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append('my_file',imagefile);
    const response = await axios.post('http://localhost:5000/api/admin/products/upload-image',data)
    console.log(response.data);
    if(response.data.success) {
      setuploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }



  useEffect(()=>{
    if(imagefile !== null){
      uploadImageToCloudinary()
    }
  },[imagefile])


  return (
    <div className='w-full max-w-md mx-auto mt-4'>
      <Label className="text-lg font-semibold mb-2 block">
        {isEditMode ? "Upload Image disabled":"Upload Image"}
      </Label>
      <div onDragOver={handleDragOver} onDrop={handleDropOver} className={`${isEditMode ? "opacity-60" : ""}border-2 border-dashed rounded-lg p-4`}>
        <Input 
          id="image-upload"
          type="file" 
          className="hidden"
          ref={inputRef} 
          onChange={handleImageFileChange}
          disabled = {isEditMode}
        />

        {
          !imagefile ? (
          <Label 
          htmlFor="image-upload" 
          className={`${isEditMode ? "cursor-not-allowed pointer-events-none" : " "}flex flex-col items-center justify-center h-32 cursor-pointer`}>
          <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
          <span>Drag & drop or click to upload image</span>
          </Label>) 
          :  
          imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
           <div className="flex items-center justify-between">
           <div className="flex items-center">
             <FileIcon className="w-8 text-primary mr-2 h-8" />
           </div>
           <p className="text-sm font-medium">{imagefile.name}</p>
           <Button
             variant="ghost"
             size="icon"
             className="text-muted-foreground hover:text-foreground"
             onClick={handleRemove}
           >
             <XIcon className="w-4 h-4" />
             <span className="sr-only">Remove File</span>
           </Button>
         </div>
        )
        }
      </div>
      
      </div>
  )
}

export default ProductImageUpload;