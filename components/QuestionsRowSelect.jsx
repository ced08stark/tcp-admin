import React, { useState, useEffect } from "react";
import * as Icons from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion, setQuestionsSelect, selectQuestionsSelect } from "../featured/questionSlice";
import GetCookies from "../hooks/getCookies";
import { instance } from "../hooks/Axios";
import { selectSerie } from "../featured/serieSlice";


let newtab = [];
function QuestionsRowSelect({item, id}) {
  const dispatch = useDispatch()
  const [isCheck, setIsCheck] = useState(false);
  const serie = useSelector(selectSerie)
  const selectList = useSelector(selectQuestionsSelect);
  
  const checkRow = () =>{
    for (let i = 0; i < serie?.questions?.length; i++) {
      if (serie?.questions[i]?._id == item?._id) {
        setIsCheck(true);
      }
    }
  }

  const selectQuestion =()=>{
    if(isCheck){
        setIsCheck(false)
       newtab = selectList?.filter((i) => i._id != item._id)
      dispatch(setQuestionsSelect(newtab))
    }else{
        setIsCheck(true)
        selectList?.length > 0
          ? dispatch(setQuestionsSelect([...selectList, item]))
          : dispatch(setQuestionsSelect([item]));
        
    }
    //console.log(question)
    console.log(selectList)
  }

  useEffect(()=>{
    checkRow()
  }, [])
  //checkRow()

  const show = async () => {
    dispatch(setQuestion(item));
    let modal = document.querySelector("#lightbox");
    modal.classList.remove("scale-0");
  };
  
  
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
        {item?.categorie?.point} point
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="mb-[0.125rem] flex items-center justify-center min-h-[1.5rem] pl-[1.5rem] w-full">
          <input
            onClick={() => selectQuestion()}
            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-blue-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-blue-500 dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            type="checkbox"
            //value={true}
            checked={isCheck}
            id="exampleCheck3"
          />
        </div>
      </td>
    </tr>
  );
}

export default QuestionsRowSelect;
