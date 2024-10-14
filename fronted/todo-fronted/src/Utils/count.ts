interface Todos {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export const countTodos = (
  todos: Todos[]
): { finishedTodos: number; pendingTodos: number } => {
  let finishedTodos = 0,
    pendingTodos = 0;

  todos.map((todo) => {
    if (todo.done) finishedTodos++;
    else pendingTodos++;
    return;
  });

  return { finishedTodos, pendingTodos };
};
