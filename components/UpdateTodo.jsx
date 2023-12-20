"use client";
import {
  taskLoading,
  updateTask,
} from "@/lib/redux/slices/TodoSlice/TodoSlice";
import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateTodo = ({ updateId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const TaskList = useSelector((state) => state.todos);
  const getDatabyID = TaskList.todos.find((c, i) => {
    return c._id == updateId;
  });
  const [description, setDescription] = useState(getDatabyID?.description);
  const updateTodo = async () => {
    try {
      if (!description) {
        return toast.error("Please fill update the task name");
      }
      dispatch(taskLoading(true));
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/todo/${updateId}`,
        { description }
      );
      dispatch(updateTask(res.data.data));
      toast.success(res.data.message);
      setDescription("");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <h1>
        <span>
          <b>Update task with id:</b>
        </span>{" "}
        ${updateId}
      </h1>
      <div className="flex mt-4 bg-gray-900 p-8 rounded-lg  ">
        <Input
          color="blue"
          label="Update Task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          color="green"
          className="pl-1.5 ml-2 overflow-auto"
          onClick={() => updateTodo()}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdateTodo;
