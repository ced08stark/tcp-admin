"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AudioPlayer from "./AudioPlayer";
import { baseUrlFile, baseUrlOfUploadthing, baseUrlEOFile } from "../hooks/Axios";
import TipTap from "./TipTap";



function TaskAudio({
  name,
  consigne,
  note,
  files,
  status,
  noteMax,
  reponse,
  setNote,
  commentaire, 
  setCommentaire
}) {
 
  const [reponseFile, setReponseFile] = useState('');

  const [comment, setComment] = useState(false);
 

   function getEndOfUrl(url) {
    let lastIndex = url.lastIndexOf("/");
    
    let endOfUrl = url.substring(lastIndex + 1);
    return endOfUrl;
  }

  const router = useRouter();
  const viewImages = () => {
    if (images?.length > 0) {
      //images?.map((_, i) => router.push(`/${_}`))
    } else {
      alert("aucun document n'a ete assigne a la tache");
    }
  };
 
  return (
    <div className="w-[90%] mx-auto flex xs:flex-col lg:flex-row  justify-between bg-white">
      <div className="flex w-full flex-col m-3">
        <h1 className="text-xl underline font-bold pb-3">{name}</h1>
        <div className="xs:w-[90%]  lg:w-[80%] flex-col flex items-center">
          <figure className="max-w-screen-md mx-auto text-center">
            <svg
              className="w-6 h-6 mx-auto mb-3 text-gray-400 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <blockquote>
              <p className="text-sm italic text-center font-medium text-gray-900 dark:text-white">
                {consigne}
              </p>
            </blockquote>
          </figure>
          {files && (
            <Link
              target="_blank"
              href={baseUrlFile + files.toString()}
              className="px-4 py-1 bg-blue-500 rounded-md text-white my-4"
            >
              ecouter audio
            </Link>
          )}
        </div>
      </div>
      <div className="m-3 w-full">
        {/* <div className="text-lg xs:w-[90%] m-auto flex items-center justify-center lg:w-full h-[300px] font-medium p-3 rounded-xl border-2">
          {reponse ? (
            <AudioPlayer
              url={`${baseUrlOfUploadthing + getEndOfUrl(reponse)}`}
            />
          ) : (
            <span className="font-bold text-lg">Aucun audio</span>
          )}
        </div> */}
        <div className="text-lg xs:w-[90%] m-auto flex items-center justify-center lg:w-full h-[300px] font-medium p-3 rounded-xl border-2">
          {reponse ? (
            <AudioPlayer
              url={`${baseUrlEOFile + reponse.toString()}`}
            />
          ) : (
            <span className="font-bold text-lg">Aucun audio</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="m-1">
            <span className="text-sm xs:hidden lg:inline">
              note de la tache:{" "}
            </span>
            <input
              type="number"
              disabled={status == "en cours" ? false : true}
              placeholder={`saisir une note sur ${noteMax}`}
              max={noteMax}
              value={note ? note : undefined}
              min={0}
              onChange={(e) => setNote(e.target.value)}
              className="text-end  outline-none border-b-2  border-t-0 border-l-0 border-r-0"
            />
          </div>
        </div>
        {!comment ? (
          <button
            onClick={() => setComment(true)}
            className={`bg-blue-500 inline-block text-white text-sm font-medium px-10 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md`}
          >
            commenter
          </button>
        ) : (
          <TipTap setComment={setCommentaire} comment={commentaire} />
        )}
      </div>
    </div>
  );
}

export default TaskAudio;
