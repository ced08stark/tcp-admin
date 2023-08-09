"use client"
import "../assets/css/demo.css";
import "../assets/vendor/css/theme-default.css";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/vendor/libs/apex-charts/apex-charts.css";
import "../assets/vendor/fonts/boxicons.css";
import "../assets/vendor/css/core.css";
import "./globals.css";
import { Inter } from "next/font/google";
import * as Icons from "@heroicons/react/24/outline";
import Head from "next/head";
import Image from "next/image";
import { Provider } from "react-redux";
import { store } from "../store";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "TCP-ADMIN",
//   description: "Generated by create next app",
// };

export default function RootLayout({children}) {
  
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
          <div className="flex justify-between items-center bg-gray-900  p-4 lg:px-10 shadow-lg shadow-white">
            <div className="font-bold text-xl text-white">TCP-ADMIN</div>
            <div className="flex items-center space-x-2">
              <Icons.BellIcon className="w-6 h-6 text-white" />
              <Image
                className="relative  dark:invert w-10 h-10 rounded-full"
                src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
              />
            </div>
          </div>
          {children}
        </body>
      </Provider>
    </html>
  );
}
