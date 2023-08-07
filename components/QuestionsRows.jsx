import React from 'react'
import * as Icons from "@heroicons/react/24/outline"


function QuestionsRows() {
  return (
    <tr className="even:bg-gray-100 border-b dark:border-neutral-500 transition duration-300 ease-in-out hover:even:bg-white hover:bg-neutral-100 cursor-pointer">
      <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
      <td className="whitespace-nowrap px-6 py-4">
        quel est la superficie du cameroun ?
      </td>
      <td className="whitespace-nowrap px-6 py-4">A2</td>
      <td className="whitespace-nowrap px-6 py-4">mathematique</td>
      <td className="whitespace-nowrap px-6 py-4">3 min</td>
      <td className="whitespace-nowrap px-6 py-4">
        <button
          className="bg-red-500 inline-block text-white text-sm font-medium px-5 py-2 cursor-pointer border-0 shadow-sm shadow-black/40 uppercase relative 
        before:absolute before:w-full before:h-full before:inset-0  
        before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-all 
        before:rounded-full hover:before:rounded-none"
        >
          <Icons.TrashIcon className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

export default QuestionsRows
