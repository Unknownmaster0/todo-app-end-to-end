import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";
import { Dashboard } from "./Pages/Dashboard";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="">
        <BrowserRouter>
          <Maincomponent />
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

function Maincomponent() {
  return (
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default App;
