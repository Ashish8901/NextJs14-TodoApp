"use client";
import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";

const UpdateTodo = ({ updateId }) => {
  const [description, setDescription] = useState("");
  const updateTodo = async (updateId) => {
    const res = await axios.put(`/api/todo/${updateId}`, { description });
    setDescription("");
  };
  return (
    <div>
      <h1>
        <span>
          <b>Update task with id:</b>
        </span>{" "}
        ${updateId}
      </h1>
      <div className="flex ">
        <Input
          color="blue"
          label="Add Task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          color="green"
          className="ml-4"
          onClick={() => updateTodo(updateId)}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdateTodo;
