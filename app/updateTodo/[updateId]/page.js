import UpdateTodo from "@/components/UpdateTodo";
import React from "react";

const page = ({ params }) => {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <div>
        <h1 className="p-4 text-red-800">Your Todo's</h1>
        <UpdateTodo updateId={params.updateId} />
      </div>
    </div>
  );
};

export default page;
