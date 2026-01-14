export default function Footer() {
  return (
    <footer className="w-full bg-beige border-t border-accent mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-brown text-sm gap-2">
        <span>&copy; {new Date().getFullYear()} RestauBook. Tous droits réservés.</span>
        <span>Design by kevin</span>
      </div>
    </footer>
  );
}
