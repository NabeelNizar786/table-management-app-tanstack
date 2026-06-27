type PaginationProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
};

function Pagination({
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  totalCount,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / limit);
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalCount);
  return (
    <div>
      <p>
        Showing {start}-{end} of {totalCount}
      </p>

      <select
        value={limit}
        onChange={(e) => {
          setLimit(Number(e.target.value));
          setCurrentPage(1);
        }}
      >
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>

      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        prev
      </button>

      <span></span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        next
      </button>
    </div>
  );
}

export default Pagination;
