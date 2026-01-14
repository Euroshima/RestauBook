"use client";
import Link from "next/link";
import { useState } from "react";

const steps = ["Date & Heure", "Invités", "Coordonnées", "Confirmation"];

export default function ReservePage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ date: "", time: "", guests: 2, name: "", email: "" });

  function next() { setStep((s) => Math.min(s + 1, steps.length - 1)); }
  function prev() { setStep((s) => Math.max(s - 1, 0)); }
  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function handleSubmit(e) { e.preventDefault(); next(); }

  return (
    <section className="max-w-lg mx-auto py-16 fade-in">
      <h2 className="text-4xl font-heading font-bold mb-8 text-brown">Réserver une table</h2>
      <div className="flex items-center gap-4 mb-8">
        {steps.map((label, i) => (
          <div key={label} className={`flex-1 flex flex-col items-center ${i <= step ? "text-olive" : "text-brown/40"}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${i <= step ? "border-olive bg-olive text-beige" : "border-brown/30 bg-beige"}`}>{i + 1}</div>
            <span className="text-xs mt-1">{label}</span>
          </div>
        ))}
      </div>
      <form className="bg-beige rounded-2xl shadow-soft border border-accent p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <label className="font-medium text-brown">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} required className="input" />
            <label className="font-medium text-brown">Heure</label>
            <input type="time" name="time" value={form.time} onChange={handleChange} required className="input" />
          </div>
        )}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <label className="font-medium text-brown">Nombre de personnes</label>
            <input type="number" name="guests" min="1" max="20" value={form.guests} onChange={handleChange} required className="input" />
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <label className="font-medium text-brown">Nom complet</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="input" />
            <label className="font-medium text-brown">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="input" />
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col gap-4 items-center">
            <span className="text-lg text-brown">Merci {form.name}, votre réservation est presque terminée !</span>
            <Link href="/reserve/success" className="bg-olive text-beige px-6 py-3 rounded-2xl font-bold shadow-soft hover:bg-brown transition">Confirmer</Link>
          </div>
        )}
        <div className="flex gap-4 mt-4">
          {step > 0 && <button type="button" onClick={prev} className="bg-accent text-brown px-4 py-2 rounded-2xl">Précédent</button>}
          {step < steps.length - 1 && <button type="button" onClick={next} className="bg-olive text-beige px-4 py-2 rounded-2xl ml-auto">Suivant</button>}
        </div>
      </form>
    </section>
  );
}
