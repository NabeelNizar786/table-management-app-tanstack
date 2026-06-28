import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { Record } from "../types/record";
import { useEffect, useMemo, useState } from "react";
import { FixedSizeList as List } from "react-window";

const columnHelper = createColumnHelper<Record>();

type TableProps = {
  records: Record[];
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: "asc" | "desc";
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  patchRecord: (id: number, updatedData: Partial<Record>) => Promise<void>;
};

type ColumnVisibility = {
  [key: string]: boolean;
};

const columnWidths: { [key: string]: string } = {
  select: "60px",
  track_name: "240px",
  track_artist: "180px",
  track_album_name: "220px",
  track_album_release_date: "180px",
  playlist_genre: "150px",
  playlist_subgenre: "180px",
  track_popularity: "140px",
  danceability: "140px",
  energy: "120px",
  tempo: "120px",
  duration_ms: "140px",
  actions: "120px",
};

export function Table({
  records,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  patchRecord,
}: TableProps) {
  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  const [editedValues, setEditedValues] = useState<Partial<Record>>({});

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(
    () => {
      const saved = localStorage.getItem("columnVisibility");
      return saved ? JSON.parse(saved) : {};
    },
  );

  useEffect(() => {
    localStorage.setItem("columnVisibility", JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: () => (
          <input
            type="checkbox"
            checked={
              records.length > 0 &&
              records.every((record) => selectedRows.includes(record.id))
            }
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedRows(records.map((record) => record.id));
              } else {
                setSelectedRows([]);
              }
            }}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row.original.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedRows((prev) => [...prev, row.original.id]);
              } else {
                setSelectedRows((prev) =>
                  prev.filter((id) => id !== row.original.id),
                );
              }
            }}
          />
        ),
      }),
      columnHelper.accessor("track_name", {
        header: () => (
          <button onClick={() => handleSort("track_name")}>
            Track Name
            {sortBy === "track_name" && (sortOrder === "asc" ? " ↑" : " ↓")}
          </button>
        ),
        cell: ({ row }) =>
          editingRowId === row.original.id ? (
            <input
              value={editedValues.track_name ?? ""}
              onChange={(e) =>
                setEditedValues((prev) => ({
                  ...prev,
                  track_name: e.target.value,
                }))
              }
            />
          ) : (
            row.original.track_name
          ),
      }),
      columnHelper.accessor("track_artist", {
        header: () => {
          return (
            <button onClick={() => handleSort("track_artist")}>
              Track Artist
              {sortBy === "track_artist" && (sortOrder === "asc" ? " ↑" : " ↓")}
            </button>
          );
        },
      }),
      columnHelper.accessor("track_album_name", {
        header: () => {
          return (
            <button onClick={() => handleSort("track_album_name")}>
              Track Album Name
              {sortBy === "track_album_name" &&
                (sortOrder === "asc" ? " ↑" : " ↓")}
            </button>
          );
        },
      }),
      columnHelper.accessor("track_album_release_date", {
        header: () => {
          return (
            <button onClick={() => handleSort("track_album_release_date")}>
              Track Album Release Date
              {sortBy === "track_album_release_date" &&
                (sortOrder === "asc" ? " ↑" : " ↓")}
            </button>
          );
        },
      }),
      columnHelper.accessor("playlist_genre", {
        header: () => {
          return (
            <button onClick={() => handleSort("playlist_genre")}>
              Playlist Genre
              {sortBy === "playlist_genre" &&
                (sortOrder === "asc" ? " ↑" : " ↓")}
            </button>
          );
        },
      }),
      columnHelper.accessor("playlist_subgenre", {
        header: () => {
          return (
            <button onClick={() => handleSort("playlist_subgenre")}>
              Playlist Subgenre
              {sortBy === "playlist_subgenre" &&
                (sortOrder === "asc" ? " ↑" : " ↓")}
            </button>
          );
        },
      }),
      columnHelper.accessor("track_popularity", {
        header: () => (
          <button onClick={() => handleSort("track_popularity")}>
            Track Popularity
            {sortBy === "track_popularity" &&
              (sortOrder === "asc" ? " ↑" : " ↓")}
          </button>
        ),
        cell: ({ row }) =>
          editingRowId === row.original.id ? (
            <input
              type="number"
              value={editedValues.track_popularity ?? ""}
              onChange={(e) =>
                setEditedValues((prev) => ({
                  ...prev,
                  track_popularity: Number(e.target.value),
                }))
              }
            />
          ) : (
            row.original.track_popularity
          ),
      }),
      columnHelper.accessor("danceability", {
        header: () => {
          return (
            <button onClick={() => handleSort("danceability")}>
              Danceability
              {sortBy === "danceability" && (sortOrder === "asc" ? " ↑" : " ↓")}
            </button>
          );
        },
      }),
      columnHelper.accessor("energy", {
        header: () => {
          return (
            <button onClick={() => handleSort("energy")}>
              Energy
              {sortBy === "energy" && (sortOrder === "asc" ? " ↑" : " ↓")}
            </button>
          );
        },
      }),
      columnHelper.accessor("tempo", {
        header: () => {
          return (
            <button onClick={() => handleSort("tempo")}>
              Tempo{sortBy === "tempo" && (sortOrder === "asc" ? " ↑" : " ↓")}
            </button>
          );
        },
      }),
      columnHelper.accessor("duration_ms", {
        header: () => {
          return (
            <button onClick={() => handleSort("duration_ms")}>
              Duration Ms
              {sortBy === "duration_ms" && (sortOrder === "asc" ? " ↑" : " ↓")}
            </button>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) =>
          editingRowId === row.original.id ? (
            <>
              <button onClick={() => handleSave(row.original.id)}>Save</button>
              <button
                onClick={() => {
                  setEditingRowId(null);
                  setEditedValues({});
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setEditingRowId(row.original.id);
                setEditedValues({
                  track_name: row.original.track_name,
                  track_popularity: row.original.track_popularity,
                });
              }}
            >
              Edit
            </button>
          ),
      }),
    ],
    [sortBy, sortOrder, editingRowId, editedValues, selectedRows, records],
  );

  const table = useReactTable({
    data: records,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleSave = async (id: number) => {
    if (!editedValues.track_name?.trim()) {
      alert("Track name cannot be empty");
      return;
    }

    if (
      editedValues.track_popularity !== undefined &&
      (editedValues.track_popularity < 0 || editedValues.track_popularity > 100)
    ) {
      alert("Popularity must be between 0 and 100");
      return;
    }

    try {
      await patchRecord(id, editedValues);

      setEditingRowId(null);
      setEditedValues({});
    } catch {
      alert("Failed to save changes");
    }
  };

  const exportSelected = () => {
    const selectedData = records.filter((record) =>
      selectedRows.includes(record.id),
    );

    if (!selectedData.length) {
      alert("No rows selected");
      return;
    }

    const headers = Object.keys(selectedData[0]).join(",");

    const rows = selectedData.map((record) =>
      Object.values(record)
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(","),
    );

    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "selected-records.csv";
    link.click();
  };

  const exportAllFiltered = () => {
    const filteredData = table.getRowModel().rows.map((row) => row.original);

    if (!filteredData.length) {
      alert("No records to export");
      return;
    }

    const headers = Object.keys(filteredData[0]).join(",");

    const rows = filteredData.map((record) =>
      Object.values(record)
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(","),
    );

    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered-records.csv";
    link.click();
  };

  return (
    <>
      <div className="toolbar">
        <button onClick={exportSelected}>
          Export Selected ({selectedRows.length})
        </button>

        <button onClick={exportAllFiltered}>Export All Filtered</button>

        <div className="column-toggle-container">
          {table.getAllLeafColumns().map((column) => (
            <label key={column.id} style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
              {column.id}
            </label>
          ))}
        </div>
      </div>

      <div className="table-wrapper">
        <table style={{ width: "max-content", borderCollapse: "collapse" }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: columnWidths[header.column.id] || "150px",
                      minWidth: columnWidths[header.column.id] || "150px",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>
        <List
          height={500}
          itemCount={table.getRowModel().rows.length}
          itemSize={60}
          width={table.getVisibleLeafColumns().length * 180} // important
        >
          {({ index, style }) => {
            const row = table.getRowModel().rows[index];

            return (
              <div
                className={`table-row ${
                  selectedRows.includes(row.original.id) ? "selected" : ""
                }`}
                style={{
                  ...style,
                  display: "flex",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <div
                    key={cell.id}
                    className="table-cell"
                    style={{
                      width: columnWidths[cell.column.id] || "150px",
                      minWidth: columnWidths[cell.column.id] || "150px",
                      padding: "12px",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            );
          }}
        </List>
      </div>
    </>
  );
}
