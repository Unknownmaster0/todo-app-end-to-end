interface props {
  label: string;
  placeholder: string;
  type: string;
  onChange: any;    // don't know what to give the type of this.
  value: string;
}
export const Inputbox = ({ label, placeholder, type, onChange, value }: props) => {
  return (
    <div className="my-2 px-4">
      <label className="block text-lg text-gray-500 dark:text-slate-800">
        {label}
      </label>

      <input
        onChange={onChange}
        type={type}
        value={value}
        placeholder={placeholder}
        className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
      />
    </div>
  );
};
