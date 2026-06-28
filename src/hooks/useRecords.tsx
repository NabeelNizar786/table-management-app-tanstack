import { useEffect, useState } from "react";
import type { Record } from "../types/record";
import axios from "axios";
import { useDebounce } from "./useDebounce";

export const useRecords = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(25);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");
  const [artistFilter, setArtistFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [minPopularity, setMinPopularity] = useState("");
  const [maxPopularity, setMaxPopularity] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = `${import.meta.env.VITE_API_BASE_URL}/records?_page=${currentPage}&_limit=${limit}`;

        if (sortBy) {
          url += `&_sort=${sortBy}&_order=${sortOrder}`;
        }

        if (debouncedSearch) {
          url += `&q=${debouncedSearch}`;
        }

        if (artistFilter) {
          url += `&track_artist_like=${artistFilter}`;
        }

        if (genreFilter) {
          url += `&playlist_genre=${genreFilter}`;
        }

        if (minPopularity) {
          url += `&track_popularity_gte=${minPopularity}`;
        }

        if (maxPopularity) {
          url += `&track_popularity_lte=${maxPopularity}`;
        }

        const response = await axios.get(url);

        setRecords(response?.data);
        setTotalCount(Number(response.headers["x-total-count"]));
      } catch (error) {
        setError("Failed to fetch records");
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [
    currentPage,
    limit,
    sortBy,
    sortOrder,
    debouncedSearch,
    artistFilter,
    genreFilter,
    minPopularity,
    maxPopularity,
  ]);

  const patchRecord = async (id: number, updatedData: Partial<Record>) => {
    const previousRecords = [...records];

    setRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, ...updatedData } : record,
      ),
    );

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/records/${id}`,
        updatedData,
      );
    } catch (error) {
      setRecords(previousRecords);
      throw error;
    }
  };

  return {
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
  };
};
