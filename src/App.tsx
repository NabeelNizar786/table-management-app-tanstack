import Pagination from "./components/Pagination";
import { Table } from "./components/table";
import { useRecords } from "./hooks/useRecords";

function App() {
  const {
    records,
    loading,
    error,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    totalCount,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useRecords();

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Table
        records={records}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        setLimit={setLimit}
        totalCount={totalCount}
      />
    </>
  );
}

export default App;
