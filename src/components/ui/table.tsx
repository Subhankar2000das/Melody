type Props = {
  headers: string[];
  children: React.ReactNode;
};

const Table = ({ headers, children }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border border-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-sm">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-gray-900 text-white">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;