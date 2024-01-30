"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TaskMark from "../../../../components/TaskMark";
import TaskAudio from "../../../../components/TaskAudio";
import GetCookies from "../../../../hooks/getCookies";
import { instance } from "../../../../hooks/Axios";
import { useRouter } from "next/navigation";


function Test() {
  const params = useParams();
  const [taskIndex, setTaskIndex] = useState(0);
  const [test, setTest] = useState();
  const token = GetCookies("token");
  const [isLoading, setIsLoading] = useState(false);
  const [note1, setNote1] = useState(0);
  const [note2, setNote2] = useState(0);
  const [note3, setNote3] = useState(0);
  const router = useRouter();
  const [reponse1, setReponse1] = useState("");
  const [reponse2, setReponse2] = useState("");
  const [reponse3, setReponse3] = useState("");

  const getTest = async () => {
    const data = await instance
      .get(`/api/eoTest/tests/${params?.Test}`, {
        headers: {
          Authorization: `basic ${token}`,
        },
      })
      .catch((err) => console.log(err.message));
    
    if (data) {
      setTest(data?.data);
      console.log(data?.data)
      //console.log(JSON.parse(data?.data?.payload))
      setReponse1(data ? JSON.parse(data?.data?.payload)?.taskUrl1 : "");
      setReponse2(data ? JSON.parse(data?.data?.payload)?.taskUrl2 : "");
      setReponse3(data ? JSON.parse(data?.data?.payload)?.taskUrl3 : "");
      setNote1(data?.data?.resultat[0]?.note);
      setNote2(data?.data?.resultat[1]?.note);
      setNote3(data?.data?.resultat[2]?.note);
    }
  };

  useEffect(() => {
    getTest();
  }, []);
  const handlePressNext = () => {
   
    if (taskIndex >= 0 && taskIndex < 2) {
      setTaskIndex(taskIndex + 1);
    }
  };
  const handlePressPrev = () => {
    if (taskIndex > 0 && taskIndex <= 2) {
      setTaskIndex(taskIndex - 1);
    }
  };
  const Send = async () => {
    if (note1 && note2 && note3) {
      if (
        parseInt(note1) + parseInt(note2) + parseInt(note3) >= 0 &&
        parseInt(note1) + parseInt(note2) + parseInt(note3) <= 20
      ) {
        setIsLoading(true);
        const data = await instance
          .patch(
            `/api/eoTest/tests/${params?.Test}`,
            {
              serie: test?.serie?._id,
              user: test?.user?._id,
              resultat: [
                { task: "tache1", note: note1 },
                { task: "tache2", note: note2 },
                { task: "tache3", note: note3 },
              ],
              payload: test?.payload,
              status: "terminer",
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
          alert("test envoyer avec success");
          router.push("/TestExpressionOral");
        } else {
          alert("une erreur est survenu lors de l'envoi ");
        }
      } else {
        alert("note incorrect");
      }
    } else {
      alert("veuillez attribuer une note a chaque tache");
    }
  };
  
  return (
    <div className="w-full flex flex-col">
      <div className="p-3 ">
        <h1 className="text-center font-bold text-xl">Expression Orale</h1>
        <div className=" flex items-center justify-between mx-auto xs:w-full md:w-[80%]">
          <span className="font-bold xs:text-xs md:text-md lg:text-base">
            {new Date(test?.createdAt).toDateString()}
          </span>
          <span className="xs:text-xs md:text-md lg:text-base">
            {test?.user?.email}
          </span>
          <div className="flex flex-col items-center xs:text-xs md:text-md lg:text-base">
            <span>
              {note1
                ? parseInt(note1)
                : 0 + note2
                ? parseInt(note2)
                : 0 + note3
                ? parseInt(note3)
                : 0}{" "}
              / 20
            </span>
            <span
              className={`text-xs px-2 md:px-3 py-1 rounded-full ${
                test?.status == "en cours" ? "bg-green-500" : "bg-gray-900"
              } text-white`}
            >
              {test?.status}
            </span>
          </div>
        </div>
      </div>
      {taskIndex == 0 && (
        <TaskAudio
          name={test?.serie?.eoQuestions[0]?.tasks[0]?.libelle}
          files={test?.serie?.eoQuestions[0]?.tasks[0]?.fichier}
          noteMax={5}
          status={test?.status}
          note={note1}
          setNote={setNote1}
          consigne={test?.serie?.eoQuestions[0]?.tasks[0]?.consigne}
          reponse={reponse1}
        />
      )}
      {taskIndex == 1 && (
        <TaskAudio
          name={test?.serie?.eoQuestions[0]?.tasks[1]?.libelle}
          consigne={test?.serie?.eoQuestions[0]?.tasks[1]?.consigne}
          files={test?.serie?.eoQuestions[0]?.tasks[1]?.fichier}
          note={note2}
          setNote={setNote2}
          status={test?.status}
          noteMax={8}
          reponse={reponse2}
        />
      )}
      {taskIndex == 2 && (
        <TaskAudio
          name={test?.serie?.eoQuestions[0]?.tasks[2]?.libelle}
          consigne={test?.serie?.eoQuestions[0]?.tasks[2]?.consigne}
          files={test?.serie?.eoQuestions[0]?.tasks[2]?.fichier}
          noteMax={7}
          note={note3}
          setNote={setNote3}
          status={test?.status}
          reponse={reponse3}
        />
      )}
      <div className="xs:w-full lg:w-[80%] mx-auto my-4 justify-between items-center flex">
        <button
          onClick={() => handlePressPrev()}
          className={`px-6 py-2 text-white ${
            taskIndex == 0 ? "bg-gray-400" : "bg-blue-500"
          }  rounded-sm`}
        >
          prev
        </button>
        {!isLoading ? (
          test?.status == "en cours" ? (
            <button
              disabled={test?.status == "en cours" ? false : true}
              onClick={() => Send()}
              className={`${
                test?.status == "en cours" ? "bg-green-500" : "bg-gray-500"
              } inline-block text-white text-sm font-medium px-10 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md`}
            >
              envoyer
            </button>
          ) : (
            <></>
          )
        ) : (
          <button
            disabled
            className="bg-green-500 flex items-center space-x-2 text-white text-sm font-medium px-10 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md"
          >
            <span>envoie</span>
            <div
              class="spinner-border spinner-border-sm text-white"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        )}
        <button
          onClick={() => handlePressNext()}
          className={`px-6 py-2 text-white ${
            taskIndex == 2 ? "bg-gray-400" : "bg-blue-500"
          } rounded-sm `}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default Test;
