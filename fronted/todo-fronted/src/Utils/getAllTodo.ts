import axios from "axios";

export const getAllTodos = async ({ token }: { token: string }) => {
  const response = await axios.get("https://todo-app-end-to-end.onrender.com/api/v1/getAllTodos", {
    headers: {
      Authorization: token,
    },
  });

  return response.data.data;
};
