import React, { useState } from "react";
import * as Icons from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { selectEEQuestion, setEEQuestion } from "../featured/questionSlice";
import GetCookies from "../hooks/getCookies";
import { instance } from "../hooks/Axios";


function QuestionsRowEE({ item,  serie, id }) {
  const token = GetCookies("token");
  const [isLoading, setIsLoading] = useState(false);
  const currentQuestion = useSelector(selectEEQuestion);
  const dispatch = useDispatch();

  const getQuestions = async () => {
    const data = await instance
      .get("/api/eeQuestion/questions", {
        headers: {
          Authorization: `basic ${token}`,
        },
      })
      .catch((err) => console.log(err.message));
    console.log(data);
    if (data) {
      alert(data?.data?.length)
      //setQuestions(data?.data);
    }
  };


  const handledelete = async () => {
    setIsLoading(true);
    const data = await instance
      .delete(`/api/eeQuestion/questions/${item._id}`, {
        headers: {
          Authorization: `basic ${token}`,
        },
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
    if (data) {
      Update();
      setEEQuestion({});
      
    } else {
      alert("delete question failed");
    }
  };

  const handleUpdate = async () => {
   let modal = document.querySelector("#lightbox");
   modal.classList.remove("scale-0");
  };

 const Update = async () => {
  const newTab = serie.eeQuestions.filter((i) => i._id != item._id)
   setIsLoading(true);
   const data = await instance
     .patch(
       `/api/serie/series/${serie._id}`,
       {
         libelle: serie.libelle,
         questions: serie.questions,
         eeQuestions: newTab,
         eoQuestions: serie.eoQuestions,
       },
       {
         headers: {
           Authorization: `basic ${token}`,
         },
       }
     )
     .catch((err) => console.log(err.message));
   setIsLoading(false);
   if (data) {
     alert("delete success");
     getQuestions();
   }
 };

  const show = async () => {
    dispatch(setEEQuestion({}));
    dispatch(
      setEEQuestion({
        ...currentQuestion,
        _id: item._id,
        tasks: item.tasks,
      })
    );
    let modal = document.querySelector("#lightbox");
    modal.classList.remove("scale-0");
  };

  return (
    <tr
      onClick={() => show()}
      className="even:bg-gray-100  border-b dark:border-neutral-500 transition duration-300 ease-in-out hover:even:bg-white hover:bg-neutral-100 cursor-pointer"
    >
      <td className="whitespace-nowrap px-6 py-4 font-medium">{id}</td>
      <td className="whitespace-nowrap px-6 py-4">{serie?.libelle}</td>
      <td className="whitespace-wrap   px-6 py-4 flex-col">
        <p> numero: {item?.tasks[0]?.numero}</p>
        <br />
        <p dangerouslySetInnerHTML={{ __html: item?.tasks[0]?.consigne }} />
        <br />
        <p> type production: {item?.tasks[0]?.typeProduction}</p>
        <br />
        <p>
          {" "}
          images:{" "}
          {!item?.tasks[0]?.images?.length
            ? "aucune image"
            : item?.tasks[0]?.images?.length}
        </p>
        <br />
        <p>
          min: {item?.tasks[0]?.minWord} | max: {item?.tasks[0]?.minWord}
        </p>
        <br />
      </td>
      <td className="whitespace-wrap  px-6 py-4 flex-col">
        <p> numero: {item?.tasks[1]?.numero}</p>
        <br />

        <p dangerouslySetInnerHTML={{ __html: item?.tasks[1]?.consigne }} />
        <br />
        <p> type production: {item?.tasks[1]?.typeProduction}</p>
        <br />
        <p>
          images:{" "}
          {!item?.tasks[1]?.images?.length
            ? "aucune image"
            : item?.tasks[1]?.images?.length}
        </p>
        <br />
        <p>
          min: {item?.tasks[1]?.minWord} | max: {item?.tasks[1]?.maxWord}
        </p>
        <br />
      </td>
      <td className="whitespace-wrap px-6 py-4 flex-col">
        <p> numero: {item?.tasks[2]?.numero}</p>
        <br />
        <p dangerouslySetInnerHTML={{ __html: item?.tasks[2]?.consigne }} />
        <br />
        <p> type production: {item?.tasks[2]?.typeProduction}</p>
        <br />
        <p>
          {" "}
          images:{" "}
          {!item?.tasks[2]?.images?.length
            ? "aucune image"
            : item?.tasks[2]?.images?.length}
        </p>
        <br />
        <p>
          min: {item?.tasks[2]?.minWord} | max: {item?.tasks[2]?.maxWord}
        </p>
        <br />
      </td>
      <td className="whitespace-nowrap space-x-2 px-6 py-4">
        <button
          onClick={() => handleUpdate()}
          className="bg-indigo-500 inline-block text-white text-sm font-medium px-2 py-2 cursor-pointer border-0 shadow-sm shadow-black/40 uppercase relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none"
        >
          <Icons.PencilSquareIcon className="w-4 h-4" />
        </button>
        {!isLoading ? (
          <button
            onClick={() => handledelete()}
            className="bg-red-500 inline-block text-white text-sm font-medium px-2 py-2 cursor-pointer border-0 shadow-sm shadow-black/40 uppercase relative 
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
      </td>
    </tr>
  );
}

export default QuestionsRowEE;
