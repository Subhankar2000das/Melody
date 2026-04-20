type Props = {
  page: number;
  total: number;
  onChange: (p: number) => void;
};

const Pagination = ({ page, total, onChange }: Props) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-white">{page} / {total}</span>

      <button
        disabled={page === total}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;