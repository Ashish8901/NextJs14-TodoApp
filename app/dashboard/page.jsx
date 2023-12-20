import AddTodo from "@/components/AddTodo";
import DeleteButton from "@/components/DeleteButton";
import { EditIcon } from "@/components/EditIcon";
import axios from "axios";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useId } from "react";

export async function getTodolist() {
  try {
    const res = await axios.get("https://todoappinredux.vercel.app/api/todo");
    return res.data;
  } catch (error) {
    console.log("error", error.message);
  }
}

const Dashboard = async () => {
  const { data } = await getTodolist();
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-between p-24">
      <h1 className="text-green-400 border p-4">
        User successfully logged In, Here you can put anything you want.
      </h1>
      <div>
        <AddTodo />
        <h1 className="p-4 text-red-800">Your Todo's</h1>
        {data?.map((todo) => (
          <div key={todo._id} className="flex flex-col rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  Task Name: {todo.description}
                </p>
              </div>
              <div className="flex space-x-2">
                <DeleteButton id={todo._id} />
                <Link href={`/updateTodo/${todo._id}`}>
                  <div className="text-sm leading-6 rounded p-2 text-white bg-gray-900">
                    Edit
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
