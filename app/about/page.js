"use client";
import { useEffect } from "react";

const story = [
  {
    title: "L’Art de Recevoir",
    text: "Depuis deux décennies, notre maison sublime l’art de la table et l’accueil à la française. Chaque détail, chaque sourire, chaque assiette raconte une histoire de passion et d’exigence.",
    image: "/about-art.jpg",
    alt: "Salle de restaurant chic avec lumière dorée"
  },
  {
    title: "La Cuisine comme Voyage",
    text: "Notre chef étoilé compose des créations inspirées, entre terroir et modernité. Les saveurs s’entrelacent, les textures surprennent, l’émotion est au rendez-vous à chaque bouchée.",
    image: "/about-cuisine.jpg",
    alt: "Plat gastronomique raffiné sur assiette blanche"
  },
  {
    title: "Un Univers d’Exception",
    text: "Dans un décor feutré, entre dorures et matières nobles, vivez une expérience sensorielle unique. Ici, le temps suspend son vol pour laisser place à la magie du moment.",
    image: "/about-univers.jpg",
    alt: "Ambiance lounge, lumières tamisées, tables élégantes"
  }
];

export default function AboutPage() {
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.parallax').forEach((el, i) => {
        const speed = 0.18 + i * 0.08;
        const y = window.scrollY * speed;
        el.style.transform = `translateY(${y}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-beige via-beige to-gold/10 flex flex-col items-center justify-center overflow-x-hidden">
      <section className="w-full flex flex-col items-center pt-24 pb-12">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-gold text-center mb-12 fade-in">Notre histoire</h1>
        <div className="relative w-full max-w-5xl flex flex-col gap-32">
          {story.map((block, i) => (
            <div key={block.title} className={`relative flex flex-col md:flex-row items-center gap-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} fade-in`} style={{ minHeight: 420 }}>
              <div className="flex-1 flex justify-center items-center">
                <div className="parallax w-full max-w-md rounded-2xl shadow-glass border-2 border-gold/30 overflow-hidden" style={{ transition: 'transform 0.5s cubic-bezier(.4,0,.2,1)' }}>
                  <img src={block.image} alt={block.alt} className="w-full h-[340px] object-cover object-center" />
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center md:items-start gap-6">
                <h2 className="font-serif text-3xl md:text-4xl text-gold font-bold mb-2 text-center md:text-left">{block.title}</h2>
                <p className="text-lg md:text-xl text-brown/80 text-center md:text-left max-w-xl">{block.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center mt-24">
          <a href="/reservation" className="px-10 py-4 rounded-2xl font-serif text-2xl font-bold bg-gold text-brown shadow-glass glass border-2 border-gold/60 hover:scale-105 hover:shadow-2xl transition-all duration-300">Réserver votre table</a>
        </div>
      </section>
    </main>
  );
}
