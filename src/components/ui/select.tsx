type Option = {
  label: string;
  value: string | number;
};

type Props = {
  options: Option[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ options, className = "", ...props }: Props) => {
  return (
    <select
      {...props}
      className={`w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white ${className}`}
    >
      <option value="">Select</option>
      {options?.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;