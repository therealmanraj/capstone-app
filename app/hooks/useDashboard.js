// app/hooks/useDashboard.js
import { useEffect, useState, useContext } from "react";
import { getDashboardData } from "../services/dashboard";
import { AuthContext } from "../../app/context/AuthContext";

export default function useDashboard() {
  const { doctor } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!doctor?.id) return;
    setLoading(true);
    getDashboardData(doctor.id)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [doctor]);

  return { data, loading, error };
}

// export default function useDashboard(doctorId) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!doctorId) return;
//     setLoading(true);
//     getDashboardData(doctorId)
//       .then(setData)
//       .catch(setError)
//       .finally(() => setLoading(false));
//   }, [doctorId]);

//   return { data, loading, error };
// }
