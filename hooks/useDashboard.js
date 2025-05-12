// hooks/useDashboard.js
import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboard";

export default function useDashboard(doctorId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!doctorId) return;
    setLoading(true);
    getDashboardData(doctorId)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [doctorId]);

  return { data, loading, error };
}
