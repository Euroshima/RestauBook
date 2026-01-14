"use client";

import { useState } from "react";


const initialReservations = [
  { id: 1, name: "Marie Dupont", date: "2026-01-14", time: "19:30", guests: 2, status: "En attente", phone: "06 12 34 56 78", email: "marie@email.com", notes: "Allergie gluten" },
  { id: 2, name: "Jean Martin", date: "2026-01-14", time: "20:00", guests: 4, status: "Confirmée", phone: "06 98 76 54 32", email: "jean@email.com", notes: "Table fenêtre" },
  { id: 3, name: "Sophie Bernard", date: "2026-01-14", time: "21:00", guests: 2, status: "Annulée", phone: "06 11 22 33 44", email: "sophie@email.com", notes: "" },
];

const statusOptions = ["En attente", "Confirmée", "Annulée"];

export default function AdminReservations() {
  const [filters, setFilters] = useState({ date: "", status: "", guests: "" });
  const [modal, setModal] = useState(null);
  const [reservations, setReservations] = useState(initialReservations);

  const filtered = reservations.filter(r => {
    return (
      (!filters.date || r.date === filters.date) &&
      (!filters.status || r.status === filters.status) &&
      (!filters.guests || r.guests === Number(filters.guests))
    );
  });

  const handleAction = (id, action) => {
    setReservations(reservations =>
      reservations.map(r =>
        r.id === id
          ? { ...r, status: action === "confirm" ? "Confirmée" : "Annulée" }
          : r
      )
    );
    setModal(null);
  };

  return (
    <div className="flex flex-col gap-10 animate-fadeIn">
      <h1 className="text-3xl font-serif font-bold text-gold mb-2">Gestion des réservations</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="date"
          value={filters.date}
          onChange={e => setFilters(f => ({ ...f, date: e.target.value }))}
          className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition"
        />
        <select
          value={filters.status}
          onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
          className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition"
        >
          <option value="">Statut</option>
          {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input
          type="number"
          min="1"
          placeholder="Convives"
          value={filters.guests}
          onChange={e => setFilters(f => ({ ...f, guests: e.target.value }))}
          className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition w-32"
        />
      </div>
      <div className="glass bg-brown/80 border-gold/20 rounded-2xl p-6 shadow-xl overflow-x-auto">
        <table className="min-w-full text-gold luxury-table">
          <thead>
            <tr className="border-b border-gold/20">
              <th className="py-2 px-4 text-left font-semibold">Nom</th>
              <th className="py-2 px-4 text-left font-semibold">Date</th>
              <th className="py-2 px-4 text-left font-semibold">Heure</th>
              <th className="py-2 px-4 text-left font-semibold">Convives</th>
              <th className="py-2 px-4 text-left font-semibold">Statut</th>
              <th className="py-2 px-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gold/60">Aucune réservation trouvée.</td>
              </tr>
            ) : (
              filtered.map(r => (
                <tr
                  key={r.id}
                  className="border-b border-gold/10 hover:bg-gold/5 transition group cursor-pointer"
                  onClick={() => setModal(r)}
                >
                  <td className="py-2 px-4 font-semibold group-hover:underline">{r.name}</td>
                  <td className="py-2 px-4">{r.date}</td>
                  <td className="py-2 px-4">{r.time}</td>
                  <td className="py-2 px-4">{r.guests}</td>
                  <td className={`py-2 px-4 font-bold ${r.status === "Confirmée" ? "text-green-400" : r.status === "Annulée" ? "text-red-400" : "text-yellow-300"}`}>{r.status}</td>
                  <td className="py-2 px-4 flex gap-2">
                    {r.status === "En attente" && (
                      <>
                        <button
                          onClick={e => { e.stopPropagation(); handleAction(r.id, "confirm"); }}
                          className="px-3 py-1 rounded-lg bg-green-400/20 text-green-300 font-bold hover:bg-green-400/40 transition"
                        >Confirmer</button>
                        <button
                          onClick={e => { e.stopPropagation(); handleAction(r.id, "cancel"); }}
                          className="px-3 py-1 rounded-lg bg-red-400/20 text-red-300 font-bold hover:bg-red-400/40 transition"
                        >Annuler</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn" onClick={() => setModal(null)}>
          <div className="glass bg-brown/90 border-gold/30 rounded-2xl shadow-2xl p-8 min-w-[340px] max-w-md w-full relative animate-fadeIn" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gold/60 hover:text-gold text-2xl font-bold" onClick={() => setModal(null)}>&times;</button>
            <h2 className="text-2xl font-serif font-bold text-gold mb-4">Détail réservation</h2>
            <div className="flex flex-col gap-2 text-gold/90">
              <div><span className="font-bold">Nom:</span> {modal.name}</div>
              <div><span className="font-bold">Date:</span> {modal.date}</div>
              <div><span className="font-bold">Heure:</span> {modal.time}</div>
              <div><span className="font-bold">Convives:</span> {modal.guests}</div>
              <div><span className="font-bold">Téléphone:</span> {modal.phone}</div>
              <div><span className="font-bold">Email:</span> {modal.email}</div>
              {modal.notes && <div><span className="font-bold">Notes:</span> {modal.notes}</div>}
              <div><span className="font-bold">Statut:</span> <span className={`font-bold ${modal.status === "Confirmée" ? "text-green-400" : modal.status === "Annulée" ? "text-red-400" : "text-yellow-300"}`}>{modal.status}</span></div>
            </div>
            {modal.status === "En attente" && (
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => handleAction(modal.id, "confirm")}
                  className="flex-1 py-2 rounded-lg bg-green-400/20 text-green-300 font-bold hover:bg-green-400/40 transition"
                >Confirmer</button>
                <button
                  onClick={() => handleAction(modal.id, "cancel")}
                  className="flex-1 py-2 rounded-lg bg-red-400/20 text-red-300 font-bold hover:bg-red-400/40 transition"
                >Annuler</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
