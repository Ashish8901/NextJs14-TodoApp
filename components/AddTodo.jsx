"use client";
import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddTodo = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const addTodo = async () => {
    try {
      if (!description) {
        return toast.error("Please fill the task name");
      }
      const res = await axios.post("http://localhost:3000/api/todo", {
        description,
      });
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
      <Button color="green" className="ml-2 overflow-visible" onClick={addTodo}>
        Add
      </Button>
    </div>
  );
};

export default AddTodo;
