type Props = {
  title: string;
  value: number | string;
};

const StatCard = ({ title, value }: Props) => {
  return (
    <div className="bg-gray-900 p-5 rounded-xl shadow">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
    </div>
  );
};

export default StatCard;