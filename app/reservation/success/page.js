import Link from "next/link";

export default function ReservationSuccessPage() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-beige via-beige to-gold/10 py-24">
      <div className="flex flex-col items-center gap-8 animate-fadein-slow">
        {/* Animated checkmark */}
        <div className="w-24 h-24 rounded-full bg-glass shadow-glass border-4 border-gold flex items-center justify-center animate-success-pop">
          <svg width="56" height="56" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="2.5" fill="none" />
            <path stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M7 13l3 3 7-7"/>
          </svg>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gold text-center">Merci pour votre réservation</h1>
        <p className="text-lg md:text-xl text-brown/80 text-center max-w-xl">Votre table est réservée avec soin. Un email de confirmation vous a été envoyé.<br />Nous avons hâte de vous accueillir pour une expérience inoubliable.</p>
        {/* Reservation summary card (example data) */}
        <div className="glass rounded-2xl p-8 max-w-md w-full flex flex-col gap-4 items-center shadow-glass animate-fadein-slow">
          <h2 className="font-serif text-2xl text-gold font-bold mb-2">Résumé de votre réservation</h2>
          <div className="flex flex-col gap-1 text-brown/90 text-lg">
            <span><b>Date :</b> 2026-01-20</span>
            <span><b>Heure :</b> 20:00</span>
            <span><b>Convives :</b> 2</span>
            <span><b>Nom :</b> Jean Dupont</span>
            <span><b>Email :</b> jean.dupont@email.com</span>
          </div>
        </div>
        <Link href="/" className="mt-8 px-8 py-3 rounded-2xl font-serif text-xl font-bold bg-gold text-brown shadow-glass glass border-2 border-gold/60 hover:scale-105 hover:shadow-2xl transition-all duration-300">Retour à l'accueil</Link>
      </div>
      <style jsx>{`
        @keyframes success-pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-success-pop {
          animation: success-pop 0.8s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </main>
  );
}
