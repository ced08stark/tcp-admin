"use client";
import Image from "next/image";
import React, {useState, useEffect} from "react";
import * as Icons from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import GetCookies from "../hooks/getCookies";
import { instance, baseUrlImg } from "../hooks/Axios";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion, selectQuestion } from "../featured/questionSlice";

function QuestionView() {
  const router = useRouter();
  const currentQuestion = useSelector(selectQuestion);
  const close = () => {
    const lightbox = document.querySelector("#lightbox");
    lightbox.classList.remove("scale-100");
    lightbox.classList.add("scale-0");
    
  };
  return (
    <section
      className="fixed z-50 lg:hidden  inset-0 w-full h-full dark:text-white flex-col   flex items-center justify-center transition-all duration-300 scale-0 "
      id="lightbox"
    >
      <div
        className="flex-col p-4 space-y-2   overflow-y-auto overflow-x-hidden  flex rounded-md bg-white dark:bg-gray-800 w-full  h-auto    sm:p-0 shadow-lg shadow-black "
        id="lightbox-body"
      >
        <div className="flex justify-between items-center">
          <span className="text-xl sm:text-xl font-bold ">Question view</span>
          <Icons.XMarkIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => close()}
          />
        </div>
        <div className="w-full h-[100px] m-3 justify-center flex">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
            src={`${baseUrlImg}${currentQuestion?.libelle}`}
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        <div>
          <audio className="bg-red-400 w-full p-4">
            <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
          </audio>
          <span className="font-bold">Consigne : </span>
          <span>{currentQuestion?.consigne}</span>
        </div>
        <div>
          <span className="font-bold">Discipline : </span>
          <span>{currentQuestion?.discipline?.libelle}</span>
        </div>
        <div>
          <span className="font-bold">Categorie : </span>
          <span>{currentQuestion?.categorie?.libelle}</span>
        </div>
        <div>
          <span className="font-bold">Duree : </span>
          <span>{currentQuestion?.duree}</span>
        </div>
        <div className="flex flex-col space-y-3">
          <p className="font-bold text-center underline">Suggestions </p>
          {currentQuestion?.suggestions?.map((item, index) => (
            <div className="flex items-center" key={index}>
              <span
                className={`p-3 text-white font-bold ${
                  !item?.isCorrect ? `bg-red-500` : `bg-green-500`
                } `}
              >
                R{`${index + 1}`}:{" "}
              </span>
              <textarea
                onChange={() => console.log("none")}
                cols={1}
                rows={1}
                className=" w-full pl-2 p-2 outline-none border text-sm"
                //value={item?.text}
                placeholder={item?.text}
              ></textarea>
            </div>
          ))}
        </div>
        <div className=" flex items-center justify-center w-full ">
          <button
            className="bg-green-500 mt-8 inline-block text-white text-sm font-medium px-5 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md"
          >
            save modification
          </button>
        </div>
      </div>
    </section>
  );
}

export default QuestionView;
