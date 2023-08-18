"use client";
import Image from "next/image";
import React, {useState} from "react";
import * as Icons from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setSerie
} from "../featured/serieSlice";
import { setQuestionsSelect } from "../featured/questionSlice";
import GetCookies from "../hooks/getCookies";
import { instance } from "../hooks/Axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

function SerieComponent({item, setSeries}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = GetCookies("token");
    const [isLoading, setIsLoading] = useState(false);
    const handledelete = async () => {
      confirmAlert({
        title: "Confirm to delete",
        message: "Are you sure to do this.",
        buttons: [
          {
            label: "Yes",
            onClick: async() => {
                setIsLoading(true);
                const data = await instance
                .delete(`/api/serie/series/${item._id}`, {
                headers: {
                    Authorization: `basic ${token}`,
                  },
            })
            .catch((err) => console.log(err));
          setIsLoading(false);
          if (data) {
            getSeries();
          } else {
            alert("delete question failed");
          }
            },
          },
          {
            label: "No",
            onClick: () => alert("Click No"),
          },
        ],
      });
      
    };

    const getSeries = async () => {
      const data = await instance
        .get("/api/serie/series", {
          headers: {
            Authorization: `basic ${token}`,
          },
        })
        .catch((err) => console.log(err.message));
      console.log(data);
      if (data) {
        setSeries(data?.data);
        getSeries();
      }
    };

   
    const handleSerie = () => {
        dispatch(setSerie(item))
        dispatch(setQuestionsSelect(item?.questions))
        router.push("/series")
    }
  return (
    <div
      className=" hover:shadow-xl transition-shadow duration-300 ease-in-out border-2 mx-2 shadow-md w-[300px]  sm:w-1/2 lg:w-[300px] cursor-pointer border-gray-200 p-4 rounded-lg space-y-2"
      onClick={() => handleSerie()}
    >
      <div className="flex items-center justify-between">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-16 h-16"
          src="/assets/images/folder.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className="z-20" onClick={() => handledelete()}>
          {!isLoading ? (
            <button
              className=" bg-red-500 rounded-md inline-block text-white text-sm font-medium px-2 py-2  border-0 shadow-sm shadow-black/40 uppercase relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none"
            >
              <Icons.TrashIcon className="w-4 h-4" />
            </button>
          ) : (
            <button className="px-2 d-grid w-100 text-white flex items-center justify-center rounded-md py-1 bg-red-500 hover:bg-red-700">
              <div
                class="spinner-border spinner-border-sm text-white"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          )}
        </div>
      </div>

      <div>
        <span className="font-semibold">Serie: </span>
        <span className=" font-light">{item?.libelle}</span>
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <Icons.QuestionMarkCircleIcon className="w-6 h-6 text-blue-500" />
          <span className=" font-light text-sm ">
            {item?.questions?.length > 0 ? item?.questions?.length : 0}{" "}
            questions
          </span>
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
