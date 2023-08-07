"use client";
import QuestionsRows from "../../components/QuestionsRows";
import React from "react";
import Image from "next/image";
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
