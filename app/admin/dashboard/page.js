export default function AdminDashboardPage() {
  return (
    <section className="max-w-5xl mx-auto py-12 fade-in">
      <h1 className="text-3xl font-heading font-bold text-brown mb-8">Statistiques du jour</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-beige rounded-2xl shadow-soft border border-accent flex flex-col items-center p-6">
          <span className="text-4xl font-bold text-olive">32</span>
          <span className="text-brown mt-2">Réservations</span>
        </div>
        <div className="bg-beige rounded-2xl shadow-soft border border-accent flex flex-col items-center p-6">
          <span className="text-4xl font-bold text-olive">12</span>
          <span className="text-brown mt-2">Tables occupées</span>
        </div>
        <div className="bg-beige rounded-2xl shadow-soft border border-accent flex flex-col items-center p-6">
          <span className="text-4xl font-bold text-olive">18h</span>
          <span className="text-brown mt-2">Heure de pointe</span>
        </div>
      </div>
      <div className="mt-12 bg-beige rounded-2xl shadow-soft border border-accent p-6">
        <h2 className="text-xl font-bold mb-4 text-brown">Historique des réservations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-accent/30">
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Heure</th>
                <th className="px-4 py-2 text-left">Table</th>
                <th className="px-4 py-2 text-left">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Jean Dupont</td>
                <td className="px-4 py-2">19h30</td>
                <td className="px-4 py-2">5</td>
                <td className="px-4 py-2 text-olive">Confirmée</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Marie Curie</td>
                <td className="px-4 py-2">20h00</td>
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2 text-brown">En attente</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
