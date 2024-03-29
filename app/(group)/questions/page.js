"use client";
import QuestionsRows from "../../../components/QuestionsRows";
import React, {useState, useEffect, useRef} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SerieComponent from "../../../components/SerieComponent";
import AddSerie from "../../../components/AddSerie";
import GetCookies from "../../../hooks/getCookies";
import { instance, baseUrlImg } from "../../../hooks/Axios";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  setQuestion,
  selectQuestion,
  selectQuestionsSelect,
} from "../../../featured/questionSlice";
import QuestionView from "../../../components/QuestionView";
import QuestionsRowEE from '../../../components/QuestionsRowEE'
import QuestionsRowEO from '../../../components/QuestionsRowEO'
import * as Icons from "@heroicons/react/24/outline"
import AudioPlayer from "../../../components/AudioPlayer";
import TabView from '../../../components/TabView'
import { selectSerie } from "../../../featured/serieSlice";
import { baseUrlFile } from "../../../hooks/Axios";

function QuestionsPage() {
  //const fileRef = useRef(null);
  const router = useRouter();
  const token = GetCookies("token");
  const [see, setSee] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    name: "consigne",
    value: "",
  });
  const serie = useSelector(selectSerie);
  const [eeQuestions, setEEQuestions] = useState([]);
  //const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();
  const currentQuestion = useSelector(selectQuestion);
  const [suggestions2, setSuggestions2] = useState([]);
  const [image, setImage] = useState("null");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploading2, setIsUploading2] = useState(false);

  const handleSetConsigne = async (e) => {
   
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    setIsUploading(true);
    const data = await instance.post("api/question/upload", formData, {
      headers: {
        Authorization: `basic ${token}`,
        "Content-type": "multipart/form-data",
      },
    });
    setIsUploading(false);
   
    if (data) {
      dispatch(setQuestion({ ...currentQuestion, consigne: data.data.file }));
    }
  };

   const handleSetLibelle = async (e) => {
    
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    setIsUploading2(true);
    const data = await instance.post("api/question/upload", formData, {
      headers: {
        Authorization: `basic ${token}`,
        "Content-type": "multipart/form-data",
      },
    });
   
    setIsUploading2(false);
    if (data) {
      setImage(data?.data.file);
    }
  };

  const Update = async (datas) => {
    //alert(JSON.stringify(questions))
    const newTab = serie.questions.filter((i) => i._id != datas?._id);

    setIsLoading(true);
    const data = await instance
      .patch(
        `/api/serie/series/${serie._id}`,
        {
          libelle: serie.libelle,
          questions: newTab,
          eoQuestions: serie.eoQuestions,
          eeQuestions: serie.eeQuestions,
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
      setQuestion({});
      router.push("/dashboard");
      alert("serie update success");
      getSeries();
      setImage("null");
      setSuggestion1({ text: "" });
      setSuggestion2({ text: "" });
      setSuggestion3({ text: "" });
      setSuggestion4({ text: "" });
    }
  };

  const handleUpdate = async () => {
    alert(currentQuestion?.consigne);
    const formData = new FormData();
    setIsLoading(true);
    const data = await instance
      .patch(
        `/api/question/questions/${currentQuestion?._id}`,
        {
          libelle: image == "null" ? currentQuestion.libelle : image,
          consigne: currentQuestion.consigne,
          numero: currentQuestion.numero,
          categorie: currentQuestion.categorie,
          discipline: currentQuestion.discipline,
          duree: currentQuestion.duree,
          suggestions: [
            suggestion1?.text ? suggestion1 : currentQuestion.suggestions[0],
            suggestion2?.text ? suggestion2 : currentQuestion.suggestions[1],
            suggestion3?.text ? suggestion3 : currentQuestion.suggestions[2],
            suggestion4?.text ? suggestion4 : currentQuestion.suggestions[3],
          ],
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
      alert(JSON.stringify(data.data));
      // Update(data.data)
    } else {
      console.log(formData);
      alert("echec de update de la question")
    }
  };
  //alert(image)
  //alert(currentQuestion.libelle)
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
  const [series, setSeries] = useState([]);
  const [images, setImages] = useState(null);
  const tabDatas = ["Comprehension Question", "Expression Question"];
  const [currentTab, setCurrentTab] = useState("Comprehension Question");

  const getEEQuestions = async () => {
    const data = await instance
      .get("/api/eeQuestion/questions", {
        headers: {
          Authorization: `basic ${token}`,
        },
      })
      .catch((err) => console.log(err.message));
    console.log(data);
    if (data) {
      setEEQuestions(data?.data);
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

    if (data) {
      setSeries(data?.data);
    }
  };
  const handleShow = () => {
    if (see) {
      setSee(false);
    } else {
      setSee(true);
    }
  };
  useEffect(() => {
    getSeries();
    // getEEQuestions()
    //getQuestions()
    //console.log(series)
    currentQuestion?.suggestions?.map((item, index) => {
      setSuggestions2([
        ...suggestions2,
        {
          ...suggestions2[index],
          text: item?.text,
          isCorrect: item?.isCorrect,
        },
      ]);
    });
  }, []);

  return (
    <div className="flex  m-2 lg:m-4 lg:mx-10 flex-col">
      <div className="flex h-full items-center p-3 justify-center  space-x-4   w-full">
        <div className="mb-32  w-full grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left p-4 lg:p-2">
          <Link
            href="/questions/addQuestion"
            className="group  overflow-hidden relative hover:bg-white rounded-lg border border-1 m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 flex justify-between"
          >
            <div className="z-20">
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Create comprehension question{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Find in-depth information about Next.js features and API.
              </p>
            </div>
            <div className=" absolute lg:relative opacity-20 group-hover:opacity-100">
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
                src="/assets/images/comprehension.jpg"
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
              />
            </div>
          </Link>
          <Link
            href="/questions/addEEQuestion"
            className="group rounded-lg overflow-hidden border relative hover:bg-white border-1 m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30 flex justify-between"
          >
            <div className="z-20">
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Create expression question{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Learn about Next.js in an interactive course with&nbsp;quizzes!
              </p>
            </div>
            <div className=" absolute lg:relative opacity-20 group-hover:opacity-100">
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
                src="/assets/images/oral.jpg"
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
              />
            </div>
          </Link>
        </div>
      </div>
      <span
        onClick={() => handleShow()}
        className="text-center m-3 text-blue-500 underline cursor-pointer"
      >
        {!see ? "show questions" : "hide questions"}
      </span>
      {see && (
        <div>
          <div className="flex items-center justify-center  space-x-4   w-full">
            {tabDatas?.map((item, index) => (
              <TabView
                setItem={setCurrentTab}
                currentItem={currentTab}
                key={index}
                item={item}
              />
            ))}
          </div>
          {currentTab == "Comprehension Question" ? (
            <div>
              <div className="flex items-center justify-between m-2">
                {/* <button
              onClick={() => router.push("/questions/addQuestion")}
              type="button"
              className="font-bold rounded  px-6 pb-2 pt-2.5 text-xs leading-normal  bg-blue-500  text-white  py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-full]"
            >
              create question
            </button> */}
                <div className="flex space-x-2 items-center z-0">
                  <div className="relative flex items-center justify-center">
                    <div className="px-2 py-2 rounded-full bg-white cursor-pointer">
                      <Icons.AdjustmentsHorizontalIcon className="w-5 h-5 bottom-1 right-1 text-gray-400" />
                    </div>
                    <select
                      onChange={(e) =>
                        setFilter({ ...filter, name: e.target.value })
                      }
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
                  <div className="relative -z-10">
                    <input
                      type="search"
                      onChange={(e) =>
                        setFilter({ ...filter, value: e.target.value })
                      }
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
                                serie
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
                            {series?.map((item, index) =>
                              item?.questions?.map((q, i) => (
                                <QuestionsRows
                                  serie={item}
                                  item={q}
                                  key={i}
                                  id={i + 1}
                                />
                              ))
                            )}
                            {/* {questions.length > 0 ? (
                          questions
                            ?.filter((item) =>
                              filter.name == "consigne"
                                ? item?.consigne?.includes(filter.value)
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
                        )} */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {currentQuestion?.consigne && (
                  <div className="xs:hidden lg:scale-100 lg:flex flex-1 space-y-2 flex-col bg-white p-3  h-full overflow-y-auto">
                    <div className="col-span-full">
                      <div className="mt-2 bg-white flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <div className="col-span-full">
                            <label
                              htmlFor="cover-photo"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            ></label>
                            <div className="mt-2 bg-white flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                              <div className="text-center">
                                <div className="w-full  justify-center flex">
                                  <Image
                                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                                    src={`${
                                      image != "null"
                                        ? `${baseUrlFile}${image}`
                                        : `${baseUrlFile}${currentQuestion?.libelle}`
                                    }`}
                                    alt="Next.js Logo"
                                    width={180}
                                    height={37}
                                    priority
                                  />
                                </div>
                                <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                                  <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                  >
                                    <span>Upload a file</span>

                                    {/* <UploadButton
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
                                    /> */}
                                    <div className="w-full border-dashed border-2 cursor-pointer bg-white border-indigo-500 h-[100px] flex item-center justify-center">
                                      <input
                                        type="file"
                                        className="w-full h-full opacity-0 cursor-pointer absolute"
                                        onChange={handleSetLibelle}
                                      />
                                      <div className="flex items-center justify-center">
                                        {!isUploading2 ? (
                                          <Icons.ArrowDownTrayIcon
                                            className="text-indigo-500 text-lg w-10 h-10"
                                            size={16}
                                          />
                                        ) : (
                                          <div
                                            class="spinner-border text-lg spinner-border-sm text-indigo-500"
                                            role="status"
                                          >
                                            <span class="visually-hidden">
                                              Loading...
                                            </span>
                                          </div>
                                        )}
                                        <span className="text-indigo-500 ">
                                          upload file libelle
                                        </span>
                                      </div>
                                    </div>

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
                      {currentQuestion?.discipline?.libelle ==
                      "Comprehension Ecrite" ? (
                        <>
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
                        </>
                      ) : (
                        <div className="mt-2 bg-white flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <div className="w-full  justify-center flex">
                              {currentQuestion?.discipline?.libelle ==
                              "Comprehension Ecrite" ? (
                                <Image
                                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
                                  src={`${
                                    image != "null"
                                      ? `${baseUrlFile}${image}`
                                      : `${baseUrlFile}${currentQuestion?.consigne}`
                                  }`}
                                  alt="Next.js Logo"
                                  width={180}
                                  height={37}
                                  priority
                                />
                              ) : (
                                <AudioPlayer
                                  url={`${
                                    image != "null"
                                      ? `${baseUrlFile}${image}`
                                      : `${baseUrlFile}${currentQuestion?.consigne}`
                                  }`}
                                />
                              )}
                            </div>
                            <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file of consigne</span>
                                {currentQuestion?.discipline?.libelle == null ||
                                currentQuestion?.discipline?.libelle ==
                                  "Comprehension Ecrite" ? (
                                  // <UploadButton
                                  //   endpoint="imageUploader"
                                  //   onClientUploadComplete={(res) => {
                                  //     if (res) {
                                  //       setImage(res[0].fileUrl);
                                  //       alert("Upload Completed");
                                  //     }
                                  //     // Do something with the respons
                                  //   }}
                                  //   onUploadError={(error) => {
                                  //     // Do something with the error.
                                  //     alert(`ERROR! ${error.message}`);
                                  //   }}
                                  // />
                                  <div className="w-full border-dashed border-2 cursor-pointer bg-white border-indigo-500 h-[100px] flex item-center justify-center">
                                    <input
                                      type="file"
                                      className="w-full h-full opacity-0 cursor-pointer absolute"
                                      onChange={handleSetConsigne}
                                    />
                                    <div className="flex items-center justify-center">
                                      {!isUploading ? (
                                        <Icons.ArrowDownTrayIcon
                                          className="text-indigo-500 text-lg w-10 h-10"
                                          size={16}
                                        />
                                      ) : (
                                        <div
                                          class="spinner-border text-lg spinner-border-sm text-indigo-500"
                                          role="status"
                                        >
                                          <span class="visually-hidden">
                                            Loading...
                                          </span>
                                        </div>
                                      )}
                                      <span className="text-indigo-500 ">
                                        upload file consigne
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  // <UploadButton
                                  //   endpoint="mediaPost"
                                  //   onClientUploadComplete={(res) => {
                                  //     if (res) {
                                  //       setImage(res[0].fileUrl);
                                  //       alert("Upload Completed");
                                  //     }
                                  //     // Do something with the response
                                  //   }}
                                  //   onUploadError={(error) => {
                                  //     // Do something with the error.
                                  //     alert(`ERROR! ${error.message}`);
                                  //   }}
                                  // />
                                  <div className="w-full border-dashed border-2 cursor-pointer bg-white border-indigo-500 h-[100px] flex item-center justify-center">
                                    <input
                                      type="file"
                                      className="w-full h-full opacity-0 cursor-pointer absolute"
                                      onChange={handleSetConsigne}
                                    />
                                    <div className="flex items-center justify-center">
                                      {!isUploading ? (
                                        <Icons.ArrowDownTrayIcon
                                          className="text-indigo-500 text-lg w-10 h-10"
                                          size={16}
                                        />
                                      ) : (
                                        <div
                                          class="spinner-border text-lg spinner-border-sm text-indigo-500"
                                          role="status"
                                        >
                                          <span class="visually-hidden">
                                            Loading...
                                          </span>
                                        </div>
                                      )}
                                      <span className="text-indigo-500 ">
                                        upload file consigne
                                      </span>
                                    </div>
                                  </div>
                                )}
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
                      )}
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
                      <p className="font-bold text-center underline">
                        Suggestions{" "}
                      </p>

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
                              isCorrect:
                                currentQuestion?.suggestions[0]?.isCorrect,
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
                              isCorrect:
                                currentQuestion?.suggestions[1]?.isCorrect,
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
                              isCorrect:
                                currentQuestion?.suggestions[2]?.isCorrect,
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
                              isCorrect:
                                currentQuestion?.suggestions[3]?.isCorrect,
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
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between m-2">
                {/* <button
              onClick={() => router.push("/questions/addEEQuestion")}
              type="button"
              className="font-bold rounded  px-6 pb-2 pt-2.5 text-xs leading-normal  bg-blue-500  text-white  py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-full]"
            >
              create question
            </button> */}
                <div className="flex space-x-2 items-center z-0">
                  <div className="relative flex items-center justify-center">
                    <div className="px-2 py-2 rounded-full bg-white cursor-pointer">
                      <Icons.AdjustmentsHorizontalIcon className="w-5 h-5 bottom-1 right-1 text-gray-400" />
                    </div>
                    <select
                      onChange={(e) =>
                        setFilter({ ...filter, name: e.target.value })
                      }
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
                  <div className="relative -z-10">
                    <input
                      type="search"
                      onChange={(e) =>
                        setFilter({ ...filter, value: e.target.value })
                      }
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
      </div> */
      }
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
                                serie
                              </th>
                              <th scope="col" className="px-6 py-4">
                                task 1
                              </th>
                              <th scope="col" className="px-6 py-4">
                                task 2
                              </th>
                              <th scope="col" className="px-6 py-4">
                                task 3
                              </th>
                              <th scope="col" className="px-6 py-4"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {series?.map((item, index) =>
                              item?.eeQuestions?.map((q, i) => (
                                <QuestionsRowEE
                                  //setQuestions={setQuestions}
                                  serie={item}
                                  item={q}
                                  key={i}
                                  id={i + 1}
                                />
                              ))
                            )}
                            {series?.map((item, index) =>
                              item?.eoQuestions?.map((q, i) => (
                                <QuestionsRowEO
                                  //setQuestions={setQuestions}
                                  serie={item}
                                  item={q}
                                  key={i}
                                  id={i + 1}
                                />
                              ))
                            )}
                            {/* {eeQuestions.length > 0 ? (
                          eeQuestions
                            ?.filter((item) =>
                              filter.name == "consigne"
                                ? item?.consigne?.includes(filter.value)
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
                              <QuestionsRowEE
                                setQuestions={setQuestions}
                                item={item}
                                key={index}
                                id={index + 1}
                              />
                            ))
                        ) : (
                          <></>
                        )} */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {currentQuestion?.consigne && (
                  <div className="xs:hidden lg:scale-100 lg:flex flex-1 space-y-2 flex-col bg-white p-3  h-full overflow-y-auto">
                    <div className="col-span-full">
                      <div className="mt-2 bg-white flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <div className="col-span-full">
                            <label
                              htmlFor="cover-photo"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            ></label>
                            <div className="mt-2 bg-white flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                              <div className="text-center">
                                <div className="w-full  justify-center flex">
                                  <Image
                                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
                                    src={`${
                                      image != "null"
                                        ? `${baseUrlFile}${image}`
                                        : `${baseUrlFile}${currentQuestion?.libelle}`
                                    }`}
                                    alt="Next.js Logo"
                                    width={180}
                                    height={37}
                                    priority
                                  />
                                </div>
                                <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                                  <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                  >
                                    <span>Upload a file</span>

                                    <div className="w-full border-dashed border-2 cursor-pointer bg-white border-indigo-500 h-[100px] flex item-center justify-center">
                                      <input
                                        type="file"
                                        className="w-full h-full opacity-0 cursor-pointer absolute"
                                        onChange={handleSetLibelle}
                                      />
                                      <div className="flex items-center justify-center">
                                        {!isUploading2 ? (
                                          <Icons.ArrowDownTrayIcon
                                            className="text-indigo-500 text-lg w-10 h-10"
                                            size={16}
                                          />
                                        ) : (
                                          <div
                                            class="spinner-border text-lg spinner-border-sm text-indigo-500"
                                            role="status"
                                          >
                                            <span class="visually-hidden">
                                              Loading...
                                            </span>
                                          </div>
                                        )}
                                        <span className="text-indigo-500 ">
                                          upload file libelle
                                        </span>
                                      </div>
                                    </div>

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
                      {currentQuestion?.discipline?.libelle ==
                      "Comprehension Ecrite" ? (
                        <>
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
                        </>
                      ) : (
                        <div className="mt-2 bg-white flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <div className="w-full  justify-center flex">
                              {currentQuestion?.discipline?.libelle ==
                              "Comprehension Ecrite" ? (
                                <Image
                                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
                                  src={`${
                                    image != "null"
                                      ? `${baseUrlFile}${image}`
                                      : `${baseUrlFile}${currentQuestion?.consigne}`
                                  }`}
                                  alt="Next.js Logo"
                                  width={180}
                                  height={37}
                                  priority
                                />
                              ) : (
                                <AudioPlayer
                                  url={`${
                                    image != "null"
                                      ? `${baseUrlFile}${image}`
                                      : `${baseUrlFile}${currentQuestion?.consigne}`
                                  }`}
                                />
                              )}
                            </div>
                            <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file of consigne</span>
                                {currentQuestion?.discipline?.libelle == null ||
                                currentQuestion?.discipline?.libelle ==
                                  "Comprehension Ecrite" ? (
                                  <div className="w-full border-dashed border-2 cursor-pointer bg-white border-indigo-500 h-[100px] flex item-center justify-center">
                                    <input
                                      type="file"
                                      className="w-full h-full opacity-0 cursor-pointer absolute"
                                      onChange={handleSetLibelle}
                                    />
                                    <div className="flex items-center justify-center">
                                      {!isUploading2 ? (
                                        <Icons.ArrowDownTrayIcon
                                          className="text-indigo-500 text-lg w-10 h-10"
                                          size={16}
                                        />
                                      ) : (
                                        <div
                                          class="spinner-border text-lg spinner-border-sm text-indigo-500"
                                          role="status"
                                        >
                                          <span class="visually-hidden">
                                            Loading...
                                          </span>
                                        </div>
                                      )}
                                      <span className="text-indigo-500 ">
                                        upload file libelle
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="w-full border-dashed border-2 cursor-pointer bg-white border-indigo-500 h-[100px] flex item-center justify-center">
                                    <input
                                      type="file"
                                      className="w-full h-full opacity-0 cursor-pointer absolute"
                                      onChange={handleSetLibelle}
                                    />
                                    <div className="flex items-center justify-center">
                                      {!isUploading2 ? (
                                        <Icons.ArrowDownTrayIcon
                                          className="text-indigo-500 text-lg w-10 h-10"
                                          size={16}
                                        />
                                      ) : (
                                        <div
                                          class="spinner-border text-lg spinner-border-sm text-indigo-500"
                                          role="status"
                                        >
                                          <span class="visually-hidden">
                                            Loading...
                                          </span>
                                        </div>
                                      )}
                                      <span className="text-indigo-500 ">
                                        upload file libelle
                                      </span>
                                    </div>
                                  </div>
                                )}
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
                      )}
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
                      <p className="font-bold text-center underline">
                        Suggestions{" "}
                      </p>

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
                              isCorrect:
                                currentQuestion?.suggestions[0]?.isCorrect,
                            })
                          }
                          //placeholder={currentQuestion?.suggestions[0]?.text}
                          placeholder={currentQuestion?.suggestions[0]?.text}
                          value={
                            suggestion1.text ? suggestion1.text : undefined
                          }
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
                              isCorrect:
                                currentQuestion?.suggestions[1]?.isCorrect,
                            })
                          }
                          cols={1}
                          rows={1}
                          className=" w-full pl-2"
                          placeholder={currentQuestion?.suggestions[1]?.text}
                          value={
                            suggestion2.text ? suggestion2.text : undefined
                          }
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
                              isCorrect:
                                currentQuestion?.suggestions[2]?.isCorrect,
                            })
                          }
                          //placeholder={currentQuestion?.suggestions[2]?.text}
                          cols={1}
                          rows={1}
                          className=" w-full pl-2"
                          placeholder={currentQuestion?.suggestions[2]?.text}
                          value={
                            suggestion3.text ? suggestion3.text : undefined
                          }
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
                              isCorrect:
                                currentQuestion?.suggestions[3]?.isCorrect,
                            })
                          }
                          placeholder={currentQuestion?.suggestions[3]?.text}
                          cols={1}
                          rows={1}
                          className=" w-full pl-2"
                          value={
                            suggestion4.text ? suggestion4.text : undefined
                          }
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
            </div>
          )}
        </div>
      )}

      <QuestionView />
    </div>
  );
}

export default QuestionsPage;
