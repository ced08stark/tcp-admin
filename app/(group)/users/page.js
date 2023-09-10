"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import UserRow from "../../../components/UserRow"
import GetCookies from "../../../hooks/getCookies";
import { instance, baseUrlImg } from "../../../hooks/Axios";
import { useDispatch, useSelector } from "react-redux";
import UserView from "../../../components/UserView"


function UserPage() {

    const [users, setUsers] = useState([]);
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

    useEffect(() => {
      getUsers();
    }, []);

  return (
    <main className="pt-12 p-4">
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
                        email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        phone
                      </th>
                      <th scope="col" className="px-6 py-4">
                        role
                      </th>
                      <th scope="col" className="px-6 py-4">
                        remain
                      </th>
                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.length > 0?
                    users?.map((item, index) => (
                      <UserRow item={item} key={index} id={index + 1} setUsers={setUsers} />
                    )) : <></>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
         
          
        </div>
      </div>
      <UserView  />
    </main>
  );
}

export default UserPage;
