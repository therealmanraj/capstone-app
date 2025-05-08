// services/appointments.js
export async function getAppointments() {
  // ← replace this with a real fetch() later
  return [
    {
      id: "1",
      patientName: "John Doe",
      time: "09:00 AM, May 8",
      type: "Dental Check‑up",
    },
    {
      id: "2",
      patientName: "Jane Smith",
      time: "10:30 AM, May 8",
      type: "Vision Test",
    },
    {
      id: "3",
      patientName: "Michael Lee",
      time: "01:00 PM, May 8",
      type: "Consultation",
    },
  ];
}
