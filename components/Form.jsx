"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Form({ btnname, id, title, description}) {
  const [newTitle, setNewTitle] = useState(title || "");
  const [newDescription, setNewDescription] = useState(description  || "");

  

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      
      });
    
      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      alert("Topic updated successfully!");
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error updating topic:", error);
      alert("An error occurred while updating the topic.");
    }
  };

  useEffect(() => {
    setNewTitle(title || "");
    setNewDescription(description || "");
  }, [title, description]);


  return (
    <form onSubmit={handleSubmit} className="border-2 p-5 rounded-lg flex flex-col gap-3 w-[30%] hover:border-indigo-700">
    
      <input
        type="text"
        name="name"
        placeholder="Enter Title"
        className="border-2 p-2 w-full mt-3"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        
      />

      <input
        type="text"
        name="description"
        placeholder="Enter Description"
        className="border-2 p-2 w-full mt-3"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
    
      />
      
      <button
        type="submit"
        className="bg-orange-600 px-6 py-2 w-max mt-3 mx-auto rounded-md text-white font-semibold hover:bg-indigo-700"
      >
        {btnname}
      </button>
    </form>
 );
}