const tabs = ["All", "Sad", "Romantic", "Party", "English"];

const SongFilterTabs = ({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) => {
  return (
    <div className="flex gap-3 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-3 py-1 rounded-full ${
            active === tab ? "bg-white text-black" : "bg-gray-800 text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SongFilterTabs;