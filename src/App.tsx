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
    search,
    setSearch,
  } = useRecords();

  if (loading) <p>loading...</p>;
  if (error)  <p>{error}</p>;

  return (
    <>
      <input
        type="text"
        placeholder="Search Tracks..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />
      {search && <button onClick={() => setSearch("")}>Clear</button>}
      {search && <p>Searching for: {search}</p>}
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
