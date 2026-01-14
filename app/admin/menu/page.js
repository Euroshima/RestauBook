"use client";
import { useState } from "react";

const initialCategories = [
  { id: 1, name: "Entrées", items: [] },
  { id: 2, name: "Plats", items: [] },
  { id: 3, name: "Desserts", items: [] },
];

function CategoryCard({ category, onEdit, onDelete, dragHandleProps, onAddDish, onEditDish, onDeleteDish }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div
      className="glass bg-brown/80 border-gold/20 rounded-2xl shadow-xl p-6 flex flex-col gap-2 relative group cursor-grab transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
      {...dragHandleProps}
    >
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button onClick={e => { e.stopPropagation(); onEdit(); }} className="px-2 py-1 rounded-lg bg-gold/20 text-gold font-bold hover:bg-gold/40 transition">Éditer</button>
        <button onClick={e => { e.stopPropagation(); onDelete(); }} className="px-2 py-1 rounded-lg bg-red-400/20 text-red-300 font-bold hover:bg-red-400/40 transition">Supprimer</button>
      </div>
      <div className="flex items-center justify-between w-full mb-1">
        <div className="text-2xl font-serif font-bold text-gold cursor-pointer select-none" onClick={() => setExpanded(e => !e)}>
          {category.name}
        </div>
        <button
          onClick={e => { e.stopPropagation(); onAddDish(); }}
          className="px-3 py-1 rounded-xl bg-gold text-brown font-bold text-sm shadow-glass glass border-2 border-gold/60 hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >Ajouter un plat</button>
      </div>
      <div className="text-gold/80 text-sm mb-2">{category.items.length} plat{category.items.length !== 1 ? 's' : ''}</div>
      <div className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="grid grid-cols-1 gap-4 mt-2">
          {category.items.length === 0 ? (
            <div className="col-span-full text-gold/60 italic text-center py-4">Aucun plat dans cette catégorie</div>
          ) : (
            category.items.map(dish => (
              <DishCard
                key={dish.id}
                dish={dish}
                onEdit={e => { e.stopPropagation(); onEditDish(dish); }}
                onDelete={e => { e.stopPropagation(); onDeleteDish(dish); }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function DishCard({ dish, onEdit, onDelete }) {
  return (
    <div className="glass bg-brown/70 border-gold/20 rounded-2xl shadow-lg p-4 flex flex-col gap-2 items-center relative group transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button onClick={e => { e.stopPropagation(); onEdit(); }} className="px-2 py-1 rounded-lg bg-gold/20 text-gold font-bold hover:bg-gold/40 transition">Éditer</button>
        <button onClick={e => { e.stopPropagation(); onDelete(); }} className="px-2 py-1 rounded-lg bg-red-400/20 text-red-300 font-bold hover:bg-red-400/40 transition">Supprimer</button>
      </div>
      {dish.image ? (
        <img src={dish.image} alt={dish.title} className="w-24 h-24 object-cover rounded-xl mb-2 border border-gold/20" />
      ) : (
        <div className="w-24 h-24 rounded-xl bg-gold/10 flex items-center justify-center text-gold/40 mb-2">Aperçu</div>
      )}
      <div className="text-lg font-serif font-bold text-gold">{dish.title}</div>
      <div className="text-gold/80 text-sm text-center">{dish.description}</div>
      <div className="flex gap-2 items-center mt-1">
        <span className="text-gold font-bold">{dish.price}€</span>
        {dish.allergens && dish.allergens.length > 0 && (
          <span className="text-xs text-gold/60">({dish.allergens.join(", ")})</span>
        )}
      </div>
      <div className="flex gap-2 mt-1">
        <span className={`text-xs font-bold rounded px-2 py-1 ${dish.available ? 'bg-green-400/20 text-green-300' : 'bg-red-400/20 text-red-300'}`}>{dish.available ? 'Disponible' : 'Indisponible'}</span>
      </div>
    </div>
  );
}

export default function MenuManagement() {
  const [categories, setCategories] = useState(initialCategories);
  // ...existing code...
  const [categoryModal, setCategoryModal] = useState(null); // {mode, category}
  const [dishModal, setDishModal] = useState(null); // {mode, dish, categoryId}
  const [deleteModal, setDeleteModal] = useState(null); // {type, id, categoryId}
  const [dragged, setDragged] = useState(null);
  const [loading, setLoading] = useState(false);

  // Drag and drop for categories
  const onDragStart = (idx) => setDragged(idx);
  const onDragOver = (idx) => {
    if (dragged === null || dragged === idx) return;
    const newCats = [...categories];
    const [removed] = newCats.splice(dragged, 1);
    newCats.splice(idx, 0, removed);
    setCategories(newCats);
    setDragged(idx);
  };
  const onDragEnd = () => setDragged(null);

  // Category CRUD
  const handleSaveCategory = (cat) => {
    if (categoryModal.mode === "add") {
      setCategories([...categories, { ...cat, id: Date.now(), items: [] }]);
    } else {
      setCategories(categories.map(c => c.id === cat.id ? { ...c, name: cat.name } : c));
    }
    setCategoryModal(null);
  };
  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
    setDeleteModal(null);
    setSelectedCategory(null);
  };

  // Dish CRUD
  const handleSaveDish = (dish, categoryId) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, items: dishModal.mode === "add" ? [...cat.items, { ...dish, id: Date.now() }] : cat.items.map(d => d.id === dish.id ? dish : d) }
        : cat
    ));
    setDishModal(null);
  };
  const handleDeleteDish = (dishId, categoryId) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, items: cat.items.filter(d => d.id !== dishId) }
        : cat
    ));
    setDeleteModal(null);
  };

  // Loading skeletons
  if (loading) {
    return (
      <div className="flex flex-col gap-8 animate-fadeIn">
        <div className="h-12 w-1/3 bg-gold/10 rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 bg-gold/10 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-serif font-bold text-gold">Gestion du menu</h1>
        <button
          onClick={() => setCategoryModal({ mode: "add", category: { name: "" } })}
          className="px-6 py-2 rounded-xl bg-gold text-brown font-bold text-lg shadow-glass glass border-2 border-gold/60 hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >Ajouter une catégorie</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.length === 0 ? (
          <div className="col-span-full text-gold/60 italic text-center">Aucune catégorie</div>
        ) : (
          categories.map((cat, idx) => (
            <div
              key={cat.id}
              draggable
              onDragStart={() => onDragStart(idx)}
              onDragOver={e => { e.preventDefault(); onDragOver(idx); }}
              onDragEnd={onDragEnd}
            >
              <CategoryCard
                category={cat}
                onEdit={() => setCategoryModal({ mode: "edit", category: cat })}
                onDelete={() => setDeleteModal({ type: "category", id: cat.id })}
                dragHandleProps={{}}
                onAddDish={() => setDishModal({ mode: "add", dish: { title: "", description: "", price: "", allergens: [], available: true, image: "" }, categoryId: cat.id })}
                onEditDish={dish => setDishModal({ mode: "edit", dish, categoryId: cat.id })}
                onDeleteDish={dish => setDeleteModal({ type: "dish", id: dish.id, categoryId: cat.id })}
              />
            </div>
          ))
        )}
      </div>
      {/* Category Modal */}
      {categoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn" onClick={() => setCategoryModal(null)}>
          <form
            className="glass bg-brown/90 border-gold/30 rounded-2xl shadow-2xl p-8 min-w-[340px] max-w-md w-full relative animate-fadeIn flex flex-col gap-6"
            onClick={e => e.stopPropagation()}
            onSubmit={e => { e.preventDefault(); handleSaveCategory(categoryModal.category); }}
          >
            <button type="button" className="absolute top-4 right-4 text-gold/60 hover:text-gold text-2xl font-bold" onClick={() => setCategoryModal(null)}>&times;</button>
            <h2 className="text-2xl font-serif font-bold text-gold mb-2">{categoryModal.mode === "add" ? "Ajouter une catégorie" : "Éditer la catégorie"}</h2>
            <input
              type="text"
              required
              placeholder="Nom de la catégorie"
              value={categoryModal.category.name}
              onChange={e => setCategoryModal(m => ({ ...m, category: { ...m.category, name: e.target.value } }))}
              className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gold text-brown font-bold text-lg shadow-glass hover:scale-105 transition-all duration-200"
            >{categoryModal.mode === "add" ? "Ajouter" : "Enregistrer"}</button>
          </form>
        </div>
      )}
      {/* Dish Modal */}
      {dishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn" onClick={() => setDishModal(null)}>
          <form
            className="glass bg-brown/90 border-gold/30 rounded-2xl shadow-2xl p-8 min-w-[340px] max-w-md w-full relative animate-fadeIn flex flex-col gap-6"
            onClick={e => e.stopPropagation()}
            onSubmit={e => {
              e.preventDefault();
              handleSaveDish(dishModal.dish, dishModal.categoryId);
            }}
          >
            <button type="button" className="absolute top-4 right-4 text-gold/60 hover:text-gold text-2xl font-bold" onClick={() => setDishModal(null)}>&times;</button>
            <h2 className="text-2xl font-serif font-bold text-gold mb-2">{dishModal.mode === "add" ? "Ajouter un plat" : "Éditer le plat"}</h2>
            <input
              type="text"
              required
              placeholder="Nom du plat"
              value={dishModal.dish.title}
              onChange={e => setDishModal(m => ({ ...m, dish: { ...m.dish, title: e.target.value } }))}
              className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition"
            />
            <textarea
              required
              placeholder="Description"
              value={dishModal.dish.description}
              onChange={e => setDishModal(m => ({ ...m, dish: { ...m.dish, description: e.target.value } }))}
              className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition min-h-[80px]"
            />
            <input
              type="number"
              required
              min="0"
              step="0.01"
              placeholder="Prix (€)"
              value={dishModal.dish.price}
              onChange={e => setDishModal(m => ({ ...m, dish: { ...m.dish, price: e.target.value } }))}
              className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition w-32"
            />
            <input
              type="text"
              placeholder="Allergènes (séparés par des virgules)"
              value={dishModal.dish.allergens ? dishModal.dish.allergens.join(", ") : ""}
              onChange={e => setDishModal(m => ({ ...m, dish: { ...m.dish, allergens: e.target.value.split(",").map(a => a.trim()).filter(Boolean) } }))}
              className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition"
            />
            <div className="flex items-center gap-4">
              <span className="text-gold/80 font-semibold">Disponible</span>
              <input
                type="checkbox"
                checked={dishModal.dish.available}
                onChange={e => setDishModal(m => ({ ...m, dish: { ...m.dish, available: e.target.checked } }))}
                className="w-5 h-5 accent-gold rounded focus:outline-gold/60 transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gold/80 font-semibold">Image</label>
              <input
                type="url"
                placeholder="URL de l'image"
                value={dishModal.dish.image || ""}
                onChange={e => setDishModal(m => ({ ...m, dish: { ...m.dish, image: e.target.value } }))}
                className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gold text-brown font-bold text-lg shadow-glass hover:scale-105 transition-all duration-200"
            >{dishModal.mode === "add" ? "Ajouter" : "Enregistrer"}</button>
          </form>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn" onClick={() => setDeleteModal(null)}>
          <div className="glass bg-brown/90 border-gold/30 rounded-2xl shadow-2xl p-8 min-w-[340px] max-w-md w-full relative animate-fadeIn flex flex-col gap-6" onClick={e => e.stopPropagation()}>
            <button type="button" className="absolute top-4 right-4 text-gold/60 hover:text-gold text-2xl font-bold" onClick={() => setDeleteModal(null)}>&times;</button>
            <h2 className="text-2xl font-serif font-bold text-gold mb-2">Confirmation</h2>
            <div className="text-gold/90 text-center">
              Êtes-vous sûr de vouloir supprimer {deleteModal.type === "category" ? "cette catégorie ?" : "ce plat ?"}
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  if (deleteModal.type === "category") handleDeleteCategory(deleteModal.id);
                  else handleDeleteDish(deleteModal.id, deleteModal.categoryId);
                }}
                className="flex-1 py-2 rounded-lg bg-red-400/20 text-red-300 font-bold hover:bg-red-400/40 transition"
              >Supprimer</button>
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 py-2 rounded-lg bg-gold/20 text-gold font-bold hover:bg-gold/40 transition"
              >Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
