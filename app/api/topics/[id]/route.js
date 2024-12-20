import connectMongoDb from "@/libs/db";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request,{params}){
    const {id}= params;
    // const{ newTitle: title, newDescription: description}=await request.json();
    const { title, description } = await request.json();
    try{
        await connectMongoDb()
        await Topic.findByIdAndUpdate(id,{title, description},{ new: true });
        return NextResponse.json({message: "Topic updated successfully!"},{status:200});
    }catch(error){
        return NextResponse.json({message: "server error"},{status:500});
    }
}


export async function GET(request,{params}){
    const {id}=params;
    try{
        await connectMongoDb()
        const topic= await Topic.findById(id);
        if(!topic) return NextResponse.json({message: "Topic not found"},{status:404});
        return NextResponse.json(topic,{status:200});
    }catch(error){
        return NextResponse.json({message: "server error"},{status:500});
    }
    
}