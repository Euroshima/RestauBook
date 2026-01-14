import Sidebar from "../../components/common/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-brown via-brown/90 to-gold/10">
      <Sidebar />
      <main className="flex-1 p-8 md:p-12 transition-all duration-500 animate-fadeIn">{children}</main>
    </div>
  );
}
