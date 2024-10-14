import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RenderComponent } from "../Components/RenderComponent";
import { Header } from "../Components/Header";
import { TodoCreateForm } from "../Components/TodoCreateForm";
import { getAllTodos } from "../Utils/getAllTodo";
import { Button } from "../Components/Button";
import { style } from "../Utils/style";
import { countTodos } from "../Utils/count";
import { CountTodos } from "../Components/CountTodos";
import { Todo } from "../atoms/todos.atom";
import { useSetRecoilState } from "recoil";
import { finishedTodoAtom, pendingTodoAtom } from "../atoms/countTodos";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [username, setUsername] = useState<string>("");

  const setFinishedTodos = useSetRecoilState(finishedTodoAtom);
  const setPendingTodos = useSetRecoilState(pendingTodoAtom);

  useEffect(() => {
    // for validating that only the valid user having token atleast can send this request.
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    (async () => {
      try {
        const response = await getAllTodos({ token });
        setTodos(response.todos); // Make sure this returns an array of objects matching the 'Todo' type
        const cnt = countTodos(response.todos);
        setFinishedTodos(cnt.finishedTodos);
        setPendingTodos(cnt.pendingTodos);

        setUsername(response.username);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    })();
  }, []);

  const onClickHandler = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    return;
  };

  return (
      <div className="w-screen h-screen p-10">
        {/* header component */}
        <div className="pb-5">
          <Header value={`Welcome Back 🎉 - ${username}`} />
        </div>

        {/* log-out button component */}
        <div className="pb-5 flex justify-end">
          <Button text="log out" onClick={onClickHandler} />
        </div>

        <div className="flex justify-around">
          {/* create-todo form and count todo-component */}
          <div className="flex flex-col justify-start space-y-5">
            <TodoCreateForm setTodos={setTodos} />
            {/* if not null, then only render. */}
            <CountTodos />
          </div>

          {/* rendering todos component */}
          <div
            className="p-5 rounded-lg flex justify-around w-1/2 flex-wrap bg-[#03c6fc]"
            style={style}
          >
            {todos &&
              todos.map((todo) => (
                <RenderComponent
                  title={todo.title}
                  description={todo.description}
                  id={todo.id}
                  done={todo.done}
                  key={todo.id}
                />
              ))}
          </div>
        </div>
      </div>
  );
};
