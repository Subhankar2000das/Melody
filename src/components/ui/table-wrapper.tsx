const TableWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px]">{children}</div>
    </div>
  );
};

export default TableWrapper;