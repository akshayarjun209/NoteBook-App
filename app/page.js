
import TopicLists from "@/components/TopicLists";


export default function Home() {
  return (
    <div className="mt-4 ">
      <TopicLists/>
    
    </div>
  ); 
}


export function generateMetadata(){
  return{
      title:"Note Nest",
      description:"all Notes list display "
  }
}
