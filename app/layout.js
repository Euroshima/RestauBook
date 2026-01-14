import "../app/globals.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-beige text-brown font-body min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
