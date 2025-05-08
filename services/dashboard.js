// services/dashboard.js

export async function getDashboardData() {
  // ← swap this stub out for a real fetch() when you’re ready
  return {
    doctor: {
      name: "Dr. Smith",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    date: new Date(),
    offices: [
      {
        id: "1",
        name: "Office No. 248",
        patients: 3,
        timespan: "08:30 AM – 02:00 PM",
        avatars: [
          "https://randomuser.me/api/portraits/women/44.jpg",
          "https://randomuser.me/api/portraits/men/12.jpg",
          "https://randomuser.me/api/portraits/women/65.jpg",
        ],
      },
      {
        id: "2",
        name: "Office No. 302",
        patients: 2,
        timespan: "09:00 AM – 01:00 PM",
        avatars: [
          "https://randomuser.me/api/portraits/men/76.jpg",
          "https://randomuser.me/api/portraits/women/22.jpg",
        ],
      },
    ],
    schedule: [
      { id: "a", time: "08:00 AM", patient: "Nellie Lawrence" },
      { id: "b", time: "09:00 AM", patient: "Francisco Elliott" },
      { id: "c", time: "10:00 AM", patient: "Isaac Alexander" },
      { id: "d", time: "11:00 AM", patient: "Vera Hopkins" },
    ],
  };
}
