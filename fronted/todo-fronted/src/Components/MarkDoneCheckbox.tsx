import { useNavigate } from "react-router-dom";
import { updateTodo } from "../Utils/updateTodo";
import { useSetRecoilState } from "recoil";
import { finishedTodoAtom, pendingTodoAtom } from "../atoms/countTodos";

export const MarkDoneCheckbox = ({
  id,
  setIsdone,
  isDone,
}: {
  id: number;
  setIsdone: any;
  isDone: boolean;
}) => {
  const navigate = useNavigate();

  const setPendingTodos = useSetRecoilState(pendingTodoAtom);
  const setFinishedTodos = useSetRecoilState(finishedTodoAtom);

  const onChangeHandler = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const response = await updateTodo({ token, id });

    if (response.data.done) {
      setFinishedTodos((prev) => prev + 1);
      setPendingTodos((todos) => todos - 1);
    } else {
      setFinishedTodos((prev) => prev - 1);
      setPendingTodos((todos) => todos + 1);
    }

    if (!response.success) {
      return <h1> something went wrong !</h1>;
    }

    setIsdone(response.data.done);
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="Done">✅ </label>
      <input
        type="checkbox"
        checked={isDone}
        className="h-4 w-4"
        onChange={onChangeHandler}
      />
    </div>
  );
};
