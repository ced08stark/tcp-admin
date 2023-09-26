"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import AddSerie from "../../../../components/AddSerie";
import GetCookies from "../../../../hooks/getCookies";
import { instance } from "../../../../hooks/Axios";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  setQuestion,
  selectQuestion,
  selectQuestionsSelect,
} from "../../../../featured/questionSlice";

import { UploadButton } from "@uploadthing/react";
import AudioPlayer from "../../../../components/AudioPlayer";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

const FileComponent = ({setImages, images, tache, setTache}) => {
  const [imageFile, setImageFile] = useState("");
  return (
    <div className="mt-2 bg-white flex items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
      <div className="text-center ">
        {imageFile == "" ? (
          <svg
            className="mx-auto h-12 w-12 text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clip-rule="evenodd"
            />
          </svg>
        ) : (
          <Image
            src={imageFile}
            className="w-full"
            alt="Phone image"
            width={300}
            height={300}
            priority
          />
        )}
        <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload a file</span>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res) {
                    setImageFile(res[0].fileUrl);
                    setImages([...images, res[0].fileUrl]);
                    setTache({ ...tache, images: [...tache.images, res[0].fileUrl] });
                    alert("Upload Completed");
                  }
                  // Do something with the respons
                }}
                onUploadError={(error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
          </label>
        </div>
      </div>
    </div>
  );
};



