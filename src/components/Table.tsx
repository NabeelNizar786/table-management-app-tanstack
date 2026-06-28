import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { Record } from "../types/record";
import { useMemo, useState } from "react";

const columnHelper = createColumnHelper<Record>();

type TableProps = {
  records: Record[];
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: "asc" | "desc";
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  patchRecord: (id: number, updatedData: Partial<Record>) => Promise<void>;
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

  return (
    <>
      <button onClick={exportSelected}>
        Export Selected ({selectedRows.length})
      </button>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
