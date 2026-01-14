import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-beige/80 border-b border-accent shadow-soft sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-heading font-bold text-brown tracking-tight">RestauBook</Link>
        <div className="flex gap-6 text-lg font-medium">
          <Link href="/about" className="hover:text-olive transition">À propos</Link>
          <Link href="/menu" className="hover:text-olive transition">Menu</Link>
          <Link href="/reserve" className="bg-olive text-beige px-4 py-2 rounded-2xl shadow-soft hover:bg-brown transition">Réserver</Link>
        </div>
      </div>
    </nav>
  );
}
