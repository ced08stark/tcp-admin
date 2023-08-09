"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddSerie from "../../../components/AddSerie";
import GetCookies from "../../../hooks/getCookies";
import { instance } from "../../../hooks/Axios";


function AddQuestion() {
  const fileRef = useRef(null);
  const router = useRouter();
  const token = GetCookies("token");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState({
    suggestion1: { text: null, isCorrect: false },
    suggestion2: { text: null, isCorrect: false },
    suggestion3: { text: null, isCorrect: false },
    suggestion4: { text: null, isCorrect: true },
  });
  let point = null
  let duree = null;
  const [question, setQuestion] = useState({
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
  const Created = async () => {
    switch (question?.discipline.libelle) {
      case "Comprehension Ecrite":
        duree = 40
        break;
      case "Comprehension Orale":
        duree = 15;
        break;
      case "Expression Orale":
        duree = 30;
        break;
      case "Expression Ecrite":
        duree = 30;
        break;

      default:
        break;
    }
    switch (question?.categorie.libelle) {
      case "A1":
        point = 5;
        break;
      case "A2":
        point = 10;
        break;
      case "B1":
        point = 15;
        break;
      case "B2":
       point = 20;
        break;
      case "A1":
        point = 25;
        break;
      case "A2":
        point = 30;
        break;

      default:
        break;
    }
    let s = [
      suggestion.suggestion1,
      suggestion.suggestion2,
      suggestion.suggestion3,
      suggestion.suggestion4,
    ];
    const formData = new FormData();
    formData.append("consigne", question?.consigne);
    formData.append("files", question?.libelle);
    // for (var i = 0; i < s.length; i++) {
    //   formData.append("suggestions", {
    //     text: s[i].text,
    //     isCorrect: s[i].isCorrect,
    //   });
    // }
    formData.append("suggestions[0][text]", s[0].text);
    formData.append("suggestions[0][isCorrect]", s[0].isCorrect);
    formData.append("suggestions[1][text]", s[1].text);
    formData.append("suggestions[1][isCorrect]", s[1].isCorrect);
    formData.append("suggestions[2][text]", s[2].text);
    formData.append("suggestions[2][isCorrect]", s[2].isCorrect);
    formData.append("suggestions[3][text]", s[3].text);
    formData.append("suggestions[3][isCorrect]", s[3].isCorrect);
    formData.append("categorie[libelle]", question?.categorie?.libelle);
    formData.append("categorie[point]", point);
    formData.append("discipline[libelle]", question?.discipline?.libelle);
    formData.append("discipline[duree]", duree);

    //formData.append('suggestions', JSON.stringify(s));
    //formData.append("discipline", question?.discipline);
    // for (var key in question?.discipline) {
    //   if (question?.discipline.hasOwnProperty(key)) {
    //     formData.append(key, question?.discipline[key]);
    //   }
    // }
    // for (var key in question?.categorie) {
    //   if (question?.categorie.hasOwnProperty(key)) {
    //     formData.append(key, question?.categorie[key]);
    //   }
    // }

    //formData.append("categorie", question?.categorie);
    formData.append("duree", question?.duree);
    setIsLoading(true);
    const data = await instance
      .post(
        "/api/question/created",
        formData,
        {
          headers: {
            Authorization: `basic ${token}`,
            "Content-type": "multipart/form-data",
          },
        }
      )
      .catch((err) => console.log(err));
    setIsLoading(false);
    if (data) {
      
      alert('add question success')
      router.back()
    } else {
      console.log(formData)
      alert("echec");
    }
  };

  

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
              <legend className="text-xs  font-bold">consigne</legend>

              <div className="relative mb-3">
                <input
                  type="text"
                  onChange={(e) => {
                    setQuestion({ ...question, consigne: e.target.value });
                  }}
                  className="peer p-2 block min-h-[auto] bg-white w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
                  placeholder="entrer la consigne"
                  
                />
              </div>
              <div className="flex space-x-4">
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
              </div>
            </fieldset>
          </div>

          <div>
            <fieldset className="border border-solid space-y-2 border-gray-600 p-3">
              <legend className="text-xs  font-bold">Upload file</legend>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                ></label>
                <div className="mt-2 bg-white flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
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
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
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
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB Or mp4 file
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div>
            <fieldset className="border border-solid space-y-2 border-gray-600 p-3">
              <legend className="text-xs font-bold">suggestions</legend>

              <div className="flex space-x-4">
                <div className="relative mb-3 w-full">
                  <textarea
                    onChange={(e) =>
                      setSuggestion({
                        ...suggestion,
                        suggestion1: { text: e.target.value, isCorrect: false },
                      })
                    }
                    className="bg-white peer block min-h-[auto] w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none "
                    rows="2"
                    placeholder="reponse 1"
                  ></textarea>
                </div>
                <div className="relative w-full mb-3">
                  <textarea
                    onChange={(e) =>
                      setSuggestion({
                        ...suggestion,
                        suggestion2: { text: e.target.value, isCorrect: false },
                      })
                    }
                    className="bg-white peer block min-h-[auto] w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none "
                    id="exampleFormControlTextarea1"
                    rows="2"
                    placeholder="Reponse 2"
                  ></textarea>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="relative mb-3 w-full">
                  <textarea
                    onChange={(e) =>
                      setSuggestion({
                        ...suggestion,
                        suggestion3: { text: e.target.value, isCorrect: false },
                      })
                    }
                    className="bg-white peer block min-h-[auto] w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none "
                    id="exampleFormControlTextarea1"
                    rows="2"
                    placeholder="reponse 3"
                  ></textarea>
                </div>
                <div className="relative w-full mb-3">
                  <textarea
                    onChange={(e) =>
                      setSuggestion({
                        ...suggestion,
                        suggestion4: { text: e.target.value, isCorrect: true },
                      })
                    }
                    className="bg-white peer block min-h-[auto] w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none "
                    id="exampleFormControlTextarea1"
                    rows="2"
                    placeholder="reponse juste ici"
                  ></textarea>
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
      
    </div>
  );
}

export default AddQuestion;
