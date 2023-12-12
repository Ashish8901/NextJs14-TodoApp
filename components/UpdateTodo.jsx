"use client";
import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UpdateTodo = ({ updateId }) => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const updateTodo = async (updateId) => {
    try {
      if (!description) {
        return toast.error("Please fill update the task name");
      }
      const res = await axios.put(`/api/todo/${updateId}`, { description });
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
          onClick={() => updateTodo(updateId)}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdateTodo;
