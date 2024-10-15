import axios from "axios";

export const getAllTodos = async ({ token }: { token: string }) => {
  const response = await axios.get("http://ec2-3-108-237-233.ap-south-1.compute.amazonaws.com:8000/api/v1/getAllTodos", {
    headers: {
      Authorization: token,
    },
  });

  return response.data.data;
};
