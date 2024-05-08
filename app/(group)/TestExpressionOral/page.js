"use client";
import React, { useEffect, useState } from "react";
import GetCookies from "../../../hooks/getCookies";
import TestEORow from "../../../components/TestEORow";
import { instance } from "../../../hooks/Axios";

function ExpressionOraleTest() {
  const [tests, setTests] = useState([]);
  const token = GetCookies("token");
  
  const getTest = async () => {
    const data = await instance
      .get("/api/eoTest/tests", {
        headers: {
          Authorization: `basic ${token}`,
        },
      })
      .catch((err) => console.log(err.message));
   
    if (data) {
      setTests(data?.data);
    }
  };

  useEffect(() => {
    getTest();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium bg-gray-50 dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              #
            </th>
            <th scope="col" className="px-6 py-4">
              date
            </th>
            <th scope="col" className="px-6 py-4">
              users
            </th>
            <th scope="col" className="px-6 py-4">
              serie
            </th>
            <th scope="col" className="px-6 py-4">
              test
            </th>
            <th scope="col" className="px-6 py-4">
              status
            </th>
          </tr>
        </thead>
        <tbody>
          {tests
            ?.filter((i) => i.status == "en cours")
            .map((item, index) => (
              <TestEORow item={item} key={index} id={index + 1} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpressionOraleTest;
