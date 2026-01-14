export default function AdminHoursPage() {
  return (
    <section className="max-w-lg mx-auto py-12 fade-in">
      <h1 className="text-3xl font-heading font-bold text-brown mb-8 text-center">Horaires d'ouverture</h1>
      <form className="bg-beige rounded-2xl shadow-soft border border-accent p-8 flex flex-col gap-6" autoComplete="off">
        <div className="flex flex-col gap-2">
          <label htmlFor="day" className="font-medium text-brown">Jour</label>
          <select id="day" name="day" className="input">
            <option>Lundi</option>
            <option>Mardi</option>
            <option>Mercredi</option>
            <option>Jeudi</option>
            <option>Vendredi</option>
            <option>Samedi</option>
            <option>Dimanche</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="open" className="font-medium text-brown">Ouverture</label>
          <input type="time" id="open" name="open" required className="input" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="close" className="font-medium text-brown">Fermeture</label>
          <input type="time" id="close" name="close" required className="input" />
        </div>
        <button type="submit" className="bg-olive text-beige px-6 py-3 rounded-2xl font-bold shadow-soft hover:bg-brown transition">Enregistrer</button>
      </form>
    </section>
  );
}
