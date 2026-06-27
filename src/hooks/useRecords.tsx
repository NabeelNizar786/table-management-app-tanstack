import { useEffect, useState } from "react";
import type { Record } from "../types/record";
import axios from "axios";

export const useRecords = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(25);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/records?_page=${currentPage}&_limit=${limit}`,
        );

        setRecords(response?.data);
        setTotalCount(Number(response.headers["x-total-count"]));
      } catch (error) {
        setError("Failed to fetch records");
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [currentPage, limit]);

  return {
    records,
    loading,
    error,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    totalCount,
  };
};
