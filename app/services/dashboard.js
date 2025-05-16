// services/dashboard.js
const SERVER_URL = "http://localhost:3000";

// ⚠️ for development, fix "today" to April 4, 2025:
const DEV_TODAY = new Date(2025, 3, 4);

export async function getDashboardData(doctorId) {
  // 1) Fetch doctor profile
  const docRes = await fetch(`${SERVER_URL}/api/doctors/${doctorId}`);
  if (!docRes.ok) throw new Error("Failed to load doctor");
  const doctor = await docRes.json();

  // 2) Fetch all appointments for today (with populated patient names)
  const apptRes = await fetch(
    `${SERVER_URL}/api/appointments?doctorId=${doctorId}`
  );
  if (!apptRes.ok) throw new Error("Failed to load appointments");

  const raw = await fetch(
    `${SERVER_URL}/api/appointments?doctorId=${doctorId}`
  ).then((r) => {
    if (!r.ok) throw new Error("Failed to load appointments");
    return r.json();
  });

  // define our day window based on DEV_TODAY
  const start = new Date(DEV_TODAY);
  start.setHours(0, 0, 0, 0);
  const end = new Date(DEV_TODAY);
  end.setHours(23, 59, 59, 999);

  const schedule = raw
    .filter((a) => {
      const d = new Date(a.scheduledAt);
      return d >= start && d <= end;
    })
    .map((a) => ({
      id: a._id,
      time: new Date(a.scheduledAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      patient: `${a.patientId.firstName} ${a.patientId.lastName}`,
    }));

  return { doctor, schedule };
}
