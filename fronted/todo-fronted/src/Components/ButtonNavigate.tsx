import { Link } from "react-router-dom";

interface props {
  text: string;
  buttonText: string;
  to: string;
}

export const ButtonNavigate = ({ text, buttonText, to }: props) => {
  return (
    <div className="flex justify-center items-center mt-3">
      <span className="text-lg text-slate-900 relative top-2 pr-2 font-medium">{text}</span>
      <Link
        to={to}
        className="cursor-pointer px-6 py-2 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 font-bold"
      >
        {buttonText}
      </Link>
    </div>
  );
};
