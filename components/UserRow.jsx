import React, { useState, useEffect } from "react";
import * as Icons from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import GetCookies from "../hooks/getCookies";
import { instance } from "../hooks/Axios";
import {setUser, selectUser} from "../featured/userSlice"
import { setTests, selectTest } from "../featured/testSlice";
import { confirmAlert } from "react-confirm-alert";


function UserRow({ item, id, setUsers }) {
    const [isLoading, setIsLoading] = useState(false);
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const token = GetCookies("token");
    
    const getUsers = async() =>{
    const data = await instance
        .get(
          "/api/user/users",
          {
            headers: {
              Authorization: `basic ${token}`,
            },
          }
        )
        .catch((err) => console.log(err.message));
        console.log(data)
      if(data){
        setUsers(data?.data)
      }

  }

     const handledelete = async () => {
       confirmAlert({
         title: "Confirm to delete",
         message: "Are you sure to do this.",
         buttons: [
           {
             label: "Yes",
             onClick: async () => {
              setIsLoading(true);
              const data = await instance
                .delete(`/api/user/users/${item._id}`, {
                  headers: {
                    Authorization: `basic ${token}`,
                  },
                })
                .catch((err) => console.log(err));
              setIsLoading(false);
              if (data) {
                setUsers({});
                getUsers();
              } else {
                alert("delete user failed");
              }
             },
           },
           {
             label: "No",
             onClick: () => console.log("Click No"),
           },
         ],
       });
     };

     const show = async () => {
        let modal = document.querySelector("#lightbox2");
        modal.classList.remove("scale-0");
         const data = await instance
           .get(`/api/test/tests/user-info/${item?._id}`, {
             headers: {
               Authorization: `basic ${token}`,
             },
           })
           .catch((err) => console.log(err.message));
         // console.log(data);
         if (data) {
           dispatch(setTests(data?.data));
         }
       //dispatch(setQuestion(item));
       dispatch(
        setUser(item)
       );
      
     };

     

     


  return (
    <tr
      onClick={() => show()}
      className="even:bg-gray-100 border-b dark:border-neutral-500 transition duration-300 ease-in-out hover:even:bg-white hover:bg-neutral-100 cursor-pointer"
    >
      <td className="whitespace-nowrap px-6 py-4 font-medium">{id}</td>
      <td className="whitespace-nowrap px-6 py-4">{item?.email}</td>
      <td className="whitespace-nowrap px-6 py-4">{item?.phone}</td>
      <td className="whitespace-nowrap px-6 py-4">{item?.role}</td>
      <td className="whitespace-nowrap px-6 py-4">{item?.remail}</td>
      <td className="whitespace-nowrap px-6 py-4">
        {!isLoading ? (
          <button
            onClick={() => handledelete()}
            className="bg-red-500 inline-block text-white text-sm font-medium px-2 py-2 cursor-pointer border-0 shadow-sm shadow-black/40 uppercase relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none"
          >
            <Icons.TrashIcon className="w-4 h-4" />
          </button>
        ) : (
          <button
            className="bg-red-500 inline-block text-white text-sm font-medium px-2 py-2 cursor-pointer border-0 shadow-sm shadow-black/40 uppercase relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none"
          >
            <div
              class="spinner-border spinner-border-sm text-white"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        )}
      </td>
    </tr>
  );
}

export default UserRow;
