// hooks/useAppointments.js
import { useEffect, useState } from "react";
import { getAppointments } from "../services/appointments";

export default function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAppointments()
      .then(setAppointments)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { appointments, loading, error };
}
