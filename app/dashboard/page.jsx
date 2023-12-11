import AddTodo from "@/components/AddTodo";
import DeleteButton from "@/components/DeleteButton";
import { EditIcon } from "@/components/EditIcon";
import axios from "axios";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function getTodolist() {
  try {
    const res = await axios.get("http://localhost:3000/api/todo");
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
        {data?.map((todo) => {
          return (
            <div className="flex p-4 " key={todo._id}>
              <div className="ml-8">
                {" "}
                <b>Title</b>: {todo.description}
              </div>
              <DeleteButton className="ml-8" id={todo._id} />
              <div className="bg-black text-white rounded p-2 ml-8">
                <Link href={`/updateTodo/${todo._id}`}>Edit</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
