import connectMongoDb from "@/libs/db";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

//----------------------------------Create---------------------------------------
export async function POST(request) {
  try {
 
    const { title, description } = await request.json();

  //  console.log(title, description);
   // if (!title || !description) {
    if (!title) {
      return NextResponse.json(  { error: "Title are required" },  { status: 400 });
    }

    await connectMongoDb();

    const existingTopic = await Topic.findOne({ title });
    if (existingTopic) {
      return NextResponse.json({ error: "Topic with this title already exists" },  { status: 400 });
    }

    const newTopic = await Topic.create({ title, description });

    if (!newTopic) {
      return NextResponse.json({ error: "Topic could not be added. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ message: "Topic added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);

    return NextResponse.json(  { error: "Internal Server Error" },  { status: 500 });
  }
}

// -----------------------------Get-------------------------------------------
export async function GET(){
    await connectMongoDb();
    const topics = await Topic.find({});
    if(topics.length === 0){
        return NextResponse.json({ message:"To Do list is Empty" });
    }
    return NextResponse.json(topics);
}
 
//---------------------------Delete------------------------------------------------
// export async function Delete(request){
//   // const id= await request.nextUrl.searchParams.get('id');
//   const { searchParams } =await new URL(request.url);
//   const id =await searchParams.get("id");
//  try{ 
//   await connectMongoDb()
//   await Topic.findByIdAndDelete(id);
//   return NextResponse.json({ message: "Topic deleted successfully" });
//  }catch(error){
//   return NextResponse.json({ message: "Server Error" })
//  }
// }



export async function DELETE(request) {
  try {
    // Parse URL and extract search parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectMongoDb();

    // Find and delete the topic
    const deletedTopic = await Topic.findByIdAndDelete(id);
    if (!deletedTopic) {
      return NextResponse.json(
        { message: "Topic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Topic deleted successfully" });
  } catch (error) {
    console.error("Error deleting topic:", error);
    return NextResponse.json(
      { message: "Server Error while deleting topic" },
      { status: 500 }
    );
  }
}
