import React, {useState} from 'react'
import * as Icons from "@heroicons/react/24/outline"
import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from "../featured/questionSlice";
import GetCookies from "../hooks/getCookies";
import { instance } from "../hooks/Axios";

function QuestionsRows({item, setQuestions, id}) {
  const token = GetCookies("token");
  const [isLoading, setIsLoading] = useState(false);

  const getQuestions = async() =>{

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
  
  const handledelete = async() =>{
    setIsLoading(true);
    const data = await instance
      .delete(
        `/api/question/questions/${item._id}`,
        {
          headers: {
            Authorization: `basic ${token}`,
            
          },
        }
      )
      .catch((err) => console.log(err));
    setIsLoading(false);
    if(data){
      setQuestion({})
      getQuestions()
      alert('delete question success')
    }
    else{
      alert('delete question failed')
    }
  }
  const show = async () => {
    dispatch(setQuestion(item));
    let modal = document.querySelector("#lightbox");
    modal.classList.remove("scale-0");
  };
  const dispatch = useDispatch();
  return (
    <tr
      onClick={() => show()}
      className="even:bg-gray-100 border-b dark:border-neutral-500 transition duration-300 ease-in-out hover:even:bg-white hover:bg-neutral-100 cursor-pointer"
    >
      <td className="whitespace-nowrap px-6 py-4 font-medium">{id}</td>
      <td className="whitespace-nowrap px-6 py-4">{item?.consigne}</td>
      <td className="whitespace-nowrap px-6 py-4">
        {item?.categorie?.libelle}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {item?.discipline?.libelle}
      </td>
      <td className="whitespace-nowrap px-6 py-4">{item?.duree} min</td>
      <td className="whitespace-nowrap px-6 py-4">
        {item?.categorie?.point} points
      </td>
      <td className="whitespace-nowrap px-6 py-4">
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

export default QuestionsRows
