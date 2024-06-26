"use client";
import QuestionsRows from "../../../../components/QuestionsRows";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SerieComponent from "../../../../components/SerieComponent";
import AddSerie from "../../../../components/AddSerie";
import GetCookies from "../../../../hooks/getCookies";
import { instance, baseUrlImg } from "../../../../hooks/Axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestion,
  selectQuestion,
  selectQuestionsSelect,
} from "../../../../featured/questionSlice";
import QuestionView from "../../../../components/QuestionView";
import QuestionsRowSelect from "../../../../components/QuestionsRowSelect";
import { selectSerie } from "../../../../featured/serieSlice";
import * as Icons from "@heroicons/react/24/outline";
import ModalUpdateEE from "../../../../components/ModalUpdateEE"
import AudioPlayer from "../../../../components/AudioPlayer";
import QuestionsRowEE from "../../../../components/QuestionsRowEE"
import QuestionsRowEO from '../../../../components/QuestionsRowEO'

let serieTable = [];
function QuestionsPage() {
  const router = useRouter();
  const token = GetCookies("token");
  const [isLoading, setIsLoading] = useState(false);
  const [serie, setSerie] = useState(null);
  const [filter, setFilter] = useState({
    name: "consigne",
    value: "",
  });
  const currentQuestion = useSelector(selectQuestion);
  const currentSerie = GetCookies("serie");
  const [image, setImage] = useState(null);

  const [isUploading2, setIsUploading2] = useState(false);

  

  const handleSerie = async () => {
    const result = await instance.get(`/api/serie/series/${currentSerie}`, {
      headers: {
        Authorization: `basic ${token}`,
      },
    });

    if (result) {
      setSerie(result?.data);
    }
  };

  
  const [eeQuestions, setEEQuestions] = useState([]);
  

  const Add = async () => {
    let modal = document.querySelector("#lightbox");
    modal.classList.remove("scale-0");
  };

  const getEEQuestions = async () => {
    const data = await instance
      .get("/api/eeQuestion/questions", {
        headers: {
          Authorization: `basic ${token}`,
        },
      })
      .catch((err) => console.log(err.message));
    console.log(data);
    if (data) {
      setEEQuestions(data?.data);
    }
  };

  // const Update = async () => {
  //   setIsLoading(true);
  //   const data = await instance
  //     .patch(
  //       `/api/serie/series/${serie._id}`,
  //       {
  //         libelle: serie.libelle,
  //         questions: selectLists,
  //       },
  //       {
  //         headers: {
  //           Authorization: `basic ${token}`,
  //         },
  //       }
  //     )
  //     .catch((err) => console.log(err.message));
  //   setIsLoading(false);
  //   if (data) {
  //     alert("serie update success");
  //     router.push("/dashboard");
  //   }
  // };

  

  useEffect(() => {
    handleSerie()

  }, []);
  return (
    <div className="flex h-auto m-2 lg:m-4 lg:mx-10 flex-col">
      <div className="flex items-center justify-between m-2">
        <div className="flex space-x-2 items-center">
          <div className=" flex items-center justify-center">
            <div className="px-2 py-2 rounded-full bg-white cursor-pointer">
              <Icons.AdjustmentsHorizontalIcon className="w-5 h-5 bottom-1 right-1 text-gray-400" />
            </div>
            <select
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              className="absolute opacity-0 px-10 cursor-pointer"
            >
              <option>filter by</option>
              <option value="consigne">consigne</option>
              <option value="numero">numero</option>
              <option value="categorie">categorie</option>
              <option value="discipline">discipline</option>
              <option value="point">point</option>
            </select>
          </div>
          <div className="relative">
            <input
              type="search"
              onChange={(e) => setFilter({ ...filter, value: e.target.value })}
              placeholder={`recherche par ${filter.name}`}
              className="p-1 text-sm outline-none rounded-lg w-[200px]  md:w-[250px]"
            />
            <Icons.MagnifyingGlassIcon className="w-5 h-5 absolute bottom-1 right-1 text-gray-400" />
          </div>
        </div>
      
      </div>

     
      <div className="flex h-screen">
        <div
          className={`flex flex-col overflow-x-auto w-full  lg:overflow-y-auto ${
            currentQuestion?.consigne ? `lg:w-[70%]` : `lg:w-full`
          }  bg-white`}
        >
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
                        serie
                      </th>
                      <th scope="col" className="px-6 py-4">
                        task 1
                      </th>
                      <th scope="col" className="px-6 py-4">
                        task 2
                      </th>
                      <th scope="col" className="px-6 py-4">
                        task 3
                      </th>
                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {serie?.eeQuestions?.map((q, i) => (
                      <QuestionsRowEE
                        serie={serie}
                        item={q}
                        key={i}
                        id={i + 1}
                      />
                    ))}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
       
      </div>

      <ModalUpdateEE item={serie?.eeQuestions[0]} setSerie={setSerie} />
    </div>
  );
}

export default QuestionsPage;
