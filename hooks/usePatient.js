// hooks/usePatient.js
import { useEffect, useState } from "react";
import { getPatientById } from "../services/patients";

export default function usePatient(id) {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPatientById(id)
      .then((data) => {
        if (!data) throw new Error("Not found");
        setPatient(data);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  return { patient, loading, error };
}
