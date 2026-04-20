type Props = {
  label: string;
};

const Badge = ({ label }: Props) => {
  return (
    <span className="px-2 py-1 text-xs bg-green-600 text-white rounded-full">
      {label}
    </span>
  );
};

export default Badge;