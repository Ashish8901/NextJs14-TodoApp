"use client";

import {
  deleteTask,
  taskLoading,
} from "@/lib/redux/slices/TodoSlice/TodoSlice";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const DeleteButton = ({ id }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const Tasklist = useSelector((state) => state.todos);
  const handleDelete = async (id) => {
    try {
      dispatch(taskLoading(true));
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/todo/${id}`
      );
      dispatch(deleteTask(id));
      toast.success(res.data.message);
      router.refresh();
    } catch (error) {
      console.log("error", error);
      toast.error(error.data.message);
    }
  };
  return (
    <div>
      <Button onClick={() => handleDelete(id)} color="red">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="currentColor" strokeLinejoin="round" strokeWidth="4">
            <path fill="red" stroke="black" d="M9 10V44H39V10H9Z"></path>
            <path stroke="#fff" strokeLinecap="round" d="M20 20V33"></path>
            <path stroke="#fff" strokeLinecap="round" d="M28 20V33"></path>
            <path stroke="#000" strokeLinecap="round" d="M4 10H44"></path>
            <path
              fill="#2F88FF"
              stroke="#000"
              d="M16 10L19.289 4H28.7771L32 10H16Z"
            ></path>
          </g>
        </svg>
      </Button>
    </div>
  );
};

export default DeleteButton;
