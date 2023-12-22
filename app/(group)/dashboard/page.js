"use client"
import Image from "next/image";
import React, {useState, useEffect} from "react"
import Link from "next/link";
import * as Icons from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import SerieComponent from "../../../components/SerieComponent"
import AddSerie from "../../../components/AddSerie";
import GetCookies from "../../../hooks/getCookies";
import { instance } from "../../../hooks/Axios";
import AudioPlayer from "../../../components/AudioPlayer"
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestion,
  selectQuestion,
  selectQuestionsSelect,
} from "../../../featured/questionSlice";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter()
  const token = GetCookies("token");
  const [isLoading, setIsLoading] = useState(false);
  const currentQuestion = useSelector(selectQuestion);
  const [series, setSeries] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [tests, setTests] = useState([]);
  const [adsList, setAdsList] = useState([]);
  const [testsEO, setTestsEO] = useState([]);
  const Add = async() =>{
      let modal = document.querySelector("#lightbox");
      modal.classList.remove("scale-0");
  }

  const getTests = async () => {
    const data = await instance
      .get(`/api/eeTest/tests`, {
        headers: {
          Authorization: `basic ${token}`,
        },
      })
      .catch((err) => console.log(err.message));
   
    if (data) {
      setTests(data?.data);
    }
  };

  const getAdsList = async () => {
    const data = await instance
      .get(`/api/ads/ads`, {
        headers: {
          Authorization: `basic ${token}`,
        },
      })
      .catch((err) => console.log(err.message));
     
    if (data) {
      setAdsList(data?.data);
    }
    else{
      console.log('nononono');
    }
  };

  const getTestsEO = async () => {
    const data = await instance
      .get(`/api/eoTest/tests`, {
        headers: {
          Authorization: `basic ${token}`,
        },
      })
      .catch((err) => console.log(err.message));
    
    if (data) {
      setTestsEO(data?.data);
    }
  };

  const getUsers = async () => {
    const data = await instance
      .get("/api/user/users", {
        headers: {
          Authorization: `basic ${token}`,
        },
      })
      .catch((err) => console.log(err.message));
   
    if (data) {
      setUsers(data?.data);
    }
  };


  const getSeries = async () => {
      const data = await instance
        .get(
          "/api/serie/series",
          {
            headers: {
              Authorization: `basic ${token}`,
            },
          }
        )
        .catch((err) => console.log(err.message));
       
      if(data){
        setSeries(data?.data)
      }
  };
  const getQuestions = async () => {
    const data = await instance
      .get("/api/question/questions", {
        headers: {
          Authorization: `basic ${token}`,
        },
      })
      .catch((err) => console.log(err.message));
   
    if (data) {
      setQuestions(data?.data);
    }
  };

  useEffect(() => {
    dispatch(
      setQuestion({
        ...currentQuestion,
        _id: null,
        libelle: null,
        consigne: null,
        numero: null,
        categorie: null,
        discipline: null,
        suggestions: [],
      })
    );
  }, []);

  useEffect(()=>{
    getSeries()
    getUsers()
    getTests()
    getQuestions()
    getTestsEO()
    getAdsList()
  }, [] )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 pt-12 md:p-6 lg:p-12">
      <div className="bg-white w-full flex flex-col h-[270px] rounded-xl p-3">
        <div className="flex justify-between items-center p-2 ">
          <span className=" font-semibold">Serie Access</span>
          <div>
            <Icons.EllipsisHorizontalIcon className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
        <div className="w-full flex overflow-x-auto pb-2 no-scrollbar">
          <div className="flex flex-nowrap">
            {series?.map((item, index) => (
              <SerieComponent setSeries={setSeries} item={item} key={index} />
            ))}
            <div
              onClick={() => Add()}
              className="flex items-center justify-center hover:shadow-xl transition-shadow duration-300 ease-in-out border-2 border-dotted mx-2 shadow-md w-[300px] sm:w-1/2 lg:w-[300px] cursor-pointer border-green-200 p-20 rounded-lg space-y-2"
            >
              <Icons.PlusIcon className="w-16 h-16 font-bold text-green-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-32 w-full grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left p-4 lg:p-2">
        <Link
          href="/questions"
          className="group  overflow-hidden relative hover:bg-white rounded-lg border border-1 m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 flex justify-between"
        >
          <div className="z-20">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Questions{" "}
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
              src="/assets/images/question.jpg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
          <div className="p-3 absolute right-2 bottom-4 rounded-sm text-white text-xl bg-blue-300 group-hover:bg-blue-500 group-hover:rounded-full">
            <span>
              {questions.length.toString().length > 1
                ? questions?.length
                : "0" + questions?.length}
            </span>
          </div>
        </Link>
        <Link
          href="/TestExpression"
          className="group rounded-lg overflow-hidden border relative hover:bg-white border-1 m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30 flex justify-between"
        >
          <div className="z-20">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Expression Ecrite Test{" "}
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
              src="/assets/images/quizz.jpg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
          <div className="p-3 absolute right-2 bottom-4 rounded-sm text-white text-xl bg-blue-300 group-hover:bg-blue-500 group-hover:rounded-full ">
            <span>
              {tests?.filter((i) => i.status == "en cours")?.length.toString()
                .length > 1
                ? tests?.filter((i) => i.status == "en cours").length
                : "0" + tests?.filter((i) => i.status == "en cours").length}
            </span>
          </div>
        </Link>

        <Link
          href="/TestExpressionOral"
          className="group rounded-lg overflow-hidden border relative hover:bg-white border-1 m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30 flex justify-between"
        >
          <div className="z-20">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Expression Orale Test{" "}
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
              src="/assets/images/quizz.jpg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
          <div className="p-3 absolute right-2 bottom-4 rounded-sm text-white text-xl bg-blue-300 group-hover:bg-blue-500 group-hover:rounded-full ">
            <span>
              {testsEO?.filter((i) => i.status == "en cours").length.toString()
                .length > 1
                ? testsEO?.filter((i) => i.status == "en cours").length
                : "0" + testsEO?.filter((i) => i.status == "en cours").length}
            </span>
          </div>
        </Link>
        <Link
          href="/users"
          className="group rounded-lg relative overflow-hidden hover:bg-white border border-1 m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 flex justify-between"
        >
          <div className="z-20">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Users{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </div>
          <div className="absolute lg:relative opacity-20 group-hover:opacity-100">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
              src="/assets/images/quizztv.jpg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
          <div className="p-3 flex items-center justify-center  absolute right-2 bottom-4 text-white text-xl bg-blue-300 group-hover:bg-blue-500 group-hover:rounded-full">
            <span>
              {users?.length.toString().length > 1
                ? users?.length
                : "0" + users?.length}
            </span>
          </div>
        </Link>
        <Link
          href="/ads"
          className="group rounded-lg relative overflow-hidden hover:bg-white border border-1 m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 flex justify-between"
        >
          <div className="z-20">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Evenements{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </div>
          <div className="absolute lg:relative opacity-20 group-hover:opacity-100">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
              src="/assets/images/quizztv.jpg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
          <div className="p-3 flex items-center justify-center  absolute right-2 bottom-4 text-white text-xl bg-blue-300 group-hover:bg-blue-500 group-hover:rounded-full">
            <span>
              {adsList?.length.toString().length > 1
                ? adsList?.length
                : "0" + adsList?.length}
            </span>
          </div>
        </Link>
      </div>

      {<AddSerie setSeries={setSeries} series={series} />}
    </main>
  );
}
