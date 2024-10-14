import axios from "axios";

interface sinupProps {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
export const signup = async ({
  email,
  firstname,
  lastname,
  password,
}: sinupProps) => {
  const response = await axios.post("http://localhost:8000/api/v1/signup", {
    firstname,
    lastname,
    email,
    password,
  });

  return response.data;
};
