"use client"
import React, {useState} from 'react'
import * as Icons from "@heroicons/react/24/outline";
import GetCookies from "../hooks/getCookies";
import { instance } from "../hooks/Axios";
import Tiptap from './TipTap';

function ModalUpdateEE({item, setSerie}) {
    const token = GetCookies("token");
    const currentSerie = GetCookies('serie')
    const [isLoading, setIsLoading] = useState(false);
    const [consigneTache1, setConsigneTache1] = useState(null);
    const [consigneTache2, setConsigneTache2] = useState(null);
    const [consigneTache3, setConsigneTache3] = useState(null);
    
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
    const updateQuestion = async() =>{ 
        setIsLoading(true)
       const result = await instance
         .patch(
           `/api/eeQuestion/questions/${item._id}`,
           {
             tasks: [
               {
                 libelle: item?.tasks[0]?.libelle,
                 numero: item?.tasks[0]?.numero,
                 consigne: consigneTache1 ? consigneTache1 : item?.tasks[0]?.consigne,
                 minWord: item?.tasks[0]?.minWord,
                 maxWord: item?.tasks[0]?.maxWord,
                 typeProduction: item?.tasks[0]?.typeProduction,
                 images: item?.tasks[0]?.images
               },
               {
                 libelle: item?.tasks[1]?.libelle,
                 numero: item?.tasks[1]?.numero,
                 consigne: consigneTache2 ? consigneTache2 : item?.tasks[1]?.consigne,
                 minWord: item?.tasks[1]?.minWord,
                 maxWord: item?.tasks[1]?.maxWord,
                 typeProduction: item?.tasks[1]?.typeProduction,
                 images: item?.tasks[1]?.images
               },
               {
                 libelle: item?.tasks[2]?.libelle,
                 numero: item?.tasks[2]?.numero,
                 consigne: consigneTache3 ? consigneTache3 : item?.tasks[2]?.consigne,
                 minWord: item?.tasks[2]?.minWord,
                 maxWord: item?.tasks[2]?.maxWord,
                 typeProduction: item?.tasks[2]?.typeProduction,
                 images: item?.tasks[2]?.images
               },
             ],
           },
           { headers: { Authorization: `basic ${token}` } }
         )
         .catch((err) => console.log(err));
         setIsLoading(false)
         if(result){
            alert("update sucess")
            handleClose();
            handleSerie()
         }
         else{
            alert("update failed")
         }
        
     }

     
     
     const handleClose = async() =>{ 
            const lightbox = document.querySelector("#lightbox");
            lightbox.classList.remove("scale-100");
            lightbox.classList.add("scale-0");
      }

  return (
    <section
      className="fixed  z-50 flex inset-0 w-full h-full dark:text-white flex-col  items-center justify-center transition-all duration-300 scale-0 overflow-y-auto"
      id="lightbox"
    >
      <div
        className="flex-col p-4 space-y-2   overflow-y-auto overflow-x-hidden  flex rounded-md bg-white dark:bg-gray-800 w-[70%]  h-auto    sm:p-0 shadow-lg shadow-black "
        id="lightbox-body"
      >
        <div className="flex justify-between items-center">
          <span className="text-xl sm:text-xl font-bold ">Question EE view</span>
          <Icons.XMarkIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => handleClose()}
          />
        </div>
        {
            <>
            <div key={item?.tasks[0]?.numero}>
                <span>Tache 1</span>
                <Tiptap comment={item?.tasks[0]?.consigne} setComment={setConsigneTache1} />
            </div>
             <div key={item?.tasks[1]?.numero}>
                <span>Tache 2</span>
                <Tiptap comment={item?.tasks[1]?.consigne} setComment={setConsigneTache2} />
            </div>
             <div key={item?.tasks[2]?.numero}>
                <span>Tache 3</span>
                <Tiptap comment={item?.tasks[2]?.consigne} setComment={setConsigneTache3} />
            </div>
            </>
        
        }
        
        <div className="flex items-center justify-end m-4">
          {!isLoading ? (
            <div className="">
              <button
                className=" d-grid px-6 text-white rounded-md py-1 bg-indigo-500 hover:bg-indigo-700"
                onClick={() => updateQuestion()}
              >
                update question EE
              </button>
            </div>
          ) : (
            <div className="mb-3">
              <button className="px-10 d-grid w-100 text-white flex items-center justify-center rounded-md py-1 bg-indigo-500 hover:bg-indigo-700">
                updating question 
                <div
                  class="spinner-border spinner-border-sm text-white"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ModalUpdateEE
