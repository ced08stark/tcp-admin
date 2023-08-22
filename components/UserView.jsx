import React, {useState, useEffect} from 'react'
import * as Icons from "@heroicons/react/24/outline";
import GetCookies from "../hooks/getCookies";
import { instance } from "../hooks/Axios";
import { setUser, selectUser } from "../featured/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setTests, selectTest } from "../featured/testSlice";
import TestComponent from "../components/TestComponent"

function UserView() {
    const currentUser = useSelector(selectUser);
    const token = GetCookies("token");
    const currentTests = useSelector(selectTest)
    const close = () => {
      const lightbox = document.querySelector("#lightbox2");
      lightbox.classList.remove("scale-100");
      lightbox.classList.add("scale-0");
    };

  return (
    <section
      className="fixed  z-50 flex inset-0 w-full h-full dark:text-white flex-col  items-center justify-center transition-all duration-300 scale-0 overflow-y-auto"
      id="lightbox2"
    >
      <div
        className="flex-col p-4 space-y-2   overflow-y-auto overflow-x-hidden  flex rounded-md bg-white dark:bg-gray-800 w-[90%]  h-auto    sm:p-0 shadow-lg shadow-black "
        id="lightbox-body"
      >
        <div className="flex justify-between items-center">
          <span className="text-xl sm:text-xl font-bold ">User view</span>
          <Icons.XMarkIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => close()}
          />
        </div>
        <span>{currentUser?.email}</span>
        {currentTests?.length > 0 ?
        currentTests?.map((item, index) => (
          <TestComponent key={index} item={item} id={index + 1} />
        )) : <span className='text-center'> Aucun test</span>}
      </div>
    </section>
  );
}

export default UserView
