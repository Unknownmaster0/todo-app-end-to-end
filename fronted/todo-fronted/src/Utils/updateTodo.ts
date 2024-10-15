import axios from "axios";

export const updateTodo = async ({
  token,
  id,
}: {
  token: string;
  id: number;
}) => {
  const response = await axios.post(
    `https://todo-app-end-to-end.onrender.com/api/v1/updateTodo/${id}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};
