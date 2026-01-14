import Link from "next/link";

export default function ReserveSuccessPage() {
  return (
    <section className="max-w-lg mx-auto py-24 flex flex-col items-center gap-8 fade-in">
      <h2 className="text-4xl font-heading font-bold text-olive mb-4">Réservation confirmée !</h2>
      <p className="text-lg text-brown/80 text-center">Merci pour votre réservation. Vous recevrez un email de confirmation sous peu.<br />Nous avons hâte de vous accueillir !</p>
      <Link href="/" className="bg-olive text-beige px-8 py-4 rounded-2xl text-xl font-bold shadow-soft hover:bg-brown transition">Retour à l'accueil</Link>
    </section>
  );
}
