import { atom } from "recoil";

export const finishedTodoAtom = atom<number>({
  key: "finishedTodoAtom",
  default: 0,
});

export const pendingTodoAtom = atom<number>({
  key: "pendingTodoAtom",
  default: 0,
});
