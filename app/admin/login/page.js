import { useState } from "react";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      setError("Identifiants invalides");
    }, 1200);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brown via-brown/90 to-gold/10">
      <form
        onSubmit={handleSubmit}
        className="glass max-w-md w-full p-10 rounded-2xl shadow-2xl border border-gold/30 flex flex-col gap-8 animate-fadeIn"
      >
        <h1 className="text-3xl font-serif font-bold text-gold text-center mb-2">Admin Panel</h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            className="px-4 py-3 rounded-lg bg-brown/20 text-brown placeholder:text-brown/60 border border-gold/20 focus:outline-gold/60 transition"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="px-4 py-3 rounded-lg bg-brown/20 text-brown placeholder:text-brown/60 border border-gold/20 focus:outline-gold/60 transition"
            required
          />
        </div>
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gold text-brown font-bold text-lg shadow-glass hover:scale-105 transition-all duration-200 disabled:opacity-60"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </main>
  );
}
