// services/dashboard.js
const SERVER_URL = "http://localhost:3000"; // or your ngrok/LAN URL

export async function getDashboardData(doctorId) {
  // 1) Fetch doctor profile
  const docRes = await fetch(`${SERVER_URL}/api/doctors/${doctorId}`);
  if (!docRes.ok) throw new Error("Failed to load doctor");
  const doctor = await docRes.json();

  // 2) Fetch raw appointments (with populated patientId)
  const apptRes = await fetch(
    `${SERVER_URL}/api/appointments?doctorId=${doctorId}`
  );
  if (!apptRes.ok) throw new Error("Failed to load appointments");
  const raw = await apptRes.json();

  // 3) Filter to “today” only using the original scheduledAt
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const todayRaw = raw.filter((a) => {
    const d = new Date(a.scheduledAt);
    return d >= start && d <= end;
  });

  // 4) Shape them into { id, time, patient }
  const schedule = todayRaw.map((a) => ({
    id: a._id,
    time: new Date(a.scheduledAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    patient: `${a.patientId.firstName} ${a.patientId.lastName}`,
  }));

  return { doctor, schedule };
}
