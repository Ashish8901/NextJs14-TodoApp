"use client";
import { addTask, taskLoading } from "@/lib/redux/slices/TodoSlice/TodoSlice";
import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddTodo = () => {
  const dispatch = useDispatch();
  const taskStatus = useSelector((state) => state.todos);
  const router = useRouter();
  const [description, setDescription] = useState("");
  const addTodo = async () => {
    try {
      if (!description) {
        return toast.error("Please fill the task name");
      }
      dispatch(taskLoading(true));
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/todo`,
        {
          description,
        }
      );
      dispatch(addTask(res.data.data));
      toast.success(res.data.message);
      setDescription("");
      router.refresh();
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex mt-4 bg-gray-900 p-8 rounded-lg ">
      <Input
        type="text"
        color="blue"
        label="Add Task"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        color="green"
        className="ml-2 overflow-visible flex "
        onClick={addTodo}
      >
        Add{" "}
        {taskStatus.loading && (
          <div className="ml-4 loader-container">
            <div className="loader"></div>
          </div>
        )}
      </Button>
    </div>
  );
};

export default AddTodo;
