
"use client";
import QuestionsRows from "../../../components/QuestionsRows";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SerieComponent from "../../../components/SerieComponent";
import AddSerie from "../../../components/AddSerie";
import GetCookies from "../../../hooks/getCookies";
import { instance, baseUrlImg } from "../../../hooks/Axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestion,
  selectQuestion,
  selectQuestionsSelect
} from "../../../featured/questionSlice";
import QuestionView from "../../../components/QuestionView";
import QuestionsRowSelect from "../../../components/QuestionsRowSelect";


function QuestionsPage() {
  const router = useRouter();
  const token = GetCookies("token");
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();
  const currentQuestion = useSelector(selectQuestion);
  const selectLists = useSelector(selectQuestionsSelect);
  

  const getQuestion = async() =>{

    const data = await instance
        .get(
          "/api/question/questions",
          {
            headers: {
              Authorization: `basic ${token}`,
            },
          }
        )
        .catch((err) => console.log(err.message));
        console.log(data)
      if(data){
        setQuestions(data?.data)
      }

  }
  useEffect(()=>{
    getQuestion()
  }, [] )
  return (
    <div className="flex h-auto m-2 lg:m-4 lg:mx-10 flex-col">
      <div className="flex items-center justify-end m-2">
        <span className="font-bold">{selectLists?.length} / 40 questions</span>
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
        <div
          className={`flex flex-col overflow-x-auto  lg:overflow-y-auto ${
            currentQuestion ? `lg:w-[70%]` : `lg:w-full`
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
                      <th scope="col" className="px-6 py-4">
                        points
                      </th>
                      <th scope="col" className="px-6 py-4">
                        select
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions?.map((item, index) => (
                      <QuestionsRowSelect
                        setQuestions={setQuestions}
                        item={item}
                        key={index}
                        id={index+1}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {currentQuestion && (
          <div className="hidden lg:flex flex-1 space-y-2 flex-col bg-white p-3  h-full">
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
                    className=" w-full pl-2"
                    //value={item?.text}
                    placeholder={item?.text}
                  ></textarea>
                </div>
              ))}
            </div>
            {/* <div className="mt-10  h-[100px] flex items-center justify-center w-full">
              <button
                className="bg-green-500 inline-block text-white text-sm font-medium px-5 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md"
              >
                save modification
              </button>
            </div> */}
          </div>
        )}
      </div>
      <QuestionView />
    </div>
  );
}

export default QuestionsPage;

