interface valProps {
  value: string;
}
export const Header = ({ value }: valProps) => {
  return (
    <h2 className="font-bold text-4xl text-blue-900 text-center">{value}</h2>
  );
};
