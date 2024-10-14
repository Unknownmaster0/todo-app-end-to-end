import { useRecoilValue } from "recoil";
import { style } from "../Utils/style";
import { finishedTodoAtom, pendingTodoAtom } from "../atoms/countTodos";

export const CountTodos = () => {
  const finishedTodos = useRecoilValue(finishedTodoAtom);
  const pendingTodos = useRecoilValue(pendingTodoAtom);

  return (
    <div className="p-5 text-lg text-pretty rounded-xl" style={style}>
      <div>Finished: {finishedTodos} 🎉🎉🎉</div>
      <div>Still on Way: {pendingTodos} 😶‍🌫️😶‍🌫️😶‍🌫️</div>
    </div>
  );
};
