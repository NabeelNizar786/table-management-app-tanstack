import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { Record } from "../types/record";

const columnHelper = createColumnHelper<Record>();

const columns = [
  columnHelper.accessor("track_name", {
    header: "Track Name",
  }),
  columnHelper.accessor("track_artist", {
    header: "Track Artist",
  }),
  columnHelper.accessor("track_album_name", {
    header: "Track Album Name",
  }),
  columnHelper.accessor("track_album_release_date", {
    header: "Track Album Release Date",
  }),
  columnHelper.accessor("playlist_genre", {
    header: "Playlist Genre",
  }),
  columnHelper.accessor("playlist_subgenre", {
    header: "Playlist Subgenre",
  }),
  columnHelper.accessor("track_popularity", {
    header: "Track Popularity",
  }),
  columnHelper.accessor("danceability", {
    header: "Danceability",
  }),
  columnHelper.accessor("energy", {
    header: "Energy",
  }),
  columnHelper.accessor("tempo", {
    header: "Tempo",
  }),
  columnHelper.accessor("duration_ms", {
    header: "Duration ms",
  }),
];

type TableProps = {
  records: Record[];
};

export function Table({ records }: TableProps) {
  const table = useReactTable({
    data: records,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
