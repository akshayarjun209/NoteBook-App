"use client"
import React, { useEffect, useState } from 'react'
// import React from 'react'
import RemoveBtn from './RemoveBtn'
import Link from 'next/link'
import { FaRegEdit } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { GiNotebook } from "react-icons/gi";

// const getTopics = async()=>{

//   try{
//     const topics = await fetch("http://localhost:3000/api/topics", { cache: "no-store" });
//     console.log("topics");
//     if(!topics){
//       throw new Error("Failed to fetch topics")
//     }
//     return await topics.json()

//   }catch(error){
//     console.log(error)
//   }

// }
// export default async function TopicLists() {
export default function TopicLists() {

  const colors = ["#AD70E2", "#FA5A7D", "#EAE441", "#84F4C1", "#F2A0EE", "#989FF6", "#FFFFCB","#E1FFDD","#f3c4c8","#f3c4c8" ];

   const[topics, setTopics]=useState([]);
   useEffect(() => {
    const fetchTopics = async () => {
      try {
        const resp = await fetch("http://localhost:3000/api/topics", { cache: "no-store" });
        if (!resp.ok) {
          throw new Error(`Failed to fetch topics: ${resp.statusText}`);
        }
        const data = await resp.json();
        setTopics(data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []); 

// const topics = await getTopics();

  return (
    <>
    <div className="flex justify-center  p-4 bg-[#E1FFDD] mb-5 rounded-md">
      <h3 className='text-xl font-bold'>My Notes</h3>
      <p className=" flex ml-10 text-lg font-semibold "><GiNotebook size={25}/> {topics.length} </p>
    </div>

    {
      topics.length === undefined ? (
        <h2 className="font-extrabold text-3xl mt-20 text-center ">No Topics Available</h2>
      ) : (
        <div className='grid grid-cols-4 gap-6 '>
   { topics.map((topic, index) =>( 
    // <div className= "flex justify-between items-center w-[80%] mx-auto border-indigo-900 border-2 p-6 px-14 mb-4  hover:border-orange-600 rounded-md" key={index} style={{ backgroundColor: colors[index % 10] }}>
    //     <div>
    //         <h2 className="font-bold text-xl">{topic.title}</h2>
        
    //         <p className="text-lg">{topic.description}</p>
           
    //     </div>

    //     <div className='flex gap-7'  >
    //         {/* <RemoveBtn id={topic._id} setTopics={setTopics}/> */}
    //         <RemoveBtn id={topic._id} />
    //         <Link href={`/edittopic/${topic._id}`} className='hover:scale-125 '><FaRegEdit size={25} color="green"/></Link>
    //     </div>
    // </div>

     
          <div className='bg-slate-700 p-6 rounded-lg flex flex-col justify-between gap-5 shadow-xl ' key={index} style={{ backgroundColor: colors[index % 10] }}>
            <div className="flex flex-col justify-center items-center gap-3">
              <TiPin size={25} color='white' />
              <h2 className="font-bold text-xl text-center">{topic.title}</h2>
              <p className="text-lg ">{topic.description.length > 50 ? topic.description.slice(0, 110) + "..." : topic.description}</p>
            </div>
            <div className='flex justify-between gap-7'  >
              <RemoveBtn id={topic._id} />
              <Link href={`/edittopic/${topic._id}`} className='hover:scale-125 '><FaRegEdit size={25} color="green"/></Link>
             </div>
          </div>
 ))}
       </div>

      )}

    
     
    </>
  )
}

