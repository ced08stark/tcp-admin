import React, {useState} from 'react'

function TabView({item, setItem, currentItem}) {
    

    const handleChangeTab = ()=>{
        if(currentItem === 'Comprehension Question'){
            setItem("Expression Question");
        }
        else{
            setItem("Comprehension Question");
        }
    }

  return (
    <div
      onClick={() => handleChangeTab()}
      className={`${
        currentItem === item
          ? "py-2 px-4  border-gray-900 text-center font-bold text-gray-900 border-b-4 border-l-0 border-r-0 cursor-pointer  border-t-0"
          : "py-2 px-4   border-b-0 text-center border-l-0 border-r-0 cursor-pointer  border-t-0 "
      } `}
    >
      <span className="xs:text-xs md:text-lg">{item}</span>
    </div>
  );
}

export default TabView
