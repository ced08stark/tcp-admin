import React, { useState, useEffect } from "react";
import * as Icons from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import GetCookies from "../hooks/getCookies";
import { instance } from "../hooks/Axios";
import { setCurrentUser, selectUser } from "../featured/userSlice";
import { setTests, selectTest } from "../featured/testSlice";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { Fakemail } from '../test/fake'



function UserRow({ item, id, setUsers }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdateSolde, setIsUpdateSolde] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
   
    const dispatch = useDispatch();
    const token = GetCookies("token");
    const [type, setType] = useState(null);

    
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
       dispatch(setCurrentUser(item));
      
     };

     const showFilleuls = async (filleuls) => {
       let modal = document.querySelector("#lightboxFilleuls");
       modal.classList.remove("scale-0");
      
       // console.log(data);
       if (filleuls) {
         dispatch(setTests(filleuls));
       }
       //dispatch(setQuestion(item));
       dispatch(setCurrentUser(item));
     };


     const renitialiserSolde = async () => {
       // console.log(data);
        setIsUpdateSolde(true)
        const updateSolde = await instance
          .patch(
            `api/user/users/${item._id}`,
            {
              solde: 0,
            },
            {
              headers: {
                Authorization: `basic ${token}`,
              },
            }
          )
          .catch((err) => console.log(err));
          setIsUpdateSolde(false)

           if (updateSolde) {
             setUsers({});
             getUsers();
           } else {
             alert("update user failed");
           }
     };

     const handleUpdate = async () => {
      if(type){
        {type == "admin"
          ? confirmAlert({
              title: `Confirm to update `,
              message: `Etes vous sure de vouloir upgrade ${item.email}`,
              buttons: [
                {
                  label: "Yes",
                  onClick: async () => {
                    setIsUpdate(true);
                    const data = await instance
                      .patch(`/api/user/users/${item._id}`,
                      {
                        role: type,
                      },
                      {
                        headers: {
                          Authorization: `basic ${token}`,
                        },
                      }
                      )
                      .catch((err) => console.log(err));
                    setIsUpdate(false);
                   
                    if (data) {
                      setUsers({});
                      getUsers();
                    } else {
                      alert("update user solde failed");
                    }
                  },
                },
                {
                  label: "No",
                  onClick: () => console.log("Click No"),
                },
              ],
            })
          : confirmAlert({
              title: `Confirm to update `,
              message: `Etes vous sure de vouloir retrograder ${item.email}`,
              buttons: [
                {
                  label: "Yes",
                  onClick: async () => {
                    setIsUpdate(true);
                    const data = await instance
                      .patch(
                        `/api/user/users/${item._id}`,
                        {
                          role: type,
                        },
                        {
                          headers: {
                            Authorization: `basic ${token}`,
                          },
                        }
                      ).catch((err) => console.log(err));
                    setIsUpdate(false);
                    if (data) {
                      setUsers({});
                      getUsers();
                    } else {
                      alert("update user role failed");
                    }
                  },
                },
                {
                  label: "No",
                  onClick: () => console.log("Click No"),
                },
              ],
            })
        }
      }
      else{
        alert('aucun changement sur l\'utilisateur')
      }
  };



      

     

     


  return (
    <tr className="even:bg-gray-100 border-b dark:border-neutral-500 transition duration-300 ease-in-out hover:even:bg-white hover:bg-neutral-100 cursor-pointer">
      <td className="whitespace-nowrap px-6 py-4 font-medium">{id}</td>
      <td className="whitespace-nowrap px-6 py-4">{item?._id}</td>
      <td className="whitespace-nowrap px-6 py-4">{item?.email}</td>
      <td className="whitespace-nowrap px-6 py-4">{item?.phone}</td>
      <td className="whitespace-nowrap px-6 py-4">{item?.pays}</td>
      <td className="whitespace-nowrap px-6 py-4">
        {item?.remain && item?.email != Fakemail
          ? `valable jusqu'a ${new Date(item?.remain).toDateString()}`
          : "aucun abonnement"}
      </td>
      <td className="whitespace-nowrap px-6 py-4">{item?.codePromo}</td>
      <td className="whitespace-nowrap px-6 py-4">{item?.parrain}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <p>{item?.solde ? item?.solde : 0} FCFA</p>
        <button
            onClick={() => renitialiserSolde(item?._id)}
            className="bg-green-500 inline-block text-white text-sm font-medium px-2 py-2 cursor-pointer border-0 shadow-sm shadow-black/40 uppercase relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none"
          >
            {!isUpdateSolde ? (
              <Icons.ArrowPathIcon className="w-4 h-4" />
            ) : (
            <div
              class="spinner-border spinner-border-sm text-white"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          
            )}
          </button>
      </td>
      <td className="whitespace-nowrap px-6 py-4 items-center justify-center flex flex-col">
        <p className="text-center">
          {item?.filleuls?.length ? item?.filleuls?.length : 0} {" filleuls"}
          
        </p>
        {item?.filleuls?.length > 0 ? (
          <button
            onClick={() => showFilleuls(item?.filleuls)}
            className="bg-sky-500 inline-block text-white text-sm font-medium px-2 py-2 cursor-pointer border-0 shadow-sm shadow-black/40 uppercase relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none"
          >
            <Icons.EyeIcon className="w-4 h-4" />
          </button>
        ) : null}
      </td>
      <td className="whitespace-nowrap px-6 py-4">{item?.lastConnexion}</td>
      <td className="whitespace-nowrap px-6 py-4">{item?.createdAt}</td>
      <td className="whitespace-nowrap px-6 py-4">
        {item?.role == "client" ? (
          <select
            className="bg-white"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="client">client</option>
            <option value="correcteur">correcteur</option>
            <option value="admin">admin</option>
          </select>
        ) : (
          <select
            className="bg-white"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="admin">admin</option>
            <option value="client">client</option>
            <option value="correcteur">correcteur</option>
          </select>
        )}
      </td>
      <td className="whitespace-nowrap px-6 space-x-2 py-4">
        <button
          onClick={() => show()}
          className="bg-sky-500 inline-block text-white text-sm font-medium px-2 py-2 cursor-pointer border-0 shadow-sm shadow-black/40 uppercase relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none"
        >
          <Icons.EyeIcon className="w-4 h-4" />
        </button>
        {!isUpdate ? (
          <button
            onClick={() => handleUpdate()}
            className="bg-green-500 inline-block text-white text-sm font-medium px-2 py-2 cursor-pointer border-0 shadow-sm shadow-black/40 uppercase relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none"
          >
            <Icons.ArrowDownTrayIcon className="w-4 h-4" />
          </button>
        ) : (
          <button
            className="bg-green-500 inline-block text-white text-sm font-medium px-2 py-2 cursor-pointer border-0 shadow-sm shadow-black/40 uppercase relative 
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
