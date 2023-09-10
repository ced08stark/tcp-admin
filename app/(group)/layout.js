"use client";
import "../../assets/css/demo.css";
import "../../assets/vendor/css/theme-default.css";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../../assets/vendor/libs/apex-charts/apex-charts.css";
import "../../assets/vendor/fonts/boxicons.css";
import "../../assets/vendor/css/core.css";
import "../globals.css";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import * as Icons from "@heroicons/react/24/outline";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Provider } from "react-redux";
import { store } from "../../store";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "TCP-ADMIN",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const [showMenu, setShowMenu] = useState(false);

  const onToggleMenu = () => {
    const navLinks = document.getElementById("nav-links");
    if (showMenu) {
      setShowMenu(false);
      navLinks.classList.remove("top-[9%]");
      navLinks.classList.add("top-[-100%]");
    } else {
      setShowMenu(true);
      navLinks.classList.remove("top-[-100%]");
      navLinks.classList.add("top-[9%]");
    }

    console.log(navLinks);
  };
  return (
    <html lang="en">
      <Provider store={store}>
        <Head>
          <title>TCP-ADMIN</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200&family=Rubik:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className={inter.className}>
          <header className="bg-white z-40">
            <nav className="z-40  flex justify-between items-center mx-auto   p-4 lg:px-10 shadow-lg shadow-white">
              <div className="font-bold text-xl text-gray-900">TCP-ADMIN</div>
              <div
                id="nav-links"
                className="z-40 duration-500 md:static absolute bg-white md:min-h-fit min-h-[45vh] md:w-auto  left-0 top-[-100%] w-full flex items-center px-5"
              >
                <ul className="flex w-full xs:flex-col md:flex-row  md:items-center md:gap-[4vw] gap-6">
                  <li className="w-full text-gray-900 p-2  rounded-full hover:bg-gray-900 group cursor-pointer">
                    <Link
                      className=" group-hover:font-bold group-hover:px-10 group-hover:text-white "
                      href="/dashboard"
                      onClick={() => onToggleMenu()}
                    >
                      dashboard
                    </Link>
                  </li>
                  <li className="w-full text-gray-900 p-2 rounded-full hover:bg-gray-900 group cursor-pointer">
                    <Link
                      className=" group-hover:font-bold group-hover:px-10 group-hover:text-white "
                      href="/questions"
                      onClick={() => onToggleMenu()}
                    >
                      questions
                    </Link>
                  </li>
                  <li className="w-full text-gray-900 p-2 rounded-full hover:bg-gray-900 group cursor-pointer">
                    <Link
                      className=" group-hover:font-bold group-hover:px-10 group-hover:text-white "
                      href="/users"
                      onClick={() => onToggleMenu()}
                    >
                      users
                    </Link>
                  </li>
                  <li className="w-full text-gray-900 p-2 rounded-full hover:bg-gray-900 group cursor-pointer">
                    <Link
                      className=" group-hover:font-bold group-hover:px-10 group-hover:text-white "
                      href="#"
                      onClick={() => onToggleMenu()}
                    >
                      about
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="bg-gray-900 text-white px-3 py-1 rounded-full"
                >
                  sign out
                </Link>
                {!showMenu ? (
                  <Bars3BottomRightIcon
                    className="w-8 h-8 cursor-pointer md:hidden"
                    onClick={() => onToggleMenu()}
                  />
                ) : (
                  <XMarkIcon
                    className="w-8 h-8 cursor-pointer md:hidden"
                    onClick={() => onToggleMenu()}
                  />
                )}
                {/* <Bars3BottomRightIcon
                  className="w-8 h-8 cursor-pointer md:hidden"
                  onClick={(e) => onToggleMenu(e)}
                /> */}
              </div>
            </nav>
          </header>

          {children}
        </body>
      </Provider>
    </html>
  );
}
