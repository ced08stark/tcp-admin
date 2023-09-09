"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import AddSerie from "../../../components/AddSerie";
import GetCookies from "../../../hooks/getCookies";
import { instance } from "../../../hooks/Axios";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  setQuestion,
  selectQuestion,
  selectQuestionsSelect,
} from "../../../featured/questionSlice";

import { UploadButton } from "@uploadthing/react";
import AudioPlayer from "../../../components/AudioPlayer";



// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";



function AddQuestion() {
  const fileRef = useRef(null);
  const router = useRouter();
  const token = GetCookies("token");
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
      duree: null
  });
  const [discipline, setDiscipline] = useState({
    libelle: null,
    duree: null,
  });
  const [question, setQuestion] = useState({
    numero: null,
    consigne: null,
    libelle: null,
    discipline: {
      libelle: null,
      duree: null
    },
    categorie: {
        libelle: null,
        point: null
    },
    suggestions: [],
    duree: 3,
  });
  const [exist, setExist] = useState(false);
  const [questions, setQuestions] = useState([]);
  const currentQuestion = useSelector(selectQuestion);
  const selectLists = useSelector(selectQuestionsSelect);
  const [currentSerie, setCurrentSerie] = useState({
    _id: null,
    libelle: null,
    questions: null
  })
  const [series, setSeries] = useState([]);
  const Add = async () => {
    let modal = document.querySelector("#lightbox");
    modal.classList.remove("scale-0");
  };
  const [check, setCheck] = useState(false)

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
  const handleSelectSerie = (datas)=>{
    setExist(false);
        if(datas != null){
            for (var data of datas) {
              if (question?.numero == data?.numero) {
                setExist(true);
              }
            }
        }
        
  }
  const handleChangeNumber = (numero)=>{
    setExist(false);
     if (numero > 0 && numero < 40) {
       setDiscipline({ ...discipline, libelle: "Comprehension Orale" });
     } else if (numero > 39 && numero < 80) {
       setDiscipline({ ...discipline, libelle: "Comprehension Ecrite" });
     } else if (numero > 79 && numero < 90) {
       setDiscipline({ ...discipline, libelle: "Expression Orale" });
     } else if (numero > 89 && numero < 100)  {
       setDiscipline({ ...discipline, libelle: "Expression Ecrite" });
     } else {
       setDiscipline({ ...discipline, libelle: null });
     }

    if ((numero > 0 && numero < 5) || (numero > 39 && numero < 45)) {
      setCategory({ ...category, libelle: "A1", duree: 15, point: 3 });
    }
    else if ((numero > 4 && numero < 11) || (numero > 44 && numero < 51)) {
      setCategory({ ...category, libelle: "A2", duree: 30, point: 9 });
    } else if ((numero > 10 && numero < 20) || (numero > 50 && numero < 60)) {
      setCategory({ ...category, libelle: "B1", duree: 45, point: 15 });
    } else if ((numero > 19 && numero < 26) || (numero > 59 && numero < 66)) {
      setCategory({ ...category, libelle: "B2", duree: 90, point: 21 });
    } else if ((numero > 25 && numero < 30) || (numero > 65 && numero < 70)) {
      setCategory({ ...category, libelle: "B2", duree: 120, point: 21 });
    } else if ((numero > 29 && numero < 36) || (numero > 69 && numero < 76)) {
      setCategory({ ...category, libelle: "C1", duree: 150, point: 26 });
    } else if ((numero > 35 && numero < 40) || (numero > 75 && numero < 80)) {
      setCategory({ ...category, libelle: "C2", duree: 180, point: 33 });
    } else {
      setCategory({ ...category, libelle: null });
    }
    setQuestion({...question, numero: numero})
   

    if(questions != null){
        for (var data of questions) {
          if (numero == data?.numero) {
            setExist(true);
          }
        }
    }
      
    
  }

  const Update = async (tab) => {
    console.log(currentSerie)
    console.log(tab)
    setIsLoading(true);
    const data = await instance
      .patch(
        `/api/serie/series/${currentSerie._id}`,
        {
          libelle: currentSerie?.libelle,
          questions: tab,
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
      router.push("/dashboard");
    }
    else{
      alert('echec')
    }
    
  };


  const selectResponse = (id) =>{
      setCheck(true)
      setSuggestion1({
        ...suggestion1,
        isCorrect: false,
      });
      setSuggestion2({
        ...suggestion2,
        isCorrect: false,
      });
      setSuggestion3({
        ...suggestion3,
        isCorrect: false,
      });
      setSuggestion4({
        ...suggestion4,
        isCorrect: false,
      });
      if(id == 1){
          setSuggestion1({
            ...suggestion1,
             isCorrect: true 
          });
      }
      else if(id == 2){
          setSuggestion2({
            ...suggestion2,
            isCorrect: true
          });
      }
      else if(id == 3){
          setSuggestion3({
            ...suggestion3,
            isCorrect: true
          });
      }
      else{
        setSuggestion4({
          ...suggestion4,
          isCorrect: true
        });
      }
  }

  const Created = async () => {
    //console.log(currentQuestion)
    if(!check){
        alert('veuillez selectionner la bonne reponse')
    }
    else{
    const formData = new FormData();
    formData.append("numero", question?.numero);
    formData.append("consigne", question?.consigne);
    //formData.append("files", question?.libelle);
    formData.append("libelle", currentQuestion?.libelle);
    formData.append("suggestions[0][text]", suggestion1.text);
    formData.append("suggestions[0][isCorrect]", suggestion1.isCorrect);
    formData.append("suggestions[1][text]", suggestion2.text);
    formData.append("suggestions[1][isCorrect]", suggestion2.isCorrect);
    formData.append("suggestions[2][text]", suggestion3.text);
    formData.append("suggestions[2][isCorrect]", suggestion3.isCorrect);
    formData.append("suggestions[3][text]", suggestion4.text);
    formData.append("suggestions[3][isCorrect]", suggestion4.isCorrect);
    formData.append("categorie[libelle]", category?.libelle);
    formData.append("categorie[point]", category?.point);
    formData.append("discipline[libelle]", discipline?.libelle);
    formData.append("discipline[duree]", category?.duree);
    formData.append("duree", question?.duree);
    console.log(image)
    setIsLoading(true);
    const data = await instance
      .post(
        "/api/question/created",
        //formData
        {
          numero: question?.numero,
          consigne: question?.consigne,
          libelle: image,
          discipline: {
            libelle: discipline?.libelle,
            duree: category?.duree,
          },
          categorie: {
            libelle: category?.libelle,
            point: category?.point,
          },
          suggestions: [
            suggestion1, suggestion2, suggestion3, suggestion4
          ],
          duree: question?.duree,
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
     
      let newTab = []
      questions ? newTab = questions : newTab = []
      newTab.push(data?.data)
      
      Update(newTab)
    } else {
      console.log(formData)
      alert("echec de creation de la question");
    }
  }
  };

  const [image, setImage] = useState('')
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);
 
  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //  // accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  // });
 
  // const { startUpload } = useUploadThing("mediaPost", {
  //   onClientUploadComplete: () => {
  //     alert("uploaded successfully!");
  //   },
  //   onUploadError: () => {
  //     alert("error occurred while uploading");
  //   },
  // });

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };



 useEffect(() => {
    getSeries();
  }, []);

  

  return (
    <div className="flex h-auto m-1 lg:m-4 lg:mx-10 justify-center">
      <div className="flex flex-col w-full  lg:w-[80%]">
        <p className=" text-sm text-center text-gray-900 font-bold m-3">
          Create Question Step
        </p>
        <fieldset className="border-2 border-solid border-r-0 border-b-0 space-y-2 border-gray-200 shadow-black shadow-lg  p-3">
          <legend className="text-sm  font-bold">
            Created & Posted question
          </legend>
          <div>
            <fieldset className="border border-solid space-y-2 border-gray-600 p-3">
              <legend className="text-xs  font-bold">identification</legend>

              <div className="relative mb-3">
                <input
                  type="number"
                  min={1}
                  onChange={(e) => {
                    handleChangeNumber(parseInt(e.target.value));
                  }}
                  className="peer p-2 block min-h-[auto] bg-white w-1/2 lg:w-1/3 text-xs md:text-sm lg:text-base rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                  placeholder="entrer le numero de la question"
                />
              </div>
              {question?.numero ? (
                category?.libelle && !exist ? (
                  <>
                    <div className="flex space-x-4">
                      <input
                        disabled
                        type="text"
                        value={discipline?.libelle}
                        className="peer p-2 block min-h-[auto] bg-white w-full text-xs md:text-sm lg:text-base rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                        placeholder="entrer le numero de la question"
                      />
                      <input
                        disabled
                        type="text"
                        value={category?.libelle}
                        className="peer p-2 block min-h-[auto] bg-white w-full text-xs md:text-sm lg:text-base rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                        placeholder="entrer le numero de la question"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <input
                        disabled
                        type="text"
                        value={`${category?.duree} secondes`}
                        className="peer p-2 block min-h-[auto] bg-white w-full text-xs md:text-sm lg:text-base rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                        placeholder="entrer le numero de la question"
                      />
                      <input
                        disabled
                        type="text"
                        value={`${category?.point} points`}
                        className="peer p-2 block min-h-[auto] bg-white w-full text-xs md:text-sm lg:text-base rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                        placeholder="entrer le numero de la question"
                      />
                    </div>
                  </>
                ) : (
                  <span className="text-red-500">
                    ce numero n{`'`}est pas valide pour la serie
                  </span>
                )
              ) : (
                <span></span>
              )}
            </fieldset>
          </div>
          <div>
            <fieldset className="border border-solid space-y-2 border-gray-600 p-3">
              <legend className="text-xs  font-bold">serie</legend>
              <div className="flex items-center space-x-2">
                <select
                  onChange={(e) => {
                    handleSelectSerie(JSON.parse(e.target.value)?.questions);
                    setQuestions(JSON.parse(e.target.value)?.questions);
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
              <legend className="text-xs  font-bold">consigne</legend>
              <div className="relative mb-3 mx-auto space-y-2 w-full ">
                {question?.consigne ? (
                  <div className="w-full  justify-center flex items-center">
                    <AudioPlayer url={question?.consigne} />
                  </div>
                ) : (
                  <></>
                )}
                {discipline?.libelle == null ||
                discipline?.libelle == "Comprehension Ecrite" ? (
                  <input
                    type="text"
                    onChange={(e) => {
                      setQuestion({ ...question, consigne: e.target.value });
                    }}
                    className="peer p-2 block min-h-[auto] bg-white w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                    placeholder="entrer la consigne"
                  />
                ) : (
                  <UploadButton
                    endpoint="mediaPost"
                    onClientUploadComplete={(res) => {
                      if (res) {
                        setQuestion({ ...question, consigne: res[0].fileUrl });
                        alert("Upload Completed");
                      }
                      // Do something with the response
                    }}
                    onUploadError={(error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                )}
                {/* <input
                  type="text"
                  onChange={(e) => {
                    setQuestion({ ...question, consigne: e.target.value });
                  }}
                  className="peer p-2 block min-h-[auto] bg-white w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                  placeholder="entrer la consigne"
                /> */}
              </div>

              {/* <div className="flex space-x-4">
                <select
                  onChange={(e) => {
                    setQuestion({
                      ...question,
                      categorie: {
                        libelle: e.target.value,
                      },
                    });
                  }}
                  id="hs-select-label"
                  className="py-3 px-4 pr-9 block w-full bg-white  rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                >
                  <option selected>Select categorie</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
                <select
                  onChange={(e) => {
                    setQuestion({
                      ...question,
                      discipline: {
                        libelle: e.target.value,
                      },
                    });
                  }}
                  id="hs-select-label"
                  className="py-3 px-4 pr-9 block w-full bg-white  rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                >
                  <option selected>Select discipline</option>
                  <option value="Comprehension Ecrite">
                    Comprehension Ecrite
                  </option>
                  <option value="Comprehension Orale">
                    Comprehension Orale
                  </option>
                  <option value="Expression Ecrite">Expression Ecrite</option>
                  <option value="Expression Orale">Expression Orale</option>
                </select>
              </div> */}
              <legend className="text-xs  font-bold">upload file</legend>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                ></label>
                <div className="mt-2 bg-white flex items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center ">
                    {image == '' ? (
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
                        src={image}
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
                        {discipline?.libelle == null ||
                        discipline?.libelle == "Comprehension Ecrite" ? (
                          <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              if (res) {
                                setImage(res[0].fileUrl);
                                alert("Upload Completed");
                              }
                              // Do something with the respons
                            }}
                            onUploadError={(error) => {
                              // Do something with the error.
                              alert(`ERROR! ${error.message}`);
                            }}
                          />
                        ) : (
                          <UploadButton
                            endpoint="mediaPost"
                            onClientUploadComplete={(res) => {
                              if (res) {
                                setImage(res[0].fileUrl);
                                alert("Upload Completed");
                              }
                              // Do something with the response
                            }}
                            onUploadError={(error) => {
                              // Do something with the error.
                              alert(`ERROR! ${error.message}`);
                            }}
                          />
                        )}

                        {/* <input type="file" {...getInputProps} /> */}
                        {/* <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          ref={fileRef}
                          onChange={() =>
                            setQuestion({
                              ...question,
                              libelle: fileRef.current.files[0],
                            })
                          }
                        /> */}
                      </label>
                      {/* <p className="pl-1">or drag and drop</p> */}
                    </div>
                    {/* <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB Or mp4 file
                    </p> */}
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div>
            <fieldset className="border border-solid space-y-2 border-gray-600 p-3">
              <legend className="text-xs font-bold">suggestions</legend>

              <div className="flex space-x-4">
                <div className="relative  w-full mb-3">
                  <textarea
                    onChange={(e) =>
                      setSuggestion1({
                        ...suggestion1,
                        text: e.target.value,
                      })
                    }
                    className="bg-white peer block min-h-[auto] w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none "
                    id="exampleFormControlTextarea1"
                    rows="2"
                    placeholder="reponse 1 ici"
                  ></textarea>
                  <input
                    onClick={() => selectResponse(1)}
                    className="absolute bottom-0 right-0 "
                    type="radio"
                    name="suggestion"
                    //value={true}
                    id="reponse1"
                  />
                </div>
                <div className="relative  w-full mb-3">
                  <textarea
                    onChange={(e) =>
                      setSuggestion2({
                        ...suggestion2,
                        text: e.target.value,
                      })
                    }
                    className="bg-white peer block min-h-[auto] w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none "
                    id="exampleFormControlTextarea1"
                    rows="2"
                    placeholder="reponse 2 ici"
                  ></textarea>
                  <input
                    onClick={() => selectResponse(2)}
                    className="absolute bottom-0 right-0 "
                    type="radio"
                    name="suggestion"
                    //value={true}
                    //checked={true}
                    id="reponse2"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="relative  w-full mb-3">
                  <textarea
                    onChange={(e) =>
                      setSuggestion3({
                        ...suggestion3,
                        text: e.target.value,
                      })
                    }
                    className="bg-white peer block min-h-[auto] w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none "
                    id="exampleFormControlTextarea1"
                    rows="2"
                    placeholder="reponse 3 ici"
                  ></textarea>
                  <input
                    onClick={() => selectResponse(3)}
                    className="absolute bottom-0 right-0 "
                    type="radio"
                    name="suggestion"
                    //value={true}
                    //checked={true}
                    id="reponse3"
                  />
                </div>
                <div className="relative  w-full mb-3">
                  <textarea
                    onChange={(e) =>
                      setSuggestion4({
                        ...suggestion4,
                        text: e.target.value,
                      })
                    }
                    className="bg-white peer block min-h-[auto] w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none "
                    id="exampleFormControlTextarea1"
                    rows="2"
                    placeholder="reponse 4 ici"
                  ></textarea>
                  <input
                    onClick={() => selectResponse(4)}
                    className="absolute bottom-0 right-0 "
                    type="radio"
                    name="suggestion"
                    //value={true}
                    //checked={true}
                    id="reponse4"
                  />
                </div>
              </div>
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
