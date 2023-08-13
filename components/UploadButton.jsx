import React from 'react'
import { UploadButton } from "@uploadthing/react";
import {
  setQuestion,
  selectQuestion,
  selectQuestionsSelect,
} from "../featured/questionSlice";
import { useDispatch, useSelector } from "react-redux";
 
//import { OurFileRouter } from "./api/uploadthing/core";
 
export const OurUploadButton = () => {
   const currentQuestion = useSelector(selectQuestion);

  return (
    <main className="flex min-h-[100px] items-center justify-start">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            console.log(currentQuestion)
            setQuestion({ libelle: res[0].fileUrl });
            console.log("Files: ", res[0].fileUrl);
            alert("Upload Completed");
          }
          // Do something with the response
          
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
  
};