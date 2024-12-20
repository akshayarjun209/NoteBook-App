"use client"
// import Form from '@/components/Form'
import React, {useState } from 'react'
import {useRouter} from "next/navigation";

export default function page() {
const [title, setTitle]= useState('');
const[description, setDescription]= useState('');

const router= useRouter();
const handleSubmit=async(e)=>{
  e.preventDefault();
  if(!title||! description){
    alert("Title and Description are required.")
    return;
  }
  try{
    const res= await fetch('http://localhost:3000/api/topics',{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({title,description}),
      
    });
    if(res.ok){
      router.push('/');
    }else{
      throw new Error("failed to create a Topic");
    }

  }catch(error)
  {
    console.log(error);
  }
}


  return (
    <div className='flex items-center justify-center mt-8 flex-col '>
        <h2 className="font-extrabold text-3xl mb-8 ">Add Topic</h2>
        
        {/* <Form btnname='Add Topic'/> */}
       
        <form onSubmit={handleSubmit} className='border-2  p-5 rounded-lg flex flex-col gap-3 w-[30%] hover:border-indigo-700'>

           <input type="text" name="name" placeholder='Enter Title' className='border-2 p-2 w-full mt-3'  value={title} onChange={(e)=>setTitle(e.target.value)}/>
           
           <input name="description" placeholder='Enter Description'  className='border-2 p-2 w-full mt-3'  value={description} onChange={(e)=>setDescription(e.target.value)} />
           
           <button type='submit' className=' bg-orange-600 px-6 py-2 w-max mt-3 mx-auto rounded-md text-white font-semibold hover:bg-indigo-700'  >Add Topic</button>

        </form>
    </div>
  )
}


function generateMetadata(){
    return{
        title:"Add Topic"
    }
}
 