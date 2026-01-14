"use client";
import { useState, useEffect } from "react";

const stats = [
  { label: "Réservations aujourd’hui", value: 18 },
  { label: "Tables libres", value: 7 },
  { label: "Clients attendus", value: 42 },
  { label: "Taux d’occupation", value: "85%" },
];

const recentReservations = [
  { name: "Marie Dupont", date: "14/01/2026", time: "19:30", guests: 2, status: "Confirmée" },
  { name: "Jean Martin", date: "14/01/2026", time: "20:00", guests: 4, status: "En attente" },
  { name: "Sophie Bernard", date: "14/01/2026", time: "21:00", guests: 2, status: "Annulée" },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-10 animate-fadeIn">
      <h1 className="text-3xl font-serif font-bold text-gold mb-2">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass bg-brown/80 border-gold/20 rounded-2xl p-6 flex flex-col items-center shadow-xl min-h-[120px]">
            {loading ? (
              <div className="w-12 h-6 bg-gold/20 rounded animate-pulse mb-2" />
            ) : (
              <div className="text-3xl font-bold text-gold mb-1">{stat.value}</div>
            )}
            <div className="text-brown/60 text-sm font-semibold text-center">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="glass bg-brown/80 border-gold/20 rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-xl font-serif font-bold text-gold">Réservations récentes</h2>
          <div className="flex gap-2">
            <input type="date" className="px-3 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition" />
            <input type="text" placeholder="Rechercher..." className="px-3 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-gold">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="py-2 px-4 text-left font-semibold">Nom</th>
                <th className="py-2 px-4 text-left font-semibold">Date</th>
                <th className="py-2 px-4 text-left font-semibold">Heure</th>
                <th className="py-2 px-4 text-left font-semibold">Convives</th>
                <th className="py-2 px-4 text-left font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="py-2 px-4">
                        <div className="w-24 h-4 bg-gold/20 rounded" />
                      </td>
                      <td className="py-2 px-4">
                        <div className="w-16 h-4 bg-gold/20 rounded" />
                      </td>
                      <td className="py-2 px-4">
                        <div className="w-12 h-4 bg-gold/20 rounded" />
                      </td>
                      <td className="py-2 px-4">
                        <div className="w-10 h-4 bg-gold/20 rounded" />
                      </td>
                      <td className="py-2 px-4">
                        <div className="w-16 h-4 bg-gold/20 rounded" />
                      </td>
                    </tr>
                  ))
                : recentReservations.map((r, i) => (
                    <tr key={i} className="border-b border-gold/10 hover:bg-gold/5 transition">
                      <td className="py-2 px-4 font-semibold">{r.name}</td>
                      <td className="py-2 px-4">{r.date}</td>
                      <td className="py-2 px-4">{r.time}</td>
                      <td className="py-2 px-4">{r.guests}</td>
                      <td className={`py-2 px-4 font-bold ${r.status === "Confirmée" ? "text-green-400" : r.status === "Annulée" ? "text-red-400" : "text-yellow-300"}`}>{r.status}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
