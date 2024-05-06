"use client";
import QuestionsRows from "../../../components/QuestionsRows";
import React, {useState, useEffect, useRef} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GetCookies from "../../../hooks/getCookies";
import { instance } from "../../../hooks/Axios";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  setQuestion,
  selectQuestion
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
      alert("alert success");
    } else {
      console.log(formData);
      alert("echec de update de la question")
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
  const [series, setSeries] = useState([]);
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
    
      <QuestionView />
    </div>
  );
}

export default QuestionsPage;
