import React, {useState} from 'react'
import * as Icons from "@heroicons/react/24/outline"
import GetCookies from "../hooks/getCookies";
import { instance } from "../hooks/Axios";

function AddSerie(props) {
    const token = GetCookies('token')
    const [isLoading, setIsLoading] = useState(false);
    const [serie, setSerie] = useState({
        numero: ""
    });
    const close = () => {
      const lightbox = document.querySelector("#lightbox");
      lightbox.classList.remove("scale-100");
      lightbox.classList.add("scale-0");
      setSerie({...serie, numero: ""})
    };
    const Created = async() =>{
      setIsLoading(true);
      const data = await instance
        .post(
          "/api/serie/created",
          {
            libelle: serie.numero,
            questions: null,
          },
          {
            headers: {
              Authorization: `basic ${token}`,
            },
          }
        )
        .catch((err) => console.log(err.message));
        setIsLoading(false);
        if(data){
            props.setSeries([...props.series, serie])
            close()
        }
        else{
            alert("echec")
        }
  }
  return (
    <section
      className="fixed z-50  inset-0 w-full h-full dark:text-white flex-col   flex items-center justify-center transition-all duration-300 scale-0"
      id="lightbox"
    >
      <div
        className="flex-col space-y-2  flex rounded-md bg-white dark:bg-gray-800 w-[90%]  sm:w-1/2 h-auto    sm:p-0 shadow-lg shadow-black "
        id="lightbox-body"
      >
        <div className="flex justify-between items-center p-4">
          <span className="text-xl sm:text-xl font-bold ">Create Serie</span>
          <Icons.XMarkIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => close()}
          />
        </div>

        <div className="flex px-4 space-x-2 items-center">
          <span className="font-bold text-xl">numero</span>
          <input type="text" onChange={(e)=>setSerie({...serie, numero: e.target.value})} value={serie.numero} className="w-full outline-none bg-gray-100 rounded-md p-2 px-2" placeholder='enter serie number' />
        </div>

        <div className="flex items-center justify-end m-4">
          {!isLoading ? (
            <div className="">
              <button
                className=" d-grid px-6 text-white rounded-md py-1 bg-indigo-500 hover:bg-indigo-700"
                onClick={() => Created()}
              >
                create serie
              </button>
            </div>
          ) : (
            <div className="mb-3">
              <button className="px-10 d-grid w-100 text-white flex items-center justify-center rounded-md py-1 bg-indigo-500 hover:bg-indigo-700">
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

export default AddSerie
