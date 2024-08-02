import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchTodoById, updateTodo, deleteTodo } from "../Redux/todosSlice";
import Cookies from "js-cookie";

const TodoCard = ({ component }) => {
  const { id, title, description, completed } = component;
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableDescription, setEditableDescription] = useState(description);
  const [editableCompleted, setEditableCompleted] = useState(completed);
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");

  const handleSave = () => {
    const updatedTodo = {
      id,
      title: editableTitle,
      description: editableDescription,
      completed: editableCompleted,
    };
    dispatch(updateTodo(updatedTodo)).then(() => {
      // Fetch all todos again to ensure the state is updated
      dispatch(fetchTodoById(userId));
    });
  };

  const handleDelete = async () => {
    try {
      // Dispatch the delete action
      await dispatch(deleteTodo(id));

      // Optionally, fetch all todos again to ensure the state is updated
      // If you want to refetch all todos, dispatch fetchTodos
      // If not, this is optional and depends on your app logic
      dispatch(fetchTodoById(userId));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  console.log("todocard refresh");

  return (
    <div className="w-[250px] p-4 bg-[#9370DB] border border-[#6A5ACD] rounded-lg shadow-lg">
      <p className="capitalize text-[#F8F8FF] font-semibold mb-2">{title}</p>
      <p className="capitalize text-[#F8F8FF] text-sm mb-4">{description}</p>
      <p
        className={`text-xs font-medium mb-4 ${
          completed ? "text-[#F8F8FF]" : "text-red-900"
        }`}
      >
        {completed ? "Completed" : "Not Completed"}
      </p>

      <Dialog>
        <div className="flex gap-5 items-center">
          <DialogTrigger asChild>
            <AiFillEdit className="text-[#00FA9A] hover:text-[#00FACC] text-3xl cursor-pointer transition-transform transform hover:scale-110" />
          </DialogTrigger>
          <span>
            <MdDelete
              onClick={handleDelete}
              className="text-[#FF4500] text-3xl hover:text-red-500 cursor-pointer transition-transform transform hover:scale-110"
            />
          </span>
        </div>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Edit TODO
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Make changes to your TODO here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="title"
                className="text-right font-medium text-gray-700"
              >
                Title
              </Label>
              <Input
                id="title"
                value={editableTitle}
                onChange={(e) => setEditableTitle(e.target.value)}
                className="col-span-3 border-gray-300 focus:border-[#6A5ACD] focus:ring-[#6A5ACD]"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="description"
                className="text-right font-medium text-gray-700"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={editableDescription}
                onChange={(e) => setEditableDescription(e.target.value)}
                className="col-span-3 border-gray-300 focus:border-[#6A5ACD] focus:ring-[#6A5ACD]"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="completed"
                className="block text-sm font-medium text-gray-700"
              >
                Completed
              </Label>
              <select
                id="completed"
                value={editableCompleted ? "true" : "false"}
                onChange={(e) =>
                  setEditableCompleted(e.target.value === "true")
                }
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:border-[#6A5ACD] focus:ring-[#6A5ACD]"
              >
                <option value="false">Not Completed</option>
                <option value="true">Completed</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={handleSave}
              className="bg-[#6A5ACD] hover:bg-[#5F4B8B] text-white"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoCard;
