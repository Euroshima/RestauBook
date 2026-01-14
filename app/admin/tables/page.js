"use client";
import { useState } from "react";

const initialTables = [
  { id: 1, name: "Table 1", seats: 2, location: "Fenêtre" },
  { id: 2, name: "Table 2", seats: 4, location: "Salle principale" },
  { id: 3, name: "Table 3", seats: 6, location: "Salon privé" },
];

function TableCard({ table, onEdit, onDelete, dragHandleProps }) {
  return (
    <div
      className="glass bg-brown/80 border-gold/20 rounded-2xl shadow-xl p-6 flex flex-col gap-2 items-center relative group cursor-grab transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
      {...dragHandleProps}
    >
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button onClick={onEdit} className="px-2 py-1 rounded-lg bg-gold/20 text-gold font-bold hover:bg-gold/40 transition">Éditer</button>
        <button onClick={onDelete} className="px-2 py-1 rounded-lg bg-red-400/20 text-red-300 font-bold hover:bg-red-400/40 transition">Supprimer</button>
      </div>
      <div className="text-2xl font-serif font-bold text-gold mb-1">{table.name}</div>
      <div className="text-gold/80">{table.location}</div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-brown/60">Places:</span>
        <span className="font-bold text-gold">{table.seats}</span>
      </div>
    </div>
  );
}

export default function AdminTables() {
  const [tables, setTables] = useState(initialTables);
  const [modal, setModal] = useState(null); // {mode: 'add'|'edit', table: {}}
  const [dragged, setDragged] = useState(null);

  // Drag and drop logic
  const onDragStart = (idx) => setDragged(idx);
  const onDragOver = (idx) => {
    if (dragged === null || dragged === idx) return;
    const newTables = [...tables];
    const [removed] = newTables.splice(dragged, 1);
    newTables.splice(idx, 0, removed);
    setTables(newTables);
    setDragged(idx);
  };
  const onDragEnd = () => setDragged(null);

  // CRUD logic
  const handleSave = (table) => {
    if (modal.mode === "add") {
      setTables([...tables, { ...table, id: Date.now() }]);
    } else {
      setTables(tables.map(t => t.id === table.id ? table : t));
    }
    setModal(null);
  };
  const handleDelete = (id) => setTables(tables.filter(t => t.id !== id));

  return (
    <div className="flex flex-col gap-10 animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-serif font-bold text-gold">Gestion des tables</h1>
        <button
          onClick={() => setModal({ mode: "add", table: { name: "", seats: 2, location: "" } })}
          className="px-6 py-2 rounded-xl bg-gold text-brown font-bold text-lg shadow-glass glass border-2 border-gold/60 hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >Ajouter une table</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {tables.map((table, idx) => (
          <div
            key={table.id}
            draggable
            onDragStart={() => onDragStart(idx)}
            onDragOver={e => { e.preventDefault(); onDragOver(idx); }}
            onDragEnd={onDragEnd}
          >
            <TableCard
              table={table}
              onEdit={() => setModal({ mode: "edit", table })}
              onDelete={() => handleDelete(table.id)}
              dragHandleProps={{}}
            />
          </div>
        ))}
      </div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn" onClick={() => setModal(null)}>
          <form
            className="glass bg-brown/90 border-gold/30 rounded-2xl shadow-2xl p-8 min-w-[340px] max-w-md w-full relative animate-fadeIn flex flex-col gap-6"
            onClick={e => e.stopPropagation()}
            onSubmit={e => {
              e.preventDefault();
              handleSave(modal.table);
            }}
          >
            <button type="button" className="absolute top-4 right-4 text-gold/60 hover:text-gold text-2xl font-bold" onClick={() => setModal(null)}>&times;</button>
            <h2 className="text-2xl font-serif font-bold text-gold mb-2">{modal.mode === "add" ? "Ajouter une table" : "Éditer la table"}</h2>
            <div className="flex flex-col gap-2">
              <label className="text-gold/80 font-semibold">Nom</label>
              <input
                type="text"
                required
                value={modal.table.name}
                onChange={e => setModal(m => ({ ...m, table: { ...m.table, name: e.target.value } }))}
                className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gold/80 font-semibold">Emplacement</label>
              <input
                type="text"
                value={modal.table.location}
                onChange={e => setModal(m => ({ ...m, table: { ...m.table, location: e.target.value } }))}
                className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gold/80 font-semibold">Places</label>
              <input
                type="number"
                min="1"
                max="20"
                value={modal.table.seats}
                onChange={e => setModal(m => ({ ...m, table: { ...m.table, seats: Number(e.target.value) } }))}
                className="px-4 py-2 rounded-lg bg-brown/30 text-gold border border-gold/20 focus:outline-gold/60 transition w-24"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gold text-brown font-bold text-lg shadow-glass hover:scale-105 transition-all duration-200"
            >{modal.mode === "add" ? "Ajouter" : "Enregistrer"}</button>
          </form>
        </div>
      )}
    </div>
  );
}
