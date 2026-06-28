import Pagination from "./components/Pagination";
import { Table } from "./components/Table";
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
    artistFilter,
    setArtistFilter,
    genreFilter,
    setGenreFilter,
    minPopularity,
    setMinPopularity,
    maxPopularity,
    setMaxPopularity,
    patchRecord,
  } = useRecords();

  if (loading) <p>loading...</p>;
  if (error) <p>{error}</p>;
  // if (!records.length) {
  //   return <p>No records found</p>;
  // }

  return (
    <>
      <div className="app-container">
        <h1>Track Management Dashboard</h1>
        <div className="toolbar">
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
          <input
            type="text"
            placeholder="Filter by artist"
            value={artistFilter}
            onChange={(e) => {
              setArtistFilter(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            value={genreFilter}
            onChange={(e) => {
              setGenreFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Genres</option>
            <option value="pop">Pop</option>
            <option value="rap">Rap</option>
            <option value="rock">Rock</option>
            <option value="latin">Latin</option>
            <option value="edm">EDM</option>
          </select>

          <input
            type="number"
            placeholder="Min popularity"
            value={minPopularity}
            onChange={(e) => {
              setMinPopularity(e.target.value);
              setCurrentPage(1);
            }}
          />

          <input
            type="number"
            placeholder="Max popularity"
            value={maxPopularity}
            onChange={(e) => {
              setMaxPopularity(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="table-container">
          <Table
            records={records}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            patchRecord={patchRecord}
          />
        </div>
        <div className="pagination">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={limit}
            setLimit={setLimit}
            totalCount={totalCount}
          />
        </div>
      </div>
    </>
  );
}

export default App;
