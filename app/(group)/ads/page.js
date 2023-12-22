"use client";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AdsRows from "../../../components/AdsRow";
import * as Icons from "@heroicons/react/24/outline";
import GetCookies from "../../../hooks/getCookies";
import { baseUrlFile } from "../../../hooks/Axios";
import { selectAds, setAds } from "../../../featured/adsSlice";
import { instance, baseUrlImg } from "../../../hooks/Axios";
import { useSelector, useDispatch } from "react-redux";
import { DateRangePicker } from "react-date-range";

function Evenement() {
  const [adsList, setAdsList] = useState([]);
  const currentAds = useSelector(selectAds);
  const [image, setImage] = useState("null");
  const token = GetCookies("token");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploading2, setIsUploading2] = useState(false);
  const [startDate, setDateStart] = useState(new Date());
  const [endDate, setDateEnd] = useState(new Date());
  const [ads, setAds] = useState({
    nomPrestataire: null,
    linkTarget: null,
    startDate: new Date(),
    endDate: new Date(),
    adsPicture: null,
    localisation: null,
  });

   const getAdsList = async () => {
     const data = await instance
       .get(`/api/ads/ads`, {
         headers: {
           Authorization: `basic ${token}`,
         },
       })
       .catch((err) => console.log(err.message));

     if (data) {
       setAdsList(data?.data);
     } else {
       console.log("nononono");
     }
   };

  const handleCreated = async () => {
      setIsLoading(true)
      const data = await instance
        .post("/api/ads/created", 
        {
            nomPrestataire: ads.nomPrestataire,
            adsPicture: ads.adsPicture,
            startDate: startDate,
            endDate: endDate,
            localisation: ads.localisation,
            linkTarget: ads.linkTarget,
            countClic: 0
        }, 
        {
          headers: {
            Authorization: `basic ${token}`,
          },
        })
        .catch((err) => console.log(err.message));
      setIsLoading(false)



      if (data) {
        alert('success')
        getAdsList()
      }
  };

  const handleUpdate = async () => {
       setIsLoading(true);
       const data = await instance
         .patch(
           `/api/ads/ads/${currentAds.id}`,
           {
             nomPrestataire: currentAds.nomPrestataire,
             adsPicture: currentAds.adsPicture,
             startDate: currentAds.startDate,
             endDate: currentAds.endDate,
             localisation: currentAds.localisation,
             linkTarget: currentAds.linkTarget,
             countClic: currentAds.countClic
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
      }
    });
    setIsUploading(false);

    if (data) {
      setAds({...ads, adsPicture: data?.data.file});
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


  useEffect(() => {
    getAdsList();
  }, []);


  return (
    <div>
      <div className="w-full border">
        <div className="w-full p-3 flex flex-col md:flex-row space-x-4 justify-between ">
          <div className="w-full my-3 md:w-1/2 space-y-2">
            <input
              type="text"
              onChange={(e) => {
                setAds({ ...ads, nomPrestataire: e.target.value });
              }}
              className="peer p-2 block min-h-[auto] bg-white w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
              placeholder="entrer le nom du prestataire"
            />
            <input
              type="text"
              onChange={(e) => {
                setAds({ ...ads, linkTarget: e.target.value });
              }}
              className="peer p-2 block min-h-[auto] bg-white w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
              placeholder="entrer un lien"
            />
            <input
              type="text"
              onChange={(e) => {
                setAds({ ...ads, localisation: e.target.value });
              }}
              className="peer p-2 block min-h-[auto] bg-white w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-none "
              placeholder="entrer une adresse"
            />
            <div>
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                minDate={new Date()}
                rangeColors={["sky"]}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <div className="w-full border-indigo-500 border-2 cursor-pointer h-[200px] flex item-center justify-center">
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-full object-contain"
                src={`${`${baseUrlFile}${ads.adsPicture}`}`}
                alt="Next.js Logo"
                width={250}
                height={50}
                priority
              />
            </div>
            <div className="w-full border-dashed border-2 cursor-pointer bg-white border-indigo-500 h-[200px] flex item-center justify-center">
              <div className="flex items-center justify-center">
                {!isUploading ? (
                  <Icons.ArrowDownTrayIcon
                    className="text-indigo-500 text-lg w-10 h-10"
                    size={16}
                  />
                ) : (
                  <div
                    class="spinner-border text-lg spinner-border-sm text-indigo-500"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                )}
                <span className="text-indigo-500 ">upload file </span>
              </div>
              <input
                type="file"
                className=" h-full opacity-0 cursor-pointer absolute"
                onChange={handleSetPicture}
              />
            </div>
            {!isLoading ? (
              <button
                onClick={() => handleCreated()}
                className="bg-green-500 inline-block text-white text-sm font-medium px-10 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md"
              >
                {"creer l' evenement"}
              </button>
            ) : (
              <button
                disabled
                className="bg-green-500 flex items-center space-x-2 text-white text-sm font-medium px-10 py-2 cursor-pointer border-0 shadow-sm shadow-black/40  relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none rounded-md"
              >
                <span>create question</span>
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
      </div>
      <div className="flex h-screen m-4">
        <div
          className={`flex flex-col overflow-x-auto w-full  lg:overflow-y-auto ${
            currentAds?.nomPrestataire ? `lg:w-[70%]` : `lg:w-full`
          }  bg-white`}
        >
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium bg-gray-50 dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="px-6 py-4">
                        nom du centre
                      </th>
                      <th scope="col" className="px-6 py-4">
                        date debut
                      </th>
                      <th scope="col" className="px-6 py-4">
                        date fin
                      </th>
                      <th scope="col" className="px-6 py-4">
                        lien
                      </th>
                      <th scope="col" className="px-6 py-4">
                        adresse
                      </th>
                      <th scope="col" className="px-6 py-4">
                        clic
                      </th>

                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {adsList.length > 0 ? (
                      adsList.map((item, index) => (
                        <AdsRows
                          item={item}
                          setItems={setAdsList}
                          key={index}
                          id={index + 1}
                        />
                      ))
                    ) : (
                      <></>
                    )}

                    {/* {questions.length > 0 ? (
                          questions
                            ?.filter((item) =>
                              filter.name == "consigne"
                                ? item?.consigne?.includes(filter.value)
                                : filter.name == "numero"
                                ? item?.numero.toString().includes(filter.value)
                                : filter.name == "categorie"
                                ? item?.categorie?.libelle
                                    .toLowerCase()
                                    .includes(filter.value)
                                : filter.name == "discipline"
                                ? item?.discipline?.libelle
                                    .toLowerCase()
                                    .includes(filter.value)
                                : filter.name == "point"
                                ? item?.categorie?.point
                                    .toString()
                                    .includes(filter.value)
                                : item
                            )
                            .map((item, index) => (
                              <QuestionsRows
                                setQuestions={setQuestions}
                                item={item}
                                key={index}
                                id={index + 1}
                              />
                            ))
                        ) : (
                          <></>
                        )} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {currentAds?.nomPrestataire && (
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
        )}
      </div>
    </div>
  );
}

export default Evenement;
