import { Home, Calendar, Table, Settings } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/reservations", label: "Réservations", icon: Calendar },
  { href: "/admin/tables", label: "Tables", icon: Table },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen glass bg-brown/80 border-r border-gold/20 shadow-2xl px-6 py-10 gap-8 animate-fadeIn">
      <div className="text-2xl font-serif font-bold text-gold mb-8 tracking-wide">RestauBook</div>
      <nav className="flex flex-col gap-4">
        {links.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-semibold text-gold/90 hover:bg-gold/10 transition group"
          >
            <Icon className="w-6 h-6 text-gold/80 group-hover:text-gold" />
            <span>{label}</span>
          </a>
        ))}
      </nav>
      <div className="flex-1" />
      <div className="text-xs text-gold/50">© {new Date().getFullYear()} RestauBook</div>
    </aside>
  );
}
