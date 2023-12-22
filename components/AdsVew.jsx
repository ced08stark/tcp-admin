"use client";
import Image from "next/image";
import { View, Text } from "react-native";
import React from "react";
import * as Icons from "@heroicons/react/24/outline";
import GetCookies from "../../../hooks/getCookies";
import { baseUrlFile } from "../../../hooks/Axios";
import { selectAds, setAds } from "../../../featured/adsSlice";
import { instance, baseUrlImg } from "../../../hooks/Axios";
import { useSelector, useDispatch } from "react-redux";

const AdsVew = () => {
     const [adsList, setAdsList] = useState([]);
     const currentAds = useSelector(selectAds);
     const [image, setImage] = useState("null");
     const token = GetCookies("token");
     const [isLoading, setIsLoading] = useState(false);
     const [isUploading, setIsUploading] = useState(false);
      const [isUploading2, setIsUploading2] = useState(false);

     const handleUpdate = async () => {
       setIsLoading(true);
       const data = await instance
         .post(
           `/api/ads/ads/${currentAds.id}`,
           {
             nomPrestataire: currentAds.nomPrestataire,
             adsPicture: currentAds.adsPicture,
             startDate: currentAds.startDate,
             endDate: currentAds.endDate,
             localisation: currentAds.localisation,
             linkTarget: currentAds.linkTarget,
             countClic: currentAds.countClic,
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
         alert("success");
         getAdsList();
       }
     };

     const handleSetUpdatePicture = async () => {
       const formData = new FormData();
       formData.append("files", e.target.files[0]);

       setIsUploading2(true);
       const data = await instance.post("api/question/upload", formData, {
         headers: {
           Authorization: `basic ${token}`,
           "Content-type": "multipart/form-data",
         },
       });
       setIsUploading2(false);

       if (data) {
         setImage(data?.data.file);
       }
     };

     const handleSetPicture = async (e) => {
       const formData = new FormData();
       formData.append("files", e.target.files[0]);

       setIsUploading(true);
       const data = await instance.post("api/question/upload", formData, {
         headers: {
           Authorization: `basic ${token}`,
           "Content-type": "multipart/form-data",
         },
       });
       setIsUploading(false);

       if (data) {
         setAds({ ...ads, adsPicture: data?.data.file });
       }
     };

     const handleSelect = (ranges) => {
       setDateStart(ranges.selection.startDate);
       setDateEnd(ranges.selection.endDate);
       console.log(ranges);

       // {
       //   selection: {
       //     startDate: [native Date Object],
       //     endDate: [native Date Object],
       //   }
       // }
     };

     const selectionRange = {
       startDate: startDate,
       endDate: endDate,
       key: "selection",
     };


  const close = () => {
    const lightbox = document.querySelector("#lightbox");
    lightbox.classList.remove("scale-100");
    lightbox.classList.add("scale-0");
  };

  return (
    <section
      className="fixed z-50 sm:flex lg:hidden inset-0 w-full h-full dark:text-white flex-col  items-center justify-center transition-all duration-300 scale-0 overflow-y-auto"
      id="lightbox"
    >
      <div
        className="flex-col p-4 space-y-2   overflow-y-auto overflow-x-hidden  flex rounded-md bg-white dark:bg-gray-800 w-full  h-auto    sm:p-0 shadow-lg shadow-black "
        id="lightbox-body"
      >
        <div className="flex justify-between items-center">
          <span className="text-xl sm:text-xl font-bold ">Ads view</span>
          <Icons.XMarkIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => close()}
          />
        </div>
        <div className="xs:hidden lg:scale-100 lg:flex flex-1 space-y-2 flex-col bg-white p-3  h-full overflow-y-auto">
          <div className="col-span-full">
            <div className="mt-2 bg-white flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  ></label>
                  <div className="mt-2 bg-white flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <div className="w-full  justify-center flex">
                        <Image
                          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                          src={`${
                            image != "null"
                              ? `${baseUrlFile}${image}`
                              : `${baseUrlFile}${currentAds?.adsPicture}`
                          }`}
                          alt="Next.js Logo"
                          width={180}
                          height={37}
                          priority
                        />
                      </div>
                      <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>

                          {/* <UploadButton
                                      endpoint="imageUploader"
                                      onClientUploadComplete={(res) => {
                                        if (res) {
                                          setImage(res[0].fileUrl);
                                          alert("Upload Completed");
                                        }
                                        // Do something with the respons
                                      }}
                                      onUploadError={(error) => {
                                        // Do something with the error.
                                        alert(`ERROR! ${error.message}`);
                                      }}
                                    /> */}
                          <div className="w-full border-dashed border-2 cursor-pointer bg-white border-indigo-500 h-[100px] flex item-center justify-center">
                            <input
                              type="file"
                              className="w-full h-full opacity-0 cursor-pointer absolute"
                              onChange={handleSetUpdatePicture}
                            />
                          </div>

                          {/* <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          ref={fileRef}
                          onChange={() =>
                            setQuestion({
                              ...question,
                              libelle: fileRef.current.files[0],
                            })
                          }
                        /> */}
                        </label>
                        {/* <p className="pl-1">or drag and drop</p> */}
                      </div>
                      {/* <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB Or mp4 file
                    </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <span className="font-bold">Nom prestataire : </span>
            <input
              type="text"
              placeholder={currentAds?.nomPrestataire}
              className="flex-1"
              onChange={(e) =>
                setAds({ ...currentAds, nomPrestataire: e.target.value })
              }
            />
          </div>
          <div className="flex">
            <span className="font-bold">localisation : </span>
            <input
              className="flex-1"
              type="text"
              placeholder={currentAds?.localisation}
              onChange={(e) =>
                setAds({ ...currentAds, localisation: e.target.value })
              }
            />
          </div>
          <div className="flex">
            <span className="font-bold">start date : </span>
            <input
              className="flex-1"
              type="text"
              placeholder={currentAds?.startDate}
            />
          </div>
          <div className="flex">
            <span className="font-bold">end date : </span>
            <input
              className="flex-1"
              type="text"
              placeholder={currentAds?.endDate}
            />
          </div>
          <div className="flex">
            <span className="font-bold">link target : </span>
            <input
              className="flex-1"
              type="text"
              placeholder={currentAds?.linkTarget}
              onChange={(e) =>
                setAds({ ...currentAds, linkTarget: e.target.value })
              }
            />
          </div>
          <div className="mt-10  h-[100px] flex items-center justify-center w-full">
            {!isLoading ? (
              <button
                onClick={() => handleUpdate()}
                className="bg-green-500 inline-block text-white text-sm font-medium px-10 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md"
              >
                save modification
              </button>
            ) : (
              <button
                disabled
                className="bg-green-500 flex items-center space-x-2 text-white text-sm font-medium px-10 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md"
              >
                <span>update question</span>

                <div
                  class="spinner-border spinner-border-sm text-white"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
            )}
          </div>
        </div>
        <div className="mt-10  h-[100px] flex items-center justify-center w-full">
          {!isLoading ? (
            <button
              onClick={() => handleUpdate()}
              className="bg-green-500 inline-block text-white text-sm font-medium px-10 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md"
            >
              save modification
            </button>
          ) : (
            <button
              disabled
              className="bg-green-500 flex items-center space-x-2 text-white text-sm font-medium px-10 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md"
            >
              <span>update question</span>

              <div
                class="spinner-border spinner-border-sm text-white"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdsVew;
