"use client";
import Image from "next/image";
import React from "react";
import * as Icons from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setSerie
} from "../featured/serieSlice";
import { setQuestionsSelect } from "../featured/questionSlice";


function SerieComponent({item}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const handleSerie = () => {
        dispatch(setSerie(item))
        dispatch(setQuestionsSelect(item?.questions))
        router.push("/series")
    }
  return (
    <div
      className="hover:shadow-xl transition-shadow duration-300 ease-in-out border-2 mx-2 shadow-md w-[300px]  sm:w-1/2 lg:w-[300px] cursor-pointer border-gray-200 p-4 rounded-lg space-y-2"
      onClick={() => handleSerie()}
    >
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-16 h-16"
        src="/assets/images/folder.png"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />
      <div>
        <span className="font-semibold">Serie: </span>
        <span className=" font-light">{item?.libelle}</span>
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <Icons.QuestionMarkCircleIcon className="w-6 h-6 text-blue-500" />
          <span className=" font-light text-sm ">{item?.questions?.length > 0 ? item?.questions?.length : 0} questions</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icons.TrophyIcon className="w-6 h-6 text-green-500" />
          <span className=" font-light text-sm">best score: 0 points</span>
        </div>
      </div>
    </div>
  );
}

export default SerieComponent;
