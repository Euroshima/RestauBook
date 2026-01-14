"use client";
import { useState } from "react";

const defaultHours = [
  { day: "Lundi", open: false, from: "19:00", to: "23:00" },
  { day: "Mardi", open: true, from: "12:00", to: "14:30" },
  { day: "Mercredi", open: true, from: "12:00", to: "14:30" },
  { day: "Jeudi", open: true, from: "12:00", to: "14:30" },
  { day: "Vendredi", open: true, from: "12:00", to: "14:30" },
  { day: "Samedi", open: true, from: "19:00", to: "23:30" },
  { day: "Dimanche", open: false, from: "", to: "" },
];

const defaultEvents = [
  { id: 1, name: "Nouvel An", date: "2026-01-01", hours: "19:00 - 02:00" },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`w-12 h-6 rounded-full transition bg-gold/30 border-2 border-gold/40 relative focus:outline-none ${checked ? 'bg-gold/80' : 'bg-brown/40'}`}
      onClick={() => onChange(!checked)}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-6' : ''}`}></span>
    </button>
  );
}

export default function AdminSettings() {
  const [hours, setHours] = useState(defaultHours);
  const [events, setEvents] = useState(defaultEvents);
  const [eventModal, setEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: "", date: "", hours: "" });

  const handleHourChange = (idx, key, value) => {
    setHours(h => h.map((d, i) => i === idx ? { ...d, [key]: value } : d));
  };

  const handleAddEvent = () => {
    setEvents(e => [...e, { ...newEvent, id: Date.now() }]);
    setNewEvent({ name: "", date: "", hours: "" });
    setEventModal(false);
  };

  const handleDeleteEvent = (id) => setEvents(e => e.filter(ev => ev.id !== id));

  return (
    <div className="flex flex-col gap-10 animate-fadeIn">
      <h1 className="text-3xl font-serif font-bold text-gold mb-2">Paramètres & Horaires</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass bg-brown/80 border-gold/20 rounded-2xl shadow-xl p-8 flex flex-col gap-6">
          <h2 className="text-xl font-serif font-bold text-gold mb-2">Horaires hebdomadaires</h2>
          <div className="flex flex-col gap-4">
            {hours.map((d, idx) => (
              <div key={d.day} className="flex items-center gap-4 justify-between">
                <span className="font-semibold text-gold w-24">{d.day}</span>
                <Toggle checked={d.open} onChange={v => handleHourChange(idx, 'open', v)} />
                {d.open ? (
                  <>
                    <input
                      type="time"
                      value={d.from}
                      onChange={e => handleHourChange(idx, 'from', e.target.value)}
                      className="px-3 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition w-28"
                    />
                    <span className="text-gold/60">-</span>
                    <input
                      type="time"
                      value={d.to}
                      onChange={e => handleHourChange(idx, 'to', e.target.value)}
                      className="px-3 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition w-28"
                    />
                  </>
                ) : (
                  <span className="italic text-gold/50">Fermé</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="glass bg-brown/80 border-gold/20 rounded-2xl shadow-xl p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-serif font-bold text-gold">Jours spéciaux & événements</h2>
            <button
              onClick={() => setEventModal(true)}
              className="px-4 py-2 rounded-xl bg-gold text-brown font-bold shadow-glass glass border-2 border-gold/60 hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >Ajouter</button>
          </div>
          <div className="flex flex-col gap-3">
            {events.length === 0 && <span className="text-gold/60 italic">Aucun événement</span>}
            {events.map(ev => (
              <div key={ev.id} className="flex items-center justify-between bg-gold/10 rounded-xl px-4 py-2">
                <div>
                  <div className="font-semibold text-gold">{ev.name}</div>
                  <div className="text-gold/70 text-sm">{ev.date} &bull; {ev.hours}</div>
                </div>
                <button onClick={() => handleDeleteEvent(ev.id)} className="text-red-400 font-bold hover:underline transition">Supprimer</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {eventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn" onClick={() => setEventModal(false)}>
          <form
            className="glass bg-brown/90 border-gold/30 rounded-2xl shadow-2xl p-8 min-w-[340px] max-w-md w-full relative animate-fadeIn flex flex-col gap-6"
            onClick={e => e.stopPropagation()}
            onSubmit={e => { e.preventDefault(); handleAddEvent(); }}
          >
            <button type="button" className="absolute top-4 right-4 text-gold/60 hover:text-gold text-2xl font-bold" onClick={() => setEventModal(false)}>&times;</button>
            <h2 className="text-2xl font-serif font-bold text-gold mb-2">Ajouter un événement</h2>
            <input
              type="text"
              required
              placeholder="Nom de l'événement"
              value={newEvent.name}
              onChange={e => setNewEvent(ev => ({ ...ev, name: e.target.value }))}
              className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition"
            />
            <input
              type="date"
              required
              value={newEvent.date}
              onChange={e => setNewEvent(ev => ({ ...ev, date: e.target.value }))}
              className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition"
            />
            <input
              type="text"
              required
              placeholder="Heures (ex: 19:00 - 02:00)"
              value={newEvent.hours}
              onChange={e => setNewEvent(ev => ({ ...ev, hours: e.target.value }))}
              className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gold text-brown font-bold text-lg shadow-glass hover:scale-105 transition-all duration-200"
            >Ajouter</button>
          </form>
        </div>
      )}
    </div>
  );
}
