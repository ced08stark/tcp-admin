"use client";
import React, { useState, useEffect } from "react";
import UserRow from "../../../components/UserRow"
import GetCookies from "../../../hooks/getCookies";
import { instance, baseUrlImg } from "../../../hooks/Axios";
import { useDispatch, useSelector } from "react-redux";
import UserView from "../../../components/UserView"
import FilleulsView from "../../../components/FilleulsView"


function UserPage() {

    const [users, setUsers] = useState([]);
    const [isShow, setIsShow] = useState(false)
    const [currentCategorie, setCurrentCategorie] = useState('categories');
    const [search, setSearch] = useState('');
    const token = GetCookies("token");
    
   const getUsers = async () => {
     const data = await instance
       .get("/api/user/users", {
         headers: {
           Authorization: `basic ${token}`,
         },
       })
       .catch((err) => console.log(err.message));
     console.log(data);
     if (data) {
       setUsers(data?.data);
     }
   };

   

   const handleCategorie =()=>{
      if(isShow == true){
        setIsShow(false)
      }
      else{
        setIsShow(true)
      }
   }

    useEffect(() => {
      getUsers();
    }, []);

  return (
    <main className="pt-12 p-4">
      <form class="max-w-lg ">
        <div class="flex items-center">
          <label
            for="search-dropdown"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Your Email
          </label>
          <div>
            <button
              class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
              onClick={() => handleCategorie()}
            >
              {currentCategorie}
              <svg
                class="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div>
              {isShow ? (
                <div
                  id="dropdown"
                  class="z-20 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdown-button"
                  >
                    <li>
                      <button
                        onClick={() => {
                          setCurrentCategorie("email"), setIsShow(false);
                        }}
                        type="button"
                        class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        email
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentCategorie("country"), setIsShow(false);
                        }}
                        class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        country
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentCategorie("role"), setIsShow(false);
                        }}
                        class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        role
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentCategorie("parrain"), setIsShow(false);
                        }}
                        class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        parrain
                      </button>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <div class="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              onChange={(e) => setSearch(e.target.value)}
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search Email, Country, Role..."
              required
            />
            <button
              type="submit"
              class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <div className="flex h-screen">
        <div
          className={`flex flex-col overflow-x-auto w-full  lg:overflow-y-auto bg-white`}
        >
          <div className="sm:-mx-6">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium bg-gray-50 dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="px-6 py-4">
                        id
                      </th>
                      <th scope="col" className="px-6 py-4">
                        email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        phone
                      </th>

                      <th scope="col" className="px-6 py-4">
                        pays
                      </th>
                      <th scope="col" className="px-6 py-4">
                        remain
                      </th>
                       <th scope="col" className="px-6 py-4">
                        code promo
                      </th>
                      <th scope="col" className="px-6 py-4">
                        parrain
                      </th>
                     
                      <th scope="col" className="px-6 py-4">
                        solde
                      </th>
                      <th scope="col" className="px-6 py-4">
                        filleuls
                      </th>
                      <th scope="col" className="px-6 py-4">
                        last connexion
                      </th>
                      <th scope="col" className="px-6 py-4">
                        register at
                      </th>
                      <th scope="col" className="px-6 py-4">
                        role
                      </th>
                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.length > 0 ? (
                      users
                        ?.filter((item) =>
                          currentCategorie == "country"
                            ? item?.pays.toLowerCase().includes(search)
                            : currentCategorie == "role"
                            ? item?.role.toLowerCase().includes(search)
                            : currentCategorie == "parrain"
                            ? item?.parrain?.includes(search)
                            : item?.email.toLowerCase().includes(search)
                        )
                        .map((item, index) => (
                          <UserRow
                            item={item}
                            key={index}
                            id={index + 1}
                            setUsers={setUsers}
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
      </div>
      <UserView />
      <FilleulsView />
    </main>
  );
}

export default UserPage;
