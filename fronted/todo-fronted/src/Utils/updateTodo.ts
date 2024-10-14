import axios from "axios";

export const updateTodo = async ({
  token,
  id,
}: {
  token: string;
  id: number;
}) => {
  const response = await axios.post(
    `http://localhost:8000/api/v1/updateTodo/${id}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};
