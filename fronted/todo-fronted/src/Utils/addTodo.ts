import axios from "axios";

interface addTodoProps {
  title: string;
  description: string;
  token: string;
}

export const addTodo = async ({ title, description, token }: addTodoProps) => {
  // added the todo successfully.
  const response = await axios.post(
    "https://todo-app-end-to-end.onrender.com/api/v1/addTodo",
    {
      title,
      description,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data.data;
};
