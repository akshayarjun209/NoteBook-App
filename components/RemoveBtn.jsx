"use client";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

 //export default function RemoveBtn({ id, setTopics }) {
  export default function RemoveBtn({ id }) {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Topic removed successfully!");
          window.location.reload();
         //setTopics((prevTopics) => prevTopics.filter((topic) => topic._id !== id));
        } else {
          throw new Error("Failed to delete the topic.");
        }
      } catch (error) {
        console.error("Error while deleting the topic:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <button
      onClick={removeTopic}
      className="cursor-pointer text-red-700 hover:scale-125"
    >
      <MdDelete size={30} />
    </button>
  );
}


// "use client"
// import React from 'react'
// import { MdDelete } from "react-icons/md";
// import{useRouter} from "next/navigation"
// export default function RemoveBtn({id}) {
//   const router=useRouter();
//   const removeTopic=async()=>{
//     const confirmed= confirm('Are you sure ?');

//     if(confirmed){
//        const res= await fetch(`http://localhost:3000/api/topics?id=${id}`,{
//         method: 'DELETE',
//        });
//        if(res.ok){
//          router.refresh();
//        }
//     }
//   }
  



//   return (
//     <button onClick={removeTopic} className='cursor-pointer text-red-700 hover:scale-125 '>
//        <MdDelete  size={30} />
//     </button>
//   )
// }