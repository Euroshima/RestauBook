"use client";
import { useState } from "react";

const menu = [
  {
    category: "Entrées",
    image: "/menu-entree.jpg",
    items: [
      {
        name: "Carpaccio de bœuf",
        description: "Parmesan, roquette, huile d'olive, fleur de sel, citron vert.",
        price: "18€",
        image: "/dish-carpaccio.jpg",
        ingredients: "Bœuf, parmesan, roquette, huile d'olive, citron vert",
        allergens: "Lait, sulfites"
      },
      {
        name: "Velouté de potimarron",
        description: "Crème de noisette, croûtons maison, huile de truffe.",
        price: "14€",
        image: "/dish-veloute.jpg",
        ingredients: "Potimarron, noisette, crème, pain, truffe",
        allergens: "Gluten, fruits à coque, lait"
      },
    ],
  },
  {
    category: "Plats",
    image: "/menu-plat.jpg",
    items: [
      {
        name: "Filet de bar",
        description: "Purée d'artichaut, jus d'olive, chips de légumes.",
        price: "32€",
        image: "/dish-bar.jpg",
        ingredients: "Bar, artichaut, olive, légumes",
        allergens: "Poisson"
      },
      {
        name: "Risotto crémeux",
        description: "Champignons, parmesan, huile de truffe noire.",
        price: "28€",
        image: "/dish-risotto.jpg",
        ingredients: "Riz, champignons, parmesan, truffe",
        allergens: "Lait"
      },
    ],
  },
  {
    category: "Desserts",
    image: "/menu-dessert.jpg",
    items: [
      {
        name: "Tiramisu maison",
        description: "Café, mascarpone, cacao amer, biscuit maison.",
        price: "12€",
        image: "/dish-tiramisu.jpg",
        ingredients: "Mascarpone, café, œufs, cacao, biscuit",
        allergens: "Lait, œufs, gluten"
      },
      {
        name: "Tarte fine aux pommes",
        description: "Glace vanille artisanale, caramel beurre salé.",
        price: "12€",
        image: "/dish-tarte.jpg",
        ingredients: "Pomme, pâte feuilletée, vanille, caramel",
        allergens: "Lait, œufs, gluten"
      },
    ],
  },
];

export default function MenuPage() {
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState(null);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-beige via-beige to-gold/10 flex flex-col items-center py-16">
      <h2 className="font-serif text-5xl font-bold text-gold mb-12 fade-in">Menu gastronomique</h2>
      {/* Category Switcher */}
      <div className="flex gap-6 mb-12">
        {menu.map((cat, i) => (
          <button
            key={cat.category}
            onClick={() => setActive(i)}
            className={`font-serif text-2xl px-6 py-2 rounded-2xl transition-all duration-300 border-2 ${active === i ? 'bg-gold text-brown border-gold shadow-glass scale-105' : 'bg-glass text-gold border-gold/30 hover:bg-gold/20 hover:scale-105'} shadow-glass`}
            style={{ boxShadow: active === i ? '0 8px 32px 0 rgba(212,175,55,0.10)' : undefined }}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Animated Category Panel */}
      <div className="relative w-full max-w-4xl min-h-[420px]">
        <div className="absolute inset-0 transition-all duration-700" key={active}>
          <div className="glass rounded-2xl p-10 grid grid-cols-1 md:grid-cols-2 gap-10 fade-in">
            <div className="flex flex-col gap-6 justify-center">
              {menu[active].items.map((dish, idx) => (
                <div
                  key={dish.name}
                  className="group flex items-center gap-6 cursor-pointer transition-all duration-300 hover:scale-[1.03]"
                  onClick={() => setModal(dish)}
                >
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-glass border-2 border-gold/30 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-all duration-300" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="font-serif text-2xl text-gold font-bold mb-1 group-hover:underline group-hover:decoration-gold/60 transition">{dish.name}</span>
                    <span className="text-brown/80 text-lg font-sans mb-1">{dish.description}</span>
                    <span className="text-gold font-bold text-lg">{dish.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src={menu[active].image}
                alt={menu[active].category}
                className="rounded-2xl shadow-glass border-2 border-gold/30 w-full max-w-xs object-cover animate-fadein-slow"
                style={{ minHeight: 240 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dish Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brown/60 backdrop-blur-sm animate-fadein-slow" onClick={() => setModal(null)}>
          <div className="glass rounded-2xl p-10 max-w-lg w-full flex flex-col gap-6 relative animate-fadein-slow" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gold text-2xl font-bold" onClick={() => setModal(null)}>&times;</button>
            <img src={modal.image} alt={modal.name} className="rounded-2xl shadow-glass border-2 border-gold/30 w-full object-cover mb-4" style={{ minHeight: 180 }} />
            <h3 className="font-serif text-3xl text-gold font-bold mb-2">{modal.name}</h3>
            <p className="text-brown/90 text-lg font-sans mb-2">{modal.description}</p>
            <div className="flex flex-col gap-1 text-brown/80 text-sm">
              <span><b>Ingrédients :</b> {modal.ingredients}</span>
              <span><b>Allergènes :</b> {modal.allergens}</span>
            </div>
            <span className="text-gold font-bold text-2xl mt-2">{modal.price}</span>
          </div>
        </div>
      )}
    </main>
  );
}
