import React from 'react'
import { UploadButton } from "@uploadthing/react";


 
import { OurFileRouter } from "../app/api/uploadthing/core";
 
export const OurUploadButton = () => {

  return(
    <UploadButton<OurFileRouter>
    endpoint="mediaPost"
    onClientUploadComplete={(res: any) => {
      // Do something with the response
      console.log("Files: ", res);
      alert("Upload Completed");
    }}
    onUploadError={(error: Error) => {
      // Do something with the error.
      alert(`ERROR! ${error.message}`);
    }}
  />
  )
  
  };