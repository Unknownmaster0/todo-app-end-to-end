import { useState } from "react";
import { Button } from "../Components/Button";
import { ButtonNavigate } from "../Components/ButtonNavigate";
import { Header } from "../Components/Header";
import { Inputbox } from "../Components/Inputbox";
import { useNavigate } from "react-router-dom";
import { signup } from "../Utils/signup";
import { style } from "../Utils/style";

export const Signup = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onClickHandler = async () => {
    if (!firstname || !lastname || !email || !password) {
      alert("Please enter firstname, lastname, email and password");
      return;
    }

    const response = await signup({ firstname, lastname, email, password });

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
        <div className="py-5">
          <Header value={"Sign-Up"} />
        </div>
        <div>
          <Inputbox
            label="firstname"
            type="text"
            placeholder="john"
            value={firstname || ""}
            onChange={(e: any) => setFirstname(e.target.value)}
          />
          <Inputbox
            label="lastname"
            type="text"
            placeholder="bnega don"
            value={lastname || ""}
            onChange={(e: any) => setLastname(e.target.value)}
          />
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
        <div>
          <div>
            <Button text="Sign-up" onClick={onClickHandler} />
          </div>
          <div>
            <ButtonNavigate
              text="Already have an account: "
              buttonText="Sign-in"
              to="/signin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
