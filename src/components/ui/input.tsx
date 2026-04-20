type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className = "", ...props }: Props) => {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
    />
  );
};

export default Input;