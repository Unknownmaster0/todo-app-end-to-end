import axios from "axios";

export const updateTodo = async ({
  token,
  id,
}: {
  token: string;
  id: number;
}) => {
  const response = await axios.post(
    `http://ec2-3-108-237-233.ap-south-1.compute.amazonaws.com:8000/api/v1/updateTodo/${id}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};
