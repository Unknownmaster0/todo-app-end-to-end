interface btnProps {
  text: string;
  onClick: () => void;
}
export const Button = ({ text, onClick }: btnProps) => {
  return (
    <div className="text-center pt-5">
      <button
        onClick={onClick}
        className="px-6 py-2 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 font-bold"
      >
        {text}
      </button>
    </div>
  );
};
