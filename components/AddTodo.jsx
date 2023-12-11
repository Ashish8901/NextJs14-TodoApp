"use client";
import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";

const AddTodo = () => {
  const [description, setDescription] = useState("");
  const addTodo = async () => {
    const res = await axios.post("http://localhost:3000/api/todo", {
      description,
    });
    setDescription("");
  };
  return (
    <div className="flex ">
      <Input
        color="blue"
        label="Add Task"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button color="green" className="ml-4" onClick={addTodo}>
        Add
      </Button>
    </div>
  );
};

export default AddTodo;
