
"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function HomePage() {
  // Scroll reveal micro-animations
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add('opacity-100', 'translate-y-0');
        }
      });
    };
    window.addEventListener('scroll', reveal);
    reveal();
    return () => window.removeEventListener('scroll', reveal);
  }, []);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-beige via-beige to-gold/10 flex flex-col">
      {/* Cinematic Hero */}
      <section className="relative flex flex-col justify-center items-center min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/restaurant-hero.jpg" alt="Luxury Restaurant" className="w-full h-full object-cover object-center scale-110 blur-sm brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-beige/80 to-brown/80" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center gap-10 px-6">
          <h1 className="font-serif text-[2.8rem] md:text-[4.5rem] font-extrabold text-gold drop-shadow-lg text-center tracking-tight leading-tight animate-fadein-slow">
            Une expérience gastronomique<br />
            <span className="text-beige">d’exception</span>
          </h1>
          <p className="max-w-2xl text-xl md:text-2xl text-beige/90 text-center font-sans mb-2 animate-fadein-slow delay-200">
            Réservez votre table dans un univers chic, raffiné, et laissez-vous porter par la magie d’un restaurant étoilé.
          </p>
          <Link href="#reservation" className="mt-4 px-10 py-4 rounded-2xl font-serif text-2xl font-bold bg-gold text-brown shadow-glass glass border-2 border-gold/60 hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fadein-slow delay-300">
            Réserver votre table
          </Link>
        </div>
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <span className="text-gold text-lg font-serif animate-bounce">Scroll</span>
          <div className="w-1 h-8 bg-gold rounded-full mt-1 animate-pulse" />
        </div>
      </section>

      {/* Glassmorphism About Section */}
      <section id="about" className="reveal opacity-0 translate-y-12 transition-all duration-700 ease-out py-24 flex justify-center">
        <div className="glass max-w-3xl p-12 rounded-2xl flex flex-col gap-6 items-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gold mb-2">Notre histoire</h2>
          <p className="text-lg md:text-xl text-brown/80 text-center">
            Depuis plus de 20 ans, notre établissement sublime les saveurs et l’art de la table. Un lieu où chaque détail compte, pour une expérience inoubliable.
          </p>
        </div>
      </section>

      {/* Glassmorphism Menu Preview Section */}
      <section id="menu" className="reveal opacity-0 translate-y-12 transition-all duration-700 ease-out py-24 flex justify-center">
        <div className="glass max-w-4xl p-12 rounded-2xl flex flex-col gap-8 items-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gold mb-2">Menu d’exception</h2>
          <p className="text-lg md:text-xl text-brown/80 text-center mb-6">
            Découvrez notre carte étoilée, entre créations du chef et produits d’exception.
          </p>
          <Link href="/menu" className="px-8 py-3 rounded-2xl font-serif text-xl font-bold bg-gold text-brown shadow-glass glass border-2 border-gold/60 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            Explorer le menu
          </Link>
        </div>
      </section>

      {/* Glassmorphism Reservation Preview Section */}
      <section id="reservation" className="reveal opacity-0 translate-y-12 transition-all duration-700 ease-out py-24 flex justify-center">
        <div className="glass max-w-2xl p-12 rounded-2xl flex flex-col gap-8 items-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gold mb-2">Réserver une table</h2>
          <p className="text-lg md:text-xl text-brown/80 text-center mb-6">
            Vivez l’expérience RestauBook, réservez en ligne et profitez d’un accueil sur-mesure.
          </p>
          <Link href="/reservation" className="px-8 py-3 rounded-2xl font-serif text-xl font-bold bg-gold text-brown shadow-glass glass border-2 border-gold/60 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            Réserver maintenant
          </Link>
        </div>
      </section>
    </main>
  );
}
