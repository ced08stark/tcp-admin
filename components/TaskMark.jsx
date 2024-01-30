'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { baseUrlFile } from '../hooks/Axios';

function TaskMark({name, consigne, note, images, reponse, min, max, status, noteMax, setNote}) {
  const router = useRouter()
  const viewImages = () =>{
      if(images?.length > 0){
       //images?.map((_, i) => router.push(`/${_}`))
      }
      else{
        alert('aucun document n\'a ete assigne a la tache')
      }
  }
  return (
    <div className="w-[90%] mx-auto flex xs:flex-col lg:flex-row  justify-between bg-white">
      <div className="flex w-full flex-col m-3">
        <h1 className="text-xl underline font-bold pb-3">{name}</h1>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">minimum: {min}</span>
          <span className="text-sm text-gray-500">maximun: {max}</span>
        </div>
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
          {images?.map((_, i) => (
            <Link
              key={i}
              target="_blank"
              href={baseUrlFile + _}
              className="px-4 py-1 bg-blue-500 rounded-md text-white my-4"
            >
              voir le document {i + 1}
            </Link>
          ))}
        </div>
      </div>
      <div className="m-3 w-full">
        <textarea
          disabled
          className={`text-lg xs:w-[90%] lg:w-full h-[300px] font-medium p-3 rounded-xl border-2 ${
            reponse.split(/\s+/).length > max ||
            reponse.split(/\s+/).length < min
              ? "border-red-300"
              : "border-green-300"
          }  text-gray-900 dark:text-white`}
          value={reponse}
        ></textarea>
        <div className="flex items-center justify-between">
          <div
            className={`${
              reponse.split(/\s+/).length > max ||
              reponse.split(/\s+/).length < min
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {reponse.split(/\s+/).length} / {max} mots
          </div>
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
              className="text-end xs:w-[200px]  outline-none border-b-2  border-t-0 border-l-0 border-r-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskMark
