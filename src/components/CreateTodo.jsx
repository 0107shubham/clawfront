import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTodoById, addTodo } from "../Redux/todosSlice";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const userId = Cookies.get("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the new TODO object
    const newTodo = {
      userId,
      title,
      description,
      completed: false,
    };

    // Dispatch the addTodo action
    await dispatch(addTodo(newTodo));
    dispatch(fetchTodoById(userId));
    setTitle("");
    setDescription("");

    // Optionally navigate to the TODO list or home page after saving
  };

  return (
    <div className="w-full  mt-5 p-6 bg-[#20B2AA] rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6  text-white">
        Create TODO
      </h2>
      <form className="max-w-xl " onSubmit={handleSubmit}>
        <div className="mb-6">
          <Label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Title
          </Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#20B2AA] focus:border-[#20B2AA]"
            required
          />
        </div>

        <div className="mb-6">
          <Label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#20B2AA] focus:border-[#20B2AA]"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#FF6347] hover:bg-[#FF4500] text-white text-lg font-semibold py-2 rounded-md shadow-md transition-all duration-200"
        >
          Save TODO
        </Button>
      </form>
    </div>
  );
};

export default CreateTodo;
