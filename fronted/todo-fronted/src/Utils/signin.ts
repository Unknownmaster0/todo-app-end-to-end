import axios from "axios";

export const sigin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post("http://ec2-3-108-237-233.ap-south-1.compute.amazonaws.com:8000/api/v1/signin", {
    email,
    password,
  });

  return response.data;
};
