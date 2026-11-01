import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import des liens
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Les Jardins du Soleil",
  description: "Gestion de la ferme maraîchère Tp2 PA Guillermo Perez",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <header className="header">
          <div className="headerContainer">
            <span className="logo">Les Jardins du Soleil</span>
            <nav className="navigation">
              <Link href="/">Accueil</Link>
              <Link href="/parcelles">Parcelles</Link>
              <Link href="/cultures">Cultures</Link>
              <Link href="/employes">Employes</Link>
              <Link href="/capteurs">Capteurs</Link>
            </nav>
          </div>
        </header>

        <main className="main">{children}</main>

        <footer className="footer"> @ 2026 - Guillermo Perez </footer>
      </body>
    </html>
  );
}
