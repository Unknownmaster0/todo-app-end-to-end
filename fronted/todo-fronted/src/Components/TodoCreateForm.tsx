import { useState } from "react";
import { Inputbox } from "./Inputbox";
import { Button } from "./Button";
import { addTodo } from "../Utils/addTodo";
import { useNavigate } from "react-router-dom";
import { style } from "../Utils/style";
import { useSetRecoilState } from "recoil";
import { pendingTodoAtom } from "../atoms/countTodos";

export const TodoCreateForm = ({ setTodos }: any) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const setPendingTodos = useSetRecoilState(pendingTodoAtom);

  const handleClick = async function () {
    if (!title || !description) {
      alert("Please enter the proper title and description");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sigin");
      return;
    }

    const newTodo = await addTodo({ title, description, token });
    setPendingTodos((prev) => prev + 1);
    setTodos((prevTodos: any) => [...prevTodos, newTodo]);

    setTitle(null);
    setDescription(null);
  };

  return (
    <div className="p-4 rounded-lg h-72 bg-[#03c6fc]" style={style}>
      <Inputbox
        label="Title:"
        placeholder="title"
        type="text"
        value={title || ""}
        onChange={(e: any) => setTitle(e.target.value)}
      />
      <Inputbox
        label="Description:"
        placeholder="description"
        type="text"
        value={description || ""}
        onChange={(e: any) => setDescription(e.target.value)}
      />
      <Button text="Create Todo" onClick={handleClick} />
    </div>
  );
};
