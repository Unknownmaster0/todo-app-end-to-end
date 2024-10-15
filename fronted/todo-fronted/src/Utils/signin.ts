import axios from "axios";

export const sigin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post("https://todo-app-end-to-end.onrender.com/api/v1/signin", {
    email,
    password,
  });

  return response.data;
};
