import { useEffect, useState } from "react";
import { MarkDoneCheckbox } from "./MarkDoneCheckbox";
import { Todo } from "../atoms/todos.atom";

export const RenderComponent = ({ title, description, id, done }: Todo) => {
  const [isDone, setIsdone] = useState<boolean>(done);

  useEffect(() => {
    setIsdone(done);
  }, [done]);

  return (
    <div className="border border-slate-900 rounded-lg p-3 text-pretty bg-zinc-100 my-2">
      <h1
        className={`text-orange-600 text-pretty p-1 text-lg ${
          isDone ? "line-through" : ""
        }`}
      >
        Title: {title}{" "}
      </h1>
      <h5
        className={`text-green-700 text-pretty p-1 ${
          isDone ? "line-through" : ""
        }`}
      >
        Description: {description}{" "}
      </h5>
      <MarkDoneCheckbox id={id} setIsdone={setIsdone} isDone={isDone} />
    </div>
  );
};
