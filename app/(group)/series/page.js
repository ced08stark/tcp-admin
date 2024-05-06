"use client";
import Image from "next/image";
import React, {useEffect, useState} from 'react'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectSerie } from "../../../featured/serieSlice";
import {
  setQuestion,
  selectQuestion
} from "../../../featured/questionSlice";


export default function Serie() {
  const serie = useSelector(selectSerie);
  const currentQuestion = useSelector(selectQuestion);
  const dispatch = useDispatch();
  useEffect(()=>{
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
  }, [])

  //const router = useRouter()
  return (
    <main className="flex space-y-8 flex-col items-center justify-between pt-12 p-4  lg:p-12">
      <div className=" w-full flex space-x-4 items-center justify-center">
        <h1 className="text-xl font-bold">serie:</h1>
        <span className="font-bold text-3xl text-gray-900">
          {serie?.libelle}
        </span>
      </div>
      <div className="  w-full grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
        <Link
          href="/series/questionEcrite"
          className="group  overflow-hidden  hover:bg-white rounded-lg border border-1 m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 flex justify-between"
        >
          <div className="z-20">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Comprehension ecrite{" "}
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about Next.js features and API.
            </p>
          </div>
          <div className=" absolute lg:relative opacity-20 group-hover:opacity-100">
            <Image
              className=" dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
              src="/assets/images/comprehension.jpg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
        </Link>
        <Link
          href="/series/questionOrale"
          className="group rounded-lg overflow-hidden border  hover:bg-white border-1 m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30 flex justify-between"
        >
          <div className="z-20">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Comprehension orale{" "}
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

        <Link
          href="/series/questionExpression"
          className="group rounded-lg  overflow-hidden hover:bg-white border m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 flex justify-between"
        >
          <div className="z-20">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Expression ecrite{" "}
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Explore the Next.js 13 playground.
            </p>
          </div>
          <div className=" absolute lg:relative opacity-20 group-hover:opacity-100">
            <Image
              className=" dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
              src="/assets/images/form.jpg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
        </Link>

        <Link
          href="/series/questionExpressionOrale"
          className="group rounded-lg relative overflow-hidden hover:bg-white border border-1 m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 flex justify-between"
        >
          <div className="z-20">
            <h2 className={`mb-3 text-2xl font-semibold`}>Expression orale </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </div>

          <div className="absolute lg:relative opacity-20 group-hover:opacity-100">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
              src="/assets/images/expression.jpg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
        </Link>
      </div>
    </main>
  );
}
