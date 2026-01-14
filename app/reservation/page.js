"use client";
import { useState } from "react";

const timeSlots = [
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
];

const steps = [
  "Date",
  "Heure",
  "Invités",
  "Coordonnées",
  "Confirmation"
];

export default function ReservationPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ date: "", time: "", guests: 2, name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function next() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleTimeSelect(t) {
    setForm({ ...form, time: t });
    setTimeout(next, 350);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  }

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-beige via-beige to-gold/10 py-16">
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-gold mb-10 fade-in">Réserver une table</h2>
      <div className="flex items-center gap-4 mb-8">
        {steps.map((label, i) => (
          <div key={label} className={`flex-1 flex flex-col items-center transition-all duration-300 ${i <= step ? "text-gold" : "text-brown/30"}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${i <= step ? "border-gold bg-gold text-brown" : "border-brown/20 bg-glass"} font-serif font-bold text-lg transition-all duration-300`}>{i + 1}</div>
            <span className="text-xs mt-1 font-serif">{label}</span>
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl p-10 w-full max-w-lg min-h-[340px] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500">
        {/* Step 1: Date */}
        {step === 0 && (
          <div className="w-full flex flex-col gap-6 animate-fadein-slow">
            <label className="font-serif text-xl text-gold mb-2">Choisissez la date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} required className="input text-brown bg-glass border-gold/30" min={new Date().toISOString().split('T')[0]} />
            <button onClick={next} disabled={!form.date} className="bg-gold text-brown px-8 py-3 rounded-2xl font-serif font-bold mt-4 shadow-glass hover:scale-105 transition-all">Suivant</button>
          </div>
        )}
        {/* Step 2: Time */}
        {step === 1 && (
          <div className="w-full flex flex-col gap-6 animate-fadein-slow">
            <label className="font-serif text-xl text-gold mb-2">Sélectionnez l'heure</label>
            <div className="grid grid-cols-2 gap-4">
              {timeSlots.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTimeSelect(t)}
                  className={`px-6 py-3 rounded-2xl font-serif font-bold border-2 transition-all duration-300 shadow-glass ${form.time === t ? "bg-gold text-brown border-gold scale-105" : "bg-glass text-gold border-gold/30 hover:bg-gold/20 hover:scale-105"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button onClick={prev} className="text-brown/60 mt-2 underline">Retour</button>
          </div>
        )}
        {/* Step 3: Guests */}
        {step === 2 && (
          <div className="w-full flex flex-col gap-6 animate-fadein-slow">
            <label className="font-serif text-xl text-gold mb-2">Nombre de convives</label>
            <input type="number" name="guests" min="1" max="12" value={form.guests} onChange={handleChange} required className="input text-brown bg-glass border-gold/30" />
            <div className="flex gap-4">
              <button onClick={prev} className="text-brown/60 underline">Retour</button>
              <button onClick={next} className="bg-gold text-brown px-8 py-3 rounded-2xl font-serif font-bold shadow-glass hover:scale-105 transition-all">Suivant</button>
            </div>
          </div>
        )}
        {/* Step 4: Name & Email */}
        {step === 3 && (
          <form className="w-full flex flex-col gap-6 animate-fadein-slow" onSubmit={handleSubmit}>
            <label className="font-serif text-xl text-gold mb-2">Vos coordonnées</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Nom complet" className="input text-brown bg-glass border-gold/30" />
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Email" className="input text-brown bg-glass border-gold/30" />
            <div className="flex gap-4">
              <button type="button" onClick={prev} className="text-brown/60 underline">Retour</button>
              <button type="submit" className="bg-gold text-brown px-8 py-3 rounded-2xl font-serif font-bold shadow-glass hover:scale-105 transition-all">Confirmer</button>
            </div>
          </form>
        )}
        {/* Step 5: Confirmation */}
        {step === 4 && (
          <div className="w-full flex flex-col items-center gap-8 animate-fadein-slow">
            {loading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-gold border-t-transparent animate-spin mb-2" />
                <span className="font-serif text-xl text-gold">Réservation en cours...</span>
              </div>
            ) : success ? (
              <div className="flex flex-col items-center gap-4 animate-fadein-slow">
                <div className="w-16 h-16 rounded-full border-4 border-gold flex items-center justify-center mb-2 bg-glass shadow-glass">
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M6 12l4 4 8-8"/></svg>
                </div>
                <span className="font-serif text-2xl text-gold">Merci, {form.name} !</span>
                <span className="text-brown/80 text-lg text-center">Votre réservation pour {form.guests} convives le {form.date} à {form.time} est confirmée.<br />Un email de confirmation vous a été envoyé.</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <span className="font-serif text-xl text-gold">Confirmez votre réservation</span>
                <button onClick={handleSubmit} className="bg-gold text-brown px-8 py-3 rounded-2xl font-serif font-bold shadow-glass hover:scale-105 transition-all">Confirmer</button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
