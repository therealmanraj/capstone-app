// services/patients.js
const mockPatients = {
  a: {
    id: "a",
    name: "Nellie Lawrence",
    age: 29,
    history: [
      { date: "2025-05-01", event: "Dental check‑up" },
      { date: "2025-03-12", event: "X‑ray" },
    ],
  },
  b: {
    id: "b",
    name: "Francisco Elliott",
    age: 42,
    history: [
      { date: "2025-04-20", event: "Vision test" },
      { date: "2025-02-14", event: "Consultation" },
    ],
  },
  c: {
    id: "c",
    name: "Isaac Alexander",
    age: 12,
    history: [
      { date: "2025-04-20", event: "Vision test" },
      { date: "2025-02-14", event: "Consultation" },
    ],
  },
  d: {
    id: "d",
    name: "Vera Hopkins",
    age: 60,
    history: [
      { date: "2025-04-20", event: "Dialysis" },
      { date: "2025-02-14", event: "Kidney Consultation" },
    ],
  },
};

export async function getPatientById(id) {
  await new Promise((r) => setTimeout(r, 300)); // simulate latency
  return mockPatients[id] ?? null;
}
