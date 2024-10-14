import { useState } from "react";
import { Button } from "../Components/Button";
import { ButtonNavigate } from "../Components/ButtonNavigate";
import { Header } from "../Components/Header";
import { Inputbox } from "../Components/Inputbox";
import { useNavigate } from "react-router-dom";
import { sigin } from "../Utils/signin";
import { style } from "../Utils/style";

export const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleClick = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const response = await sigin({ email, password });

    const token = response.data;
    localStorage.setItem("token", token);

    if (response.success) {
      navigate("/dashboard");
      return;
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        style={style}

        className="w-1/3 p-5 rounded-xl"
      >
        <div>
          <Header value={"Signin"} />
        </div>
        <div>
          <Inputbox
            label="email"
            type="email"
            placeholder="xyz@gmail.com"
            value={email || ""}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <Inputbox
            label="password"
            type="text"
            placeholder="*********"
            value={password || ""}
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <div className="my-5">
            <Button text="Sign-in" onClick={handleClick} />
          </div>
          <div>
            <ButtonNavigate
              text="Create an account: "
              buttonText="Sign-up"
              to="/"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
