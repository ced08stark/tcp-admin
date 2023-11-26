"use client";
import Image from "next/image";
import React, {useState, useEffect} from "react";
import * as Icons from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import GetCookies from "../hooks/getCookies";
import { instance, baseUrlImg } from "../hooks/Axios";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion, selectQuestion } from "../featured/questionSlice";
import AudioPlayer from "./AudioPlayer";
import { baseUrlFile } from "../hooks/Axios";

function QuestionView() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const currentQuestion = useSelector(selectQuestion);
  const [image, setImage] = useState("null");
  const token = GetCookies("token");
  console.log(currentQuestion?.consigne)

  const getQuestion = async () => {
    const data = await instance
      .get("/api/question/questions", {
        headers: {
          Authorization: `basic ${token}`,
        },
      })
      .catch((err) => console.log(err.message));
    console.log(data);
    if (data) {
      //setQuestions(data?.data);
    }
  };

  const handleUpdate = async () => {
    
    const formData = new FormData();
    console.log(currentQuestion);
    setIsLoading(true);
    const data = await instance
      .patch(
        `/api/question/questions/${currentQuestion?._id}`,
        {
          libelle: image != "" ? image : currentQuestion.libelle,
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
      getQuestion();
      setImage("null");
      setSuggestion1({ text: "" });
      setSuggestion2({ text: "" });
      setSuggestion3({ text: "" });
      setSuggestion4({ text: "" });
      alert("update question success");
      close()
    } else {
      console.log(formData);
      alert("echec de update de la question");
    }
  };
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
  const [isUploading, setIsUploading] = useState(false)
  const [isUploading2, setIsUploading2] = useState(false);

  const handleSetConsigne = async (e) => {
    console.log(e.target.files[0]);
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
    console.log(data);
    if (data) {
      setQuestion({ ...currentQuestion, consigne: data.data.file });
    }
  };

  const handleSetLibelle = async (e) => {
    console.log(e.target.files[0]);
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

  const close = () => {
    const lightbox = document.querySelector("#lightbox");
    lightbox.classList.remove("scale-100");
    lightbox.classList.add("scale-0");
  };
  return (
    <section
      className="fixed z-50 sm:flex lg:hidden inset-0 w-full h-full dark:text-white flex-col  items-center justify-center transition-all duration-300 scale-0 overflow-y-auto"
      id="lightbox"
    >
      <div
        className="flex-col p-4 space-y-2   overflow-y-auto overflow-x-hidden  flex rounded-md bg-white dark:bg-gray-800 w-full  h-auto    sm:p-0 shadow-lg shadow-black "
        id="lightbox-body"
      >
        <div className="flex justify-between items-center">
          <span className="text-xl sm:text-xl font-bold ">Question view</span>
          <Icons.XMarkIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => close()}
          />
        </div>
        <div className="sm:hidden lg:flex flex-1 space-y-2 flex-col bg-white p-3  h-full overflow-y-auto">
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            ></label>
          </div>
        </div>
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
                    {currentQuestion?.libelle && (
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
                    )}
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
                              <span class="visually-hidden">Loading...</span>
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
        <div className="flex w-full">
          {currentQuestion?.discipline?.libelle == "Comprehension Ecrite" ? (
            <div>
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
          ) : (
            <div className="mt-2 bg-white flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <div className="w-full  justify-center flex">
                  {currentQuestion?.consigne && (
                    <AudioPlayer
                      url={`${baseUrlFile}${currentQuestion?.consigne}`}
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
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          )}
                          <span className="text-indigo-500 ">
                            upload file consigne
                          </span>
                        </div>
                      </div>
                    ) : (
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
                              <span class="visually-hidden">Loading...</span>
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
          <span className="font-bold text-sm md:text-base pr-2">
            Discipline :{" "}
          </span>
          <input
            type="text"
            value={currentQuestion?.discipline?.libelle}
            className="flex-1"
          />
        </div>
        <div className="flex">
          <span className="font-bold text-sm md:text-base pr-2">
            Categorie :{" "}
          </span>
          <input
            className="flex-1"
            type="text"
            value={currentQuestion?.categorie?.libelle}
          />
        </div>
        <div className="flex">
          <span className="font-bold text-sm md:text-base pr-2">Duree : </span>
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
              value={suggestion1.text ? suggestion1.text : undefined}
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
              value={suggestion2.text ? suggestion2.text : undefined}
              cols={1}
              rows={1}
              className=" w-full pl-2"
              placeholder={currentQuestion?.suggestions[1]?.text}
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
              value={suggestion3.text ? suggestion3.text : undefined}
              placeholder={currentQuestion?.suggestions[2]?.text}
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
              value={suggestion4.text ? suggestion4.text : undefined}

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
    </section>
  );
}

export default QuestionView;
