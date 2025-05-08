// hooks/useDashboard.js
import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboard";

export default function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDashboardData()
      .then((res) => setData(res))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
