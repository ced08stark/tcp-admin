"use client";
import QuestionsRows from "@/components/questionsRows";
import React from "react";
import Image from "next/image";
import * as Icons from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function QuestionsPage() {
  const router = useRouter();
  return (
    <div className="flex h-screen m-4 mx-10 flex-col">
      
      <button
        onClick={() => router.push("/questions/addQuestion")}
        type="button"
        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  bg-blue-500  text-white  py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-full]"
        data-te-toggle="modal"
        data-te-target="#exampleModalXl"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        Add question
      </button>
      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModalXl"
        tabindex="-1"
        aria-labelledby="exampleModalXlLabel"
        aria-modal="true"
        role="dialog"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] min-[1200px]:max-w-[1140px]"
        >
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5
                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalXlLabel"
              >
                Extra large modal
              </h5>

              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="relative p-4">...</div>
          </div>
        </div>
      </div>
      {/* <div className="w-full flex items-center">
        <table className="w-[80%]  border">
          <thead className="bg-gray-50">
            <tr>
              <th className=" p-4 uppercase text-xs font-bold text-gray-600 text-left">
                #
              </th>
              <th className=" p-4 uppercase text-xs font-bold text-gray-600 text-left">
                consigne
              </th>
              <th className=" p-4 uppercase text-xs font-bold text-gray-600 text-left">
                consigne
              </th>
              <th className=" p-4 uppercase text-xs font-bold text-gray-600 text-left">
                consigne
              </th>
            </tr>
          </thead>
          <tbody>
            <QuestionsRows />
            <QuestionsRows />
            <QuestionsRows />
            <QuestionsRows />
          </tbody>
        </table>
        <div className="w-[200px]"></div>
      </div> */}
      <div className="flex h-screen ">
        <div className="flex flex-col overflow-x-auto overflow-hidden lg:overflow-y-auto lg:w-[70%] bg-white">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium bg-gray-50 dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="px-6 py-4">
                        consigne
                      </th>
                      <th scope="col" className="px-6 py-4">
                        categorie
                      </th>
                      <th scope="col" className="px-6 py-4">
                        discipline
                      </th>
                      <th scope="col" className="px-6 py-4">
                        duree
                      </th>
                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <QuestionsRows />
                    <QuestionsRows />
                    <QuestionsRows />
                    <QuestionsRows />
                    <QuestionsRows />
                    <QuestionsRows />
                    <QuestionsRows />
                    <QuestionsRows />
                    <QuestionsRows />
                    <QuestionsRows />
                    <QuestionsRows />
                    <QuestionsRows />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 space-y-2 flex-col bg-white p-3  h-full">
          <div className="w-full h-[150px] justify-center flex">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
              src="/assets/images/questionnaire.jpg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
          <div>
            <span className="font-bold">Consigne : </span>
            <span>Quel est la superficie du camer ?</span>
          </div>
          <div>
            <span className="font-bold">Discipline : </span>
            <span>Math</span>
          </div>
          <div>
            <span className="font-bold">Categorie : </span>
            <span>A1</span>
          </div>
          <div>
            <span className="font-bold">Duree : </span>
            <span>3 min</span>
          </div>
          <div className="flex flex-col space-y-3">
            <p className="font-bold text-center underline">Suggestions </p>
            <div className="flex items-center">
              <span className="p-3 text-white font-bold bg-red-500">R1: </span>
              <textarea
                onChange={() => console.log("none")}
                cols={1}
                rows={1}
                className=" w-full pl-2"
                value="Quel est la superficie du  cameroun ?"
              ></textarea>
            </div>
            <div className="flex items-center">
              <span className="p-3 text-white font-bold bg-red-500">R1: </span>
              <textarea
                onChange={() => console.log("none")}
                cols={1}
                rows={1}
                className=" w-full pl-2"
                value="Quel est la superficie du  cameroun ?"
              ></textarea>
            </div>
            <div className="flex items-center">
              <span className="p-3 text-white font-bold bg-red-500">R1: </span>
              <textarea
                onChange={() => console.log("none")}
                cols={1}
                rows={1}
                className=" w-full pl-2"
                value="Quel est la superficie du  cameroun ?"
              ></textarea>
            </div>
            <div className="flex items-center">
              <span className="p-3 text-white font-bold bg-green-500">
                R1:{" "}
              </span>
              <textarea
                onChange={() => console.log("none")}
                cols={1}
                rows={1}
                className=" w-full pl-2"
                value="Quel est la superficie du  cameroun ?"
              ></textarea>
            </div>
          </div>
          <div className="mt-10  h-[100px] flex items-center justify-center w-full">
            <button
              className="bg-green-500 inline-block text-white text-sm font-medium px-5 py-2 cursor-pointer border-0 shadow-sm shadow-black/40 uppercase relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-full"
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsPage;
