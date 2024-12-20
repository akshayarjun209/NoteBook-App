'use client'
import Form from '@/components/Form';
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation';

export default function EditTopic() {
  const params = useParams();
  const { id } = params;
  console.log(id);
  const[topics, setTopics]=useState([]);
  //console.log("topics",topics)
   useEffect(() => {
    const fetchTopics = async () => {
      try {
        const resp = await fetch(`http://localhost:3000/api/topics/${id}`, { cache: "no-store" });
        if (!resp.ok) {
          throw new Error(`Failed to fetch topics: ${resp.statusText}`);
        }
        const data = await resp.json();
        // console.log("data++++++++++++++>",data)
        setTopics(data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, [id]); 


  return (
    <div className="flex items-center justify-center mt-8 flex-col">
      <h2 className="font-extrabold text-3xl mb-8">Edit Note</h2>
     
      <Form
        btnname="Edit Note"
        id={id}
        title={topics.title} 
        description={topics.description} 
        topics={topics}
        // setTopics={setTopics}
      />
    </div>
  );
}

