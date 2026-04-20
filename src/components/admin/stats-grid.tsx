import StatCard from "@/components/ui/stat-card";

type Props = {
  items: Array<{
    title: string;
    value: number | string;
  }>;
};

const StatsGrid = ({ items }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items?.map((item) => (
        <StatCard key={item.title} title={item.title} value={item.value} />
      ))}
    </div>
  );
};

export default StatsGrid;