import React, {useEffect, useState} from 'react'
import * as Icons from "@heroicons/react/24/solid"

function TestComponent({item, id}) {
  const [show, setShow] = useState(false)
  const handleShow = () =>{
    if(show){
      setShow(false)
    }
    else{
      setShow(true)
    }
  }
  const getResponse = () =>{
    //console.log(item?.payload?.length);
    let componentResponse = [];
    const data = JSON.parse(item?.payload);
    for (var i = 0; i < data?.length > 0 ? data?.length : 0; i++) {
        const response = item?.serie?.questions[i].suggestions.filter(
          (val) => data[i].resId == val._id
        );
        componentResponse.push(
          <div
            className={`flex mt-1 p-2 lg:p-3 justify-between px-1 md:last:px-4 w-full border-2 rounded-lg ${
              !response[0]?.isCorrect
                ? " border-red-500 bg-red-200"
                : "border-green-500 bg-green-200"
            }`}
          >
            <span className='text-sm md:text-base'>
              {data[i]?.questionId}: {item?.serie?.questions[i]?.consigne}
            </span>
            <div className="flex items-center">
              <span className="text-sm md:text-base">
                {" "}
                R: {response[0]?.text}{" "}
              </span>
              <span className="text-sm md:text-base">
                {response[0]?.isCorrect ? (
                  <Icons.CheckCircleIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <Icons.XCircleIcon className="w-4 h-4 text-red-500" />
                )}
              </span>
            </div>
          </div>
        );
    }
    return componentResponse;
  }
  return (
    <div className="border rounded-lg">
      <div className="flex justify-between w-full bg-white shadow-lg border p-3 rounded-lg">
        <span className='font-bold'>Test {id}</span>
        <span className='cursor-pointer' onClick={() => handleShow()}>
          {!show ? (
            <Icons.EyeIcon className="w-6 h-6" />
          ) : (
            <Icons.EyeSlashIcon className="w-6 h-6" />
          )}
        </span>
      </div>
      {show && (
        <>
          <div className="flex justify-between mt-2">
            <span className="text-sm px-2 bg-gray-900 rounded-full text-white">
              serie numero: {item?.serie?.libelle}
            </span>
            <span>{new Date(item?.createdAt).toDateString()}</span>
          </div>
          {getResponse()}
          <span className="text-end m-1">score: {item?.resultat} point(s)</span>
        </>
      )}
    </div>
  );
}

export default TestComponent
