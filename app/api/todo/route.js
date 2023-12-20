import connectDB from "@/config/db";
import Todo from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();
export async function GET() {
  try {
    const todos = await Todo.find({});
    return new NextResponse(JSON.stringify({ success: true, data: todos }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse.json({ message: "Error in fetching Todos" });
  }
}

export const POST = async (request) => {
  const { description } = await request.json();
  if (!description) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Description required" }),
      {
        status: 400,
      }
    );
  }

  await connectDB();

  const newTodo = new Todo({ description });

  try {
    await newTodo.save();
    return new NextResponse(
      JSON.stringify(
        {
          success: true,
          message: "Task Added",
          data: newTodo,
        },
        {
          status: 201,
        }
      )
    );
  } catch (error) {
    console.log("error", error);
    return new NextResponse.json({ error, status: 500 });
  }
};
