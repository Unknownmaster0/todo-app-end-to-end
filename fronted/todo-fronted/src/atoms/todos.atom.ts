// import { atom, selector } from "recoil";

export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

// export const todosAtom = atom<Todo[]>({
//   key: "todosAtom",
//   default: [],
// });

// export const todoSelector = selector({
//   key: "todoSelector",
//   get: ({ get }) => ({
//     total: get(todosAtom).length,
//     finished: get(todosAtom).filter((todo) => todo.done),
//     pending: get(todosAtom).filter((todo) => !todo.done),
//   }),
// });
