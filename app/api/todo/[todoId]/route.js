import Todo from "@/models/todoModel";
import { NextResponse } from "next/server";

function getIdFromPathname(string) {
  let parts = string.split("/");
  return parts[parts.length - 1];
}
export async function DELETE(request) {
  try {
    const id = getIdFromPathname(request.nextUrl.pathname);
    await Todo.deleteOne({ _id: id });
    return new NextResponse(
      JSON.stringify(
        { success: true, message: "Task Deleted" },
        { status: 200 }
      )
    );
  } catch (error) {
    console.log("error", error);
    return new NextResponse.json({ error });
  }
}

export async function PUT(request) {
  const { description } = await request.json();
  try {
    const id = getIdFromPathname(request.nextUrl.pathname);
    await Todo.updateOne({ _id: id }, { description });
    return new NextResponse(
      JSON.stringify(
        { success: true, message: "Task Updated" },
        { status: 200 }
      )
    );
  } catch (error) {
    console.log("error", error);
    return new NextResponse.json({ error });
  }
}