function AddQuestion() {
  const fileRef = useRef(null);
  const router = useRouter();
  const token = GetCookies("token");
  const [Imagesfiles, setImagesfiles] = useState([])
  const [Imagesfiles1, setImagesfiles1] = useState([])
  const [Imagesfiles2, setImagesfiles2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 
  const [suggestion1, setSuggestion1] = useState({
    text: null,
    isCorrect: false,
  });
  const [suggestion2, setSuggestion2] = useState({
    text: null,
    isCorrect: false,
  });
  const [suggestion3, setSuggestion3] = useState({
    text: null,
    isCorrect: false,
  });
  const [suggestion4, setSuggestion4] = useState({
    text: null,
    isCorrect: false,
  });

  const [category, setCategory] = useState({
    libelle: null,
    point: null,
    duree: null,
  });
  const [discipline, setDiscipline] = useState({
    libelle: null,
    duree: null,
  });
  const [question, setQuestion] = useState({
    numero: null,
    consigne: null,
    images: null,
    typeProduction: null
   
  });
  const [exist, setExist] = useState(false);
  const [questions, setQuestions] = useState([]);
  const currentQuestion = useSelector(selectQuestion);
  const selectLists = useSelector(selectQuestionsSelect);
  const [tache1, setTache1] = useState({
    libelle: 'tache 1',
    numero: 79,
    consigne: null,
    minWord: null,
    maxWord: null,
    typeProduction: null,
    images: []
  });
  const [tache2, setTache2] = useState({
    libelle: "tache 2",
    numero: 80,
    consigne: null,
    minWord: null,
    maxWord: null,
    typeProduction: null,
    images: [],
  });
  const [tache3, setTache3] = useState({
    libelle: "tache 3",
    numero: 81,
    consigne: null,
    minWord: null,
    maxWord: null,
    typeProduction: null,
    images: [],
  });
  const [currentSerie, setCurrentSerie] = useState({
    _id: null,
    libelle: null,
    questions: null,
    eeQuestions: null,
  });
  const [series, setSeries] = useState([]);
  const Add = async () => {
    let modal = document.querySelector("#lightbox");
    modal.classList.remove("scale-0");
  };
  const [check, setCheck] = useState(false);

  
  
  const addOtherFile = () =>{
        
        if(otherFiles?.length >= 3){
            alert('pas plus de 3 images')
        }
        else{
          setOtherFiles([
            ...otherFiles,
            // eslint-disable-next-line react/jsx-key
            <FileComponent
              images={Imagesfiles}
              setImages={setImagesfiles}
              tache={tache3}
              setTache={setTache3}
            />,
          ]);
        }
        
        
  }

  const addOtherFile1 = () => {
    if (otherFiles1?.length >= 3) {
      alert("pas plus de 3 images");
    } else {
      setOtherFiles1([
        ...otherFiles1,
        // eslint-disable-next-line react/jsx-key
        <FileComponent
          images={Imagesfiles1}
          tache={tache1}
          setTache={setTache1}
          setImages={setImagesfiles1}
        />,
      ]);
    }
  };

  const addOtherFile2 = () => {
    if (otherFiles2?.length >= 3) {
      alert("pas plus de 3 images");
    } else {
      setOtherFiles2([
        ...otherFiles2,
        // eslint-disable-next-line react/jsx-key
        <FileComponent images={Imagesfiles2} tache={tache2} setTache={setTache2} setImages={setImagesfiles2} />,
      ]);
    }
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
    }
  };
  const handleSelectSerie = (datas) => {
    setExist(false);
    if (datas != null) {
      for (var data of datas) {
        if (question?.numero == data?.numero) {
          setExist(true);
        }
      }
    }
  };

  const handleChangeNumber = (numero) => {
    setExist(false);
    setQuestion({...question, numero: numero})
    
    
    if (questions != null) {
      for (var data of questions) {
        if (numero == data?.numero) {
          setExist(true);
        }
      }
    }
  };

  const Update = async (tab) => {
    console.log(currentSerie);
    console.log(tab);
    setIsLoading(true);
    const data = await instance
      .patch(
        `/api/serie/series/${currentSerie._id}`,
        {
          libelle: currentSerie?.libelle,
          questions: currentSerie?.questions,
          eeQuestions: tab,
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
      alert("create question success");
      router.push("/questions");
    } else {
      alert("echec");
    }
  };

 

  const Created = async () => {
   
      setIsLoading(true);
      const data = await instance
        .post(
          "/api/eeQuestion/created",
          
          //formData
          {
            tasks: [tache1, tache2, tache3],
          },
          {
            headers: {
              Authorization: `basic ${token}`,
              /*"Content-type": "multipart/form-data",*/
            },
          }
        )
        .catch((err) => console.log(err));
      setIsLoading(false);

      if (data) {
        alert('add question success')
        let newTab = [];
        questions ? (newTab = questions) : (newTab = []);
        newTab.push(data?.data);
        Update(newTab);
      } else {
        
        alert("echec de creation de la question");
      }
    
  };

  const [image, setImage] = useState("");
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

   const [otherFiles, setOtherFiles] = useState([
     // eslint-disable-next-line react/jsx-key
     <FileComponent
       images={Imagesfiles}
       tache={tache3}
       setTache={setTache3}
       setImages={setImagesfiles}
     />,
   ]);
  
   const [otherFiles1, setOtherFiles1] = useState([
     // eslint-disable-next-line react/jsx-key
     <FileComponent
       images={Imagesfiles1}
       tache={tache1}
       setTache={setTache1}
       setImages={setImagesfiles1}
     />,
   ]);
   const [otherFiles2, setOtherFiles2] = useState([
     // eslint-disable-next-line react/jsx-key
     <FileComponent
       images={Imagesfiles2}
       tache={tache2}
       setTache={setTache2}
       setImages={setImagesfiles2}
     />,
   ]);

  

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <div className="flex h-auto m-1 lg:m-4 lg:mx-10 justify-center">
      <div className="flex flex-col w-full  lg:w-[80%]">
        <p className=" text-sm text-center text-gray-900 font-bold m-3">
          Create Expression Question Step
        </p>
        <fieldset className="border-2 border-solid border-r-0 border-b-0 space-y-2 border-gray-200 shadow-black shadow-lg  p-3">
          <legend className="text-sm  font-bold">
            Created & Posted question
          </legend>
          {/* <div>
            <fieldset className="border border-solid space-y-2 border-gray-600 p-3">
              <legend className="text-xs  font-bold">identification</legend>

              <div className="relative mb-3">
                <input
                  type="number"
                  min={80}
                  onChange={(e) => {
                    handleChangeNumber(parseInt(e.target.value));
                  }}
                  className="peer p-2 block min-h-[auto] bg-white w-1/2 lg:w-1/3 text-xs md:text-sm lg:text-base rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                  placeholder="entrer le numero de la question"
                />
              </div>
              {question?.numero ? (
                !exist ? (
                  <></>
                ) : (
                  <span className="text-red-500">
                    ce numero n{`'`}est pas valide pour la serie
                  </span>
                )
              ) : (
                <span></span>
              )}
            </fieldset>
          </div> */}

          <div>
            <fieldset className="border border-solid space-y-2 border-gray-600 p-3">
              <legend className="text-xs  font-bold">serie</legend>
              <div className="flex items-center space-x-2">
                <select
                  onChange={(e) => {
                    handleSelectSerie(JSON.parse(e.target.value)?.eeQuestions);
                    setQuestions(JSON.parse(e.target.value)?.eeQuestions);
                    setCurrentSerie(JSON.parse(e.target.value));
                  }}
                  id="hs-select-label"
                  className="py-2 px-4 pr-9 block flex-1 bg-white  rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                >
                  <option selected>Select serie</option>
                  {series?.map((item, index) => (
                    <option key={index} value={JSON.stringify(item)}>
                      {item?.libelle}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => Add()}
                  className="bg-green-500 inline-block text-white text-sm font-medium px-10 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md"
                >
                  nouvelle serie
                </button>
              </div>

              <fieldset className="w-full  border border-solid space-y-2 border-gray-600 p-3">
                <div className="flex w-full xs:flex-col md:flex-row">
                  <div className="w-1/3">
                    <legend className="text-xl  font-bold">Tache 1</legend>
                    <input
                      type="number"
                      min={80}
                      onChange={(e) => {
                        setTache1({
                          ...tache1,
                          minWord: parseInt(e.target.value),
                        });
                      }}
                      className="peer p-2 block min-h-[auto] bg-white mb-10  text-xs md:text-sm lg:text-base rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                      placeholder="mots minimuns"
                    />
                    <input
                      type="number"
                      min={80}
                      onChange={(e) => {
                        setTache1({
                          ...tache1,
                          maxWord: parseInt(e.target.value),
                        });
                      }}
                      className="peer p-2 block min-h-[auto] bg-white text-xs md:text-sm lg:text-base rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                      placeholder="mots maximums"
                    />
                  </div>
                  <div className=" mx-auto space-y-2 w-full">
                    <span>consigne tache 1</span>
                    <textarea
                      onChange={(e) =>
                        setTache1({ ...tache1, consigne: e.target.value })
                      }
                      className="w-full h-28 p-1 rounded-lg my-1"
                      placeholder="votre texte ici"
                    ></textarea>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    onChange={(e) => {
                      setTache1({
                        ...tache1,
                        typeProduction: e.target.value,
                      });
                    }}
                    id="hs-select-label"
                    className="py-2 px-4 pr-9 block flex-1 bg-white  rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  >
                    <option selected>Production type</option>
                    <option value="Paragraphe">Paragraphe</option>
                    <option value="Courriel">Courriel</option>
                    <option value="Lettre">Lettre</option>
                  </select>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  ></label>

                  {otherFiles1}
                  <div
                    className="w-full flex items-center justify-end "
                    onClick={() => addOtherFile1()}
                  >
                    <span className="px-2 py-1 rounded-md mt-2 bg-gray-900 text-white cursor-pointer">
                      autre image
                    </span>
                  </div>
                </div>
              </fieldset>
              <fieldset className="w-full  border border-solid space-y-2 border-gray-600 p-3">
                <div className="flex w-full xs:flex-col md:flex-row">
                  <div className="w-1/3">
                    <legend className="text-xl  font-bold">Tache 2</legend>
                    <input
                      type="number"
                      min={80}
                      onChange={(e) => {
                        setTache2({
                          ...tache2,
                          minWord: parseInt(e.target.value),
                        });
                      }}
                      className="peer p-2 block min-h-[auto] bg-white mb-10  text-xs md:text-sm lg:text-base rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                      placeholder="mots minimuns"
                    />
                    <input
                      type="number"
                      min={80}
                      onChange={(e) => {
                        setTache2({
                          ...tache2,
                          maxWord: parseInt(e.target.value),
                        });
                      }}
                      className="peer p-2 block min-h-[auto] bg-white text-xs md:text-sm lg:text-base rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                      placeholder="mots maximums"
                    />
                  </div>
                  <div className="xs:my-3 sm:my-0 mx-auto space-y-2 w-full">
                    <span>consigne tache 2</span>
                    <textarea
                      onChange={(e) =>
                        setTache2({ ...tache2, consigne: e.target.value })
                      }
                      className="w-full h-28 p-1 rounded-lg my-1"
                      placeholder="votre texte ici"
                    ></textarea>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    onChange={(e) => {
                      setTache2({
                        ...tache2,
                        typeProduction: e.target.value,
                      });
                    }}
                    id="hs-select-label"
                    className="py-2 px-4 pr-9 block flex-1 bg-white  rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  >
                    <option selected>Production type</option>
                    <option value="Paragraphe">Paragraphe</option>
                    <option value="Courriel">Courriel</option>
                    <option value="Lettre">Lettre</option>
                  </select>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  ></label>

                  {otherFiles2}
                  <div
                    className="w-full flex items-center justify-end "
                    onClick={() => addOtherFile2()}
                  >
                    <span className="px-2 py-1 rounded-md mt-2 bg-gray-900 text-white cursor-pointer">
                      autre image
                    </span>
                  </div>
                </div>
              </fieldset>
              <fieldset className="w-full border border-solid space-y-2 border-gray-600 p-3">
                <div className="flex w-full xs:flex-col md:flex-row">
                  <div className="w-1/3">
                    <legend className="text-xl  font-bold">Tache 3</legend>
                    <input
                      type="number"
                      min={80}
                      onChange={(e) => {
                        setTache3({
                          ...tache3,
                          minWord: parseInt(e.target.value),
                        });
                      }}
                      className="peer p-2 block min-h-[auto] bg-white mb-10  text-xs md:text-sm lg:text-base rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                      placeholder="mots minimuns"
                    />
                    <input
                      type="number"
                      min={80}
                      onChange={(e) => {
                        setTache3({
                          ...tache3,
                          maxWord: parseInt(e.target.value),
                        });
                      }}
                      className="peer p-2 block min-h-[auto] bg-white text-xs md:text-sm lg:text-base rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                      placeholder="mots maximums"
                    />
                  </div>
                  <div className="relative xs:my-3 sm:my-0 mx-auto space-y-2 w-full">
                    <span>consigne tache 3</span>
                    <textarea
                      onChange={(e) =>
                        setTache3({
                          ...tache3,
                          consigne: e.target.value,
                        })
                      }
                      className="w-full h-28 p-1 rounded-lg my-1"
                      placeholder="votre texte ici"
                    ></textarea>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    onChange={(e) => {
                      setTache3({
                        ...tache3,
                        typeProduction: e.target.value,
                      });
                    }}
                    id="hs-select-label"
                    className="py-2 px-4 pr-9 block flex-1 bg-white  rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  >
                    <option selected>Production type</option>
                    <option value="Paragraphe">Paragraphe</option>
                    <option value="Courriel">Courriel</option>
                    <option value="Lettre">Lettre</option>
                  </select>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  ></label>

                  {otherFiles}
                  <div
                    className="w-full flex items-center justify-end "
                    onClick={() => addOtherFile()}
                  >
                    <span className="px-2 py-1 rounded-md mt-2 bg-gray-900 text-white cursor-pointer">
                      autre image
                    </span>
                  </div>
                </div>
              </fieldset>
            </fieldset>
          </div>

          <div className="h-[80px] flex items-center justify-center w-full">
            {!isLoading ? (
              <button
                onClick={() => Created()}
                className="bg-green-500 inline-block text-white text-sm font-medium px-10 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md"
              >
                create question
              </button>
            ) : (
              <button
                disabled
                className="bg-green-500 flex items-center space-x-2 text-white text-sm font-medium px-10 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md"
              >
                <span>create question</span>
                <div
                  class="spinner-border spinner-border-sm text-white"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
            )}
          </div>
        </fieldset>
      </div>
      {<AddSerie setSeries={setSeries} series={series} />}
    </div>
  );
}

export default AddQuestion;
