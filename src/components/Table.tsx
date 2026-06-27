import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { Record } from "../types/record";

const columnHelper = createColumnHelper<Record>();

type TableProps = {
  records: Record[];
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: "asc" | "desc";
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
};

export function Table({
  records,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: TableProps) {
  const columns = [
    columnHelper.accessor("track_name", {
      header: () => {
        return (
          <button onClick={() => handleSort("track_name")}>
            Track Name
            {sortBy === "track_name" && (sortOrder === "asc" ? " ↑" : " ↓")}
          </button>
        );
      },
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
            {sortBy === "playlist_genre" && (sortOrder === "asc" ? " ↑" : " ↓")}
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
      header: () => {
        return (
          <button onClick={() => handleSort("track_popularity")}>
            Track Popularity
            {sortBy === "track_popularity" &&
              (sortOrder === "asc" ? " ↑" : " ↓")}
          </button>
        );
      },
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
  ];

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

  return (
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
  );
}
