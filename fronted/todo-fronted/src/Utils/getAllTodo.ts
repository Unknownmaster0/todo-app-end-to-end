import axios from "axios";

export const getAllTodos = async ({ token }: { token: string }) => {
  const response = await axios.get("http://localhost:8000/api/v1/getAllTodos", {
    headers: {
      Authorization: token,
    },
  });

  return response.data.data;
};
