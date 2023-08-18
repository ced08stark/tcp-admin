"use client";
import QuestionsRows from "../../components/QuestionsRows";
import React, {useState, useEffect, useRef} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SerieComponent from "../../components/SerieComponent";
import AddSerie from "../../components/AddSerie";
import GetCookies from "../../hooks/getCookies";
import { instance, baseUrlImg } from "../../hooks/Axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestion,
  selectQuestion,
  selectQuestionsSelect,
} from "../../featured/questionSlice";
import QuestionView from "../../components/QuestionView";
import * as Icons from "@heroicons/react/24/outline"
import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";


function QuestionsPage() {
  //const fileRef = useRef(null);
  const router = useRouter();
  const token = GetCookies("token");
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    name: 'consigne',
    value: ''
  })
  
   
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();
  const currentQuestion = useSelector(selectQuestion);
  const [suggestions2, setSuggestions2] = useState([]);
  const [image, setImage] = useState("null")
  const handleUpdate = async() =>{
    console.log(currentQuestion)
    // dispatch(
    //   setQuestion({
    //     ...currentQuestion,
        // libelle: currentQuestion.libelle,
        // consigne: currentQuestion.consigne,
        // numero: currentQuestion.numero,
        // categorie: currentQuestion.categorie,
        // discipline: currentQuestion.discipline,
        // duree: currentQuestion.duree,
        // suggestion1: suggestion1?.text
        //   ? suggestion1
        //   : currentQuestion.suggestions[0],
        // suggestion2: suggestion2?.text
        //   ? suggestion2
        //   : currentQuestion.suggestions[1],
        // suggestion3: suggestion3?.text
        //   ? suggestion3
        //   : currentQuestion.suggestions[2],
        // suggestion4: suggestion4?.text
        //   ? suggestion4
        //   : currentQuestion.suggestions[3],
    //   })
    // );
    const formData = new FormData();
    console.log(currentQuestion)
    /*console.log(suggestions?.length)
    formData.append("numero", currentQuestion?.numero);
    formData.append("consigne", question?.consigne);
    formData.append("files", question?.libelle);
    formData.append(
      "suggestions[0][text]",
      suggestions[0]?.text ? suggestions[0]?.text : suggestions2[0].text
    );
    formData.append(
      "suggestions[0][isCorrect]",
      suggestions[0]?.isCorrect ? suggestions[0]?.isCorrect : suggestions2[0].isCorrect
    );
    formData.append(
      "suggestions[1][text]",
      suggestions[1]?.text ? suggestions[1]?.text : suggestions2[1].text
    );
    formData.append(
      "suggestions[1][isCorrect]",
      suggestions[1]?.isCorrect ? suggestions[1]?.isCorrect : suggestions2[1].isCorrect
    );
    formData.append(
      "suggestions[2][text]",
      suggestions[2]?.text ? suggestions[2]?.text : suggestions2[2].text
    );
    formData.append(
      "suggestions[2][isCorrect]",
      suggestions[2]?.isCorrect ? suggestions[2]?.isCorrect : suggestions2[2].isCorrect
    );
    formData.append("suggestions[3][text]", suggestions[3]?.text ? suggestions[3]?.text : suggestions2[3].text);
    formData.append(
      "suggestions[3][isCorrect]",
      suggestions[3]?.isCorrect ? suggestions[3]?.isCorrect : suggestions2[3].isCorrect
    );
    formData.append("categorie[libelle]", currentQuestion?.categorie?.libelle);
    formData.append("categorie[point]", currentQuestion?.categorie?.point);
    formData.append("discipline[libelle]", currentQuestion?.discipline?.libelle);
    formData.append("discipline[duree]", currentQuestion?.discipline?.duree);
    formData.append("duree", currentQuestion?.duree);*/
    setIsLoading(true);
    const data = await instance
      .patch(
        `/api/question/questions/${currentQuestion?._id}`,
        {
          libelle: image != "null" ? image : currentQuestion.libelle,
          consigne: currentQuestion.consigne,
          numero: currentQuestion.numero,
          categorie: currentQuestion.categorie,
          discipline: currentQuestion.discipline,
          duree: currentQuestion.duree,
          suggestions: [suggestion1?.text
            ? suggestion1
            : currentQuestion.suggestions[0],
           suggestion2?.text
            ? suggestion2
            : currentQuestion.suggestions[1],
           suggestion3?.text
            ? suggestion3
            : currentQuestion.suggestions[2],
           suggestion4?.text
            ? suggestion4
            : currentQuestion.suggestions[3],]
          
        },
        {
          headers: {
            Authorization: `basic ${token}`,
            /*"Content-type": "multipart/form-data"*/
          },
        }
      )
      .catch((err) => console.log(err));
    setIsLoading(false);
    
    if (data) {
      getQuestion()
      setImage("null")
      setSuggestion1({ text: "" });
      setSuggestion2({ text: "" });
      setSuggestion3({ text: "" });
      setSuggestion4({ text: "" });
      alert('update question success')
    } else {
      console.log(formData)
      alert("echec de update de la question");
    }
  }
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
  const [images, setImages] = useState(null);
 
  

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
    currentQuestion?.suggestions?.map((item, index) =>{
      setSuggestions2([...suggestions2, {...suggestions2[index], text: item?.text, isCorrect: item?.isCorrect}])
    })
  }, [])
  return (
    <div className="flex h-full m-2 lg:m-4 lg:mx-10 flex-col">
      <div className="flex items-center justify-between m-2">
        <button
          onClick={() => router.push("/questions/addQuestion")}
          type="button"
          className="font-bold rounded  px-6 pb-2 pt-2.5 text-xs leading-normal  bg-blue-500  text-white  py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-full]"
        >
          create question
        </button>
        <div className="flex space-x-2 items-center">
          <div className="relative flex items-center justify-center">
            <div className="px-2 py-2 rounded-full bg-white cursor-pointer">
              <Icons.AdjustmentsHorizontalIcon className="w-5 h-5 bottom-1 right-1 text-gray-400" />
            </div>
            <select
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              className="absolute opacity-0 px-10"
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
                        numero
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
                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.length > 0 ? (
                      questions
                        ?.filter((item) =>
                          filter.name == "consigne"
                            ? item?.consigne.includes(filter.value)
                            : filter.name == "numero"
                            ? item?.numero.toString().includes(filter.value)
                            : filter.name == "categorie"
                            ? item?.categorie?.libelle
                                .toLowerCase()
                                .includes(filter.value)
                            : filter.name == "discipline"
                            ? item?.discipline?.libelle
                                .toLowerCase()
                                .includes(filter.value)
                            : filter.name == "point"
                            ? item?.categorie?.point
                                .toString()
                                .includes(filter.value)
                            : item
                        )
                        .map((item, index) => (
                          <QuestionsRows
                            setQuestions={setQuestions}
                            item={item}
                            key={index}
                            id={index + 1}
                          />
                        ))
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {currentQuestion.consigne && (
          <div className="xs:hidden lg:scale-100 lg:flex flex-1 space-y-2 flex-col bg-white p-3  h-full overflow-y-auto">
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              ></label>
              <div className="mt-2 bg-white flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="w-full h-[100px] m-3 justify-center flex">
                    <Image
                      className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
                      src={`${image != "null" ? image : currentQuestion?.libelle}`}
                      alt="Next.js Logo"
                      width={180}
                      height={37}
                      priority
                    />
                  </div>
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
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <span className="font-bold">Consigne : </span>

              <input
                type="text"
                onChange={(e) => {
                  dispatch(
                    setQuestion({
                      ...currentQuestion,
                      consigne: e.target.value,
                    })
                  );
                }}
                value={currentQuestion?.consigne}
                className="flex-1"
              />
            </div>
            <div className="flex">
              <span className="font-bold">Discipline : </span>
              <input
                type="text"
                value={currentQuestion?.discipline?.libelle}
                className="flex-1"
              />
            </div>
            <div className="flex">
              <span className="font-bold">Categorie : </span>
              <input
                className="flex-1"
                type="text"
                value={currentQuestion?.categorie?.libelle}
              />
            </div>
            <div className="flex">
              <span className="font-bold">Duree : </span>
              <input
                type="text"
                value={currentQuestion?.duree}
                className="flex-1"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <p className="font-bold text-center underline">Suggestions </p>

              <div className="flex items-center">
                <span
                  className={`p-3 text-white font-bold ${
                    !currentQuestion?.suggestions[0]?.isCorrect
                      ? `bg-red-500`
                      : `bg-green-500`
                  } `}
                >
                  R1
                </span>
                <textarea
                  onChange={(e) =>
                    setSuggestion1({
                      ...suggestion1,
                      text: e.target.value,
                      isCorrect: currentQuestion?.suggestions[0]?.isCorrect,
                    })
                  }
                  //placeholder={currentQuestion?.suggestions[0]?.text}
                  placeholder={currentQuestion?.suggestions[0]?.text}
                  value={suggestion1.text}
                  cols={1}
                  rows={1}
                  className=" w-full pl-2"
                ></textarea>
              </div>

              <div className="flex items-center">
                <span
                  className={`p-3 text-white font-bold ${
                    !currentQuestion?.suggestions[1]?.isCorrect
                      ? `bg-red-500`
                      : `bg-green-500`
                  } `}
                >
                  R2
                </span>
                <textarea
                  onChange={(e) =>
                    setSuggestion2({
                      ...suggestion2,
                      text: e.target.value,
                      isCorrect: currentQuestion?.suggestions[1]?.isCorrect,
                    })
                  }
                  cols={1}
                  rows={1}
                  className=" w-full pl-2"
                  placeholder={currentQuestion?.suggestions[1]?.text}
                  value={suggestion2.text}
                ></textarea>
              </div>
              <div className="flex items-center">
                <span
                  className={`p-3 text-white font-bold ${
                    !currentQuestion?.suggestions[2]?.isCorrect
                      ? `bg-red-500`
                      : `bg-green-500`
                  } `}
                >
                  R3
                </span>
                <textarea
                  onChange={(e) =>
                    setSuggestion3({
                      ...suggestion3,
                      text: e.target.value,
                      isCorrect: currentQuestion?.suggestions[2]?.isCorrect,
                    })
                  }
                  //placeholder={currentQuestion?.suggestions[2]?.text}
                  cols={1}
                  rows={1}
                  className=" w-full pl-2"
                  placeholder={currentQuestion?.suggestions[2]?.text}
                  value={suggestion3.text}
                ></textarea>
              </div>
              <div className="flex items-center">
                <span
                  className={`p-3 text-white font-bold ${
                    !currentQuestion?.suggestions[3]?.isCorrect
                      ? `bg-red-500`
                      : `bg-green-500`
                  } `}
                >
                  R4
                </span>
                <textarea
                  onChange={(e) =>
                    setSuggestion4({
                      ...suggestion4,
                      text: e.target.value,
                      isCorrect: currentQuestion?.suggestions[3]?.isCorrect,
                    })
                  }
                  placeholder={currentQuestion?.suggestions[3]?.text}
                  cols={1}
                  rows={1}
                  className=" w-full pl-2"
                  value={suggestion4.text}
                ></textarea>
              </div>
            </div>
            <div className="mt-10  h-[100px] flex items-center justify-center w-full">
              {!isLoading ? (
                <button
                  onClick={() => handleUpdate()}
                  className="bg-green-500 inline-block text-white text-sm font-medium px-10 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md"
                >
                  save modification
                </button>
              ) : (
                <button
                  disabled
                  className="bg-green-500 flex items-center space-x-2 text-white text-sm font-medium px-10 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md"
                >
                  <span>update question</span>

                  <div
                    class="spinner-border spinner-border-sm text-white"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <QuestionView setQuestions={setQuestions} />
    </div>
  );
}

export default QuestionsPage;
