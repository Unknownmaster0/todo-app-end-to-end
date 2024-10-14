import axios from "axios";

export const sigin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post("http://localhost:8000/api/v1/signin", {
    email,
    password,
  });

  return response.data;
};
